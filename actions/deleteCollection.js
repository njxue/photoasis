"use server";
import { revalidatePath } from "next/cache";
import BackBlazeB2 from "backblaze-b2";

import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

async function deleteCollection(cid) {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  if (uid == null) {
    return { status: 500, message: "Authentication error" };
  }

  // List all photos to delete, for b2 deletion
  let photosToDelete = await prisma.photo.findMany({
    where: {
      cid: cid,
    },
  });

  const dbDeleteRes = await prisma.$transaction(async (prisma) => {
    const res = await prisma.photo.deleteMany({
      where: {
        cid: cid,
        uid: uid,
      },
    });
    if (res.count !== photosToDelete.length) {
      return {
        status: 500,
        message: "Unable to delete photos in this colelction",
      };
    }

    const deletedCollection = await prisma.collection.delete({
      where: {
        cid_uid: { cid, uid },
      },
    });
    if (!deletedCollection) {
      return { status: 500, message: "Unable to delete collection" };
    }
    return {
      status: 200,
      message: "Success",
      data: { ...deletedCollection, photos: photosToDelete },
    };
  });

  if (dbDeleteRes.status !== 200) {
    return dbDeleteRes;
  }

  const b2 = new BackBlazeB2({
    applicationKey: process.env.BACKBLAZE_APP_KEY,
    applicationKeyId: process.env.BACKBLAZE_KEY_ID,
  });

  await b2.authorize();

  const deleteRequests = photosToDelete.map((photo) => {
    const b2Id = photo.pid;
    const b2Name = `${uid}/${cid}/${photo.name}`;
    return b2
      .deleteFileVersion({ fileId: b2Id, fileName: b2Name })
      .catch((err) => Promise.reject(err));
  });

  try {
    await Promise.all(deleteRequests);
    revalidatePath("/");
    return { status: 204, message: "Success" };
  } catch (err) {
    revalidatePath("/");
    return { status: 204, message: "File(s) not found" };
  }
}

export default deleteCollection;
