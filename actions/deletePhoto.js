"use server";

import { revalidatePath } from "next/cache";
import BackBlazeB2 from "backblaze-b2";
import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

const deletePhoto = async (photo, pathname) => {
  const { aid, pid, name } = photo;
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  await prisma.$transaction(async (prisma) => {
    const album = await prisma.album.findUniqueOrThrow({
      where: {
        aid_uid: { aid, uid },
      },
      include: {
        thumbnail: true,
        photos: true,
      },
    });

    const res = await prisma.photo.delete({
      where: {
        pid,
      },
    });
    if (res.count < 1) {
      return {
        status: 500,
        message: "Unable to delete photo",
      };
    }

    if (!album) {
      return {
        status: 500,
        message: "Unable to delete photo",
      };
    }

    if (album.thumbnailPid === pid) {
      const existingPhotos = album.photos.filter((photo) => photo.pid !== pid);

      if (existingPhotos.length > 0) {
        await prisma.album.update({
          where: {
            aid_uid: { aid, uid },
          },
          data: {
            thumbnail: {
              connect: {
                pid: existingPhotos[0].pid,
              },
            },
          },
        });
      }
    }
  });

  try {
    const b2 = new BackBlazeB2({
      applicationKey: process.env.BACKBLAZE_APP_KEY,
      applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    });

    await b2.authorize();
    await b2.deleteFileVersion({
      fileId: pid,
      fileName: `${uid}/${aid}/${name}`,
    });
    revalidatePath(pathname);

    return { status: 204, message: "Success" };
  } catch (err) {
    return { status: 204, message: "File not found" };
  }
};

export default deletePhoto;