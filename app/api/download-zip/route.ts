import { basename } from "node:path";
import { PassThrough, Readable } from "node:stream";
import type { ReadableStream as NodeReadableStream } from "node:stream/web";
import archiver from "archiver";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { b2DownloadFileById } from "@actions/b2";
import prisma from "@prisma/prisma";
import { authOptions } from "@auth/options";

const downloadRequestSchema = z.object({
  fileIdsAndNames: z
    .array(
      z.object({
        id: z.string().min(1),
        name: z.string().optional(),
      }),
    )
    .min(1),
});

interface DownloadablePhoto {
  id: string;
  name: string;
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const session = await getServerSession(authOptions);
    const uid = Number(session?.user?.id);

    if (!Number.isSafeInteger(uid) || uid <= 0) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    const body: unknown = await request.json();
    const { fileIdsAndNames } = downloadRequestSchema.parse(body);
    const requestedIds = fileIdsAndNames.map((file) => file.id);
    const photos = await prisma.photo.findMany({
      where: {
        uid,
        pid: { in: requestedIds },
      },
      select: {
        pid: true,
        name: true,
      },
    });

    if (photos.length !== new Set(requestedIds).size) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    const photosById = new Map(photos.map((photo) => [photo.pid, photo]));
    const downloadablePhotos = requestedIds.map((id) => {
      const photo = photosById.get(id)!;
      return { id: photo.pid, name: basename(photo.name) || "photo" };
    });
    const { buffer, length } = await downloadImagesToZip(downloadablePhotos);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="photos.zip"',
        "Content-Length": String(length),
      },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function downloadImagesToZip(
  files: DownloadablePhoto[],
): Promise<{ buffer: Buffer; length: number }> {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const passThrough = new PassThrough();
  const buffers: Uint8Array<ArrayBufferLike>[] = [];
  const completion = new Promise<{ buffer: Buffer; length: number }>(
    (resolve, reject) => {
      passThrough.on("data", (chunk: Uint8Array<ArrayBufferLike>) =>
        buffers.push(chunk),
      );
      passThrough.on("end", () => {
        const buffer = Buffer.concat(buffers);
        resolve({ buffer, length: buffer.length });
      });
      passThrough.on("error", reject);
      archive.on("error", reject);
    },
  );

  archive.pipe(passThrough);

  await Promise.all(
    files.map(async (file) => {
      const fileResponse = await b2DownloadFileById(file.id);
      if (fileResponse.ok) {
        archive.append(
          Readable.fromWeb(
            fileResponse.data as unknown as NodeReadableStream<Uint8Array>,
          ),
          { name: file.name },
        );
      }
    }),
  );

  await archive.finalize();
  return completion;
}
