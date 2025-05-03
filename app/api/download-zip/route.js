import { b2DownloadFileById } from "@actions/b2";
import archiver from "archiver";
import { PassThrough, Readable } from "stream";

// 60s limit set by Vercel
export async function POST(req) {
  try {
    const { fileIdsAndNames } = await req.json();

    const { buffer, length } = await downloadImagesToZip(fileIdsAndNames);

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="photos.zip"`,
        "Content-Length": length,
      },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

function downloadImagesToZip(fileIdsAndNames) {
  return new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const passThrough = new PassThrough();
    const buffers = [];

    // Collect data in memory
    passThrough.on("data", (chunk) => buffers.push(chunk));
    passThrough.on("end", () => {
      const buffer = Buffer.concat(buffers);
      resolve({ buffer, length: buffer.length });
    });

    passThrough.on("error", reject);

    archive.pipe(passThrough);

    try {
      Promise.all(
        fileIdsAndNames.map(async (file) => {
          const fileRes = await b2DownloadFileById(file.id);
          if (fileRes.ok && fileRes.data) {
            archive.append(Readable.fromWeb(fileRes.data), {
              name: file.name ?? "photo",
            });
          }
        })
      ).then(() => {
        archive.finalize();
      });
    } catch (err) {
      reject(err);
    }
  });
}
