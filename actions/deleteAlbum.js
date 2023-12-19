"use server";
import BackBlazeB2 from "backblaze-b2";
import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function deleteAlbum(aid) {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  if (uid == null) {
    return { status: 500, message: "Authentication error" };
  }

  // List all photos to delete, for b2 deletion
  let photosToDelete = await prisma.photo.findMany({
    where: {
      aid: aid,
      uid: uid,
    },
  });

  const dbDeleteRes = await prisma.$transaction(async (prisma) => {
    const res = await prisma.photo.deleteMany({
      where: {
        aid: aid,
        uid: uid,
      },
    });
    if (res.count !== photosToDelete.length) {
      return {
        status: 500,
        message: "Unable to delete photos in this colelction",
      };
    }

    const deletedAlbum = await prisma.album.delete({
      where: {
        aid_uid: { aid, uid },
      },
    });
    if (!deletedAlbum) {
      return { status: 500, message: "Unable to delete album" };
    }
    return {
      status: 200,
      message: "Success",
      data: { ...deletedAlbum, photos: photosToDelete },
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
    const b2Name = `${uid}/${aid}/${photo.name}`;
    return b2.deleteFileVersion({ fileId: b2Id, fileName: b2Name });
  });

  try {
    await Promise.all(deleteRequests);
    redirect("/");
  } catch (err) {
    console.log(err);
    redirect("/");
  }
}

export default deleteAlbum;
