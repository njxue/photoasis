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
    const file = formData.get("photos");
    const collectionName = formData.get("collectionName");
    const session = await getServerSession(authOptions);
    const uid = session?.user.id;
    const thumbnailQuality = 10;

    const buffer = Buffer.from(await file.arrayBuffer());
    const compressedBuffer = await sharp(buffer)
      .jpeg({ quality: thumbnailQuality, progressive: true })
      .toBuffer();

    // Insert into b2
    const b2 = new BackBlazeB2({
      applicationKey: process.env.BACKBLAZE_APP_KEY,
      applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    });
    await b2.authorize();

    // Insert thumbnail
    let res = await b2.getUploadUrl({
      bucketId: process.env.BACKBLAZE_BUCKET_ID,
    });

    let r = await b2.uploadFile({
      uploadUrl: res.data.uploadUrl,
      uploadAuthToken: res.data.authorizationToken,
      fileName: `${uid}/thumbnail_${file.name}`,
      data: compressedBuffer,
    });

    // Insert uncompressed image
    res = await b2.getUploadUrl({
      bucketId: process.env.BACKBLAZE_BUCKET_ID,
    });

    r = await b2.uploadFile({
      uploadUrl: res.data.uploadUrl,
      uploadAuthToken: res.data.authorizationToken,
      fileName: `${uid}/${file.name}`,
      data: compressedBuffer,
    });

    if (r.status === 200) {
      const photo = await prisma.photo.create({
        data: {
          name: file.name,
          user: { connect: { id: uid } },
        },
      });

      const collection = await prisma.collection.create({
        data: {
          name: collectionName,
          user: { connect: { id: uid } },
        },
      });

      await prisma.collectionPhotos.create({
        data: {
          photo: { connect: { pid: photo.pid } },
          collection: { connect: { cid: collection.cid } },
        },
      });
    }
    revalidatePath("/");
    return {
      status: 200,
      success: true,
    };
  } catch (err) {
    console.log(err);
    return { status: 500, success: false };
  }
}

export default createCollection;
