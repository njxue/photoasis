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
    // Handle error
  }

  // List all photos to delete, for b2 deletion
  let photosToDelete = await prisma.photo.findMany({
    where: {
      cid: cid,
    },
  });

  await prisma.$transaction(async (prisma) => {
    let res = await prisma.photo.deleteMany({
      where: {
        cid: cid,
      },
    });
    if (res.count === 0) {
      // Error
    }
    res = await prisma.collection.delete({
      where: {
        cid: cid,
      },
    });
  });

  const b2 = new BackBlazeB2({
    applicationKey: process.env.BACKBLAZE_APP_KEY,
    applicationKeyId: process.env.BACKBLAZE_KEY_ID,
  });

  await b2.authorize();

  // TODO: Make this atomic
  const deleteRequests = photosToDelete.map((photo) => {
    const b2Id = photo.pid;
    const b2Name = `${uid}/${photo.name}`;
    return b2.deleteFileVersion({ fileId: b2Id, fileName: b2Name });
  });

  const b2res = await Promise.all(deleteRequests);
  revalidatePath("/");
  return { status: 2040 };
}

export default deleteCollection;
