"use server";
import BackBlazeB2 from "backblaze-b2";
import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
async function deleteAlbums(albumIds) {
  // Album ids become string when passed to server
  albumIds = albumIds.map((aid) => parseInt(aid));
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  if (uid == null) {
    return { status: 500, message: "Authentication error", ok: false };
  }

  // List all photos to delete, for b2 deletion
  let photosToDelete = await prisma.photo.findMany({
    where: {
      aid: {
        in: albumIds,
      },
      uid,
    },
  });

  const dbDeleteRes = await prisma.$transaction(async (prisma) => {
    const res = await prisma.photo.deleteMany({
      where: {
        aid: {
          in: albumIds,
        },
        uid: uid,
      },
    });

    if (res.count !== photosToDelete.length) {
      return {
        status: 500,
        message: "Unable to delete photos in this colelction",
        ok: false,
      };
    }

    const deletedAlbums = await prisma.album.deleteMany({
      where: {
        aid: {
          in: albumIds,
        },
        uid,
      },
    });

    if (!deletedAlbums) {
      return { status: 500, message: "Unable to delete albums", ok: false };
    }
    return {
      status: 200,
      message: "Success",
      ok: true,
      data: { photos: photosToDelete },
    };
  });

  if (!dbDeleteRes.ok) {
    return dbDeleteRes;
  }

  const b2 = new BackBlazeB2({
    applicationKey: process.env.BACKBLAZE_APP_KEY,
    applicationKeyId: process.env.BACKBLAZE_KEY_ID,
  });

  await b2.authorize();

  const deleteRequests = photosToDelete.map((photo) => {
    const b2Id = photo.pid;
    const b2Name = `${uid}/${photo.aid}/${photo.name}`;
    return b2.deleteFileVersion({ fileId: b2Id, fileName: b2Name });
  });

  try {
    await Promise.all(deleteRequests);
    revalidatePath("/", "layout");
    return { status: 204, message: "Successfully deleted albums", ok: true };
  } catch (err) {
    console.log(err);
    return { status: 404, message: "Unable to delete albums", ok: false };
  }
}

export default deleteAlbums;
