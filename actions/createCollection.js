"use server";

import BackBlazeB2 from "backblaze-b2";
import sharp from "sharp";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
async function createCollection(formData) {
  try {
    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions);
    const uid = session?.user.id;

    const thumbnailQuality = 100;

    const collectionName = formData.get("collectionName");
    const files = formData.getAll("photos");

    const b2 = new BackBlazeB2({
      applicationKey: process.env.BACKBLAZE_APP_KEY,
      applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    });
    await b2.authorize();

    files.forEach(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const compressedBuffer = await sharp(buffer)
        .resize(1080, 720, {
          fit: "inside",
        })
        .jpeg({ quality: thumbnailQuality, progressive: true })
        .toBuffer();
      // Insert thumbnail
      let res = await b2.getUploadUrl({
        bucketId: process.env.BACKBLAZE_BUCKET_ID,
      });

      await b2.uploadFile({
        uploadUrl: res.data.uploadUrl,
        uploadAuthToken: res.data.authorizationToken,
        fileName: `${uid}/thumbnail_${file.name}`,
        data: compressedBuffer,
      });

      // Insert uncompressed image
      res = await b2.getUploadUrl({
        bucketId: process.env.BACKBLAZE_BUCKET_ID,
      });

      await b2.uploadFile({
        uploadUrl: res.data.uploadUrl,
        uploadAuthToken: res.data.authorizationToken,
        fileName: `${uid}/${file.name}`,
        data: buffer,
      });
    });

    let collection = await prisma.collection.create({
      data: {
        name: collectionName,
        uid,
        photos: {
          create: files.map((file) => ({
            name: file.name,
            uid,
          })),
        },
      },
      include: { photos: true },
    });
    collection = await prisma.collection.update({
      where: {
        cid: collection.cid,
      },
      data: {
        thumbnail: {
          connect: {
            pid: collection.photos[0].pid,
          },
        },
      },
    });
    revalidatePath("/");
    return { status: 200 };
  } catch (err) {
    console.log(err);
    return { status: 500 };
  }
}

export default createCollection;
