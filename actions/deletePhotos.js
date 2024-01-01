"use server";

import { revalidatePath } from "next/cache";
import BackBlazeB2 from "backblaze-b2";
import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

const deletePhotos = async ({ aid, pids }) => {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;
  let photosToDelete = [];
  await prisma.$transaction(async (prisma) => {
    // Get the album information
    const album = await prisma.album.findUniqueOrThrow({
      where: {
        aid_uid: { aid, uid },
      },
      include: {
        thumbnail: true,
        photos: true,
      },
    });

    // To get the names of the photos, required for b2_delete_file_version
    photosToDelete = album.photos.filter((photo) => pids.includes(photo.pid));

    // Delete
    const res = await prisma.photo.deleteMany({
      where: {
        pid: {
          in: pids,
        },
      },
    });

    if (res.count < 1 || !album) {
      return {
        status: 500,
        message: "Unable to delete photo",
      };
    }

    // Update thumbnail
    if (pids.includes(album.thumbnailPid)) {
      const existingPhotos = album.photos.filter(
        (photo) => !pids.includes(photo.pid)
      );
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

  // Delete from b2
  try {
    const b2 = new BackBlazeB2({
      applicationKey: process.env.BACKBLAZE_APP_KEY,
      applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    });

    await b2.authorize();

    const deleteRequests = photosToDelete.map((photo) =>
      b2.deleteFileVersion({
        fileId: photo.pid,
        fileName: `${uid}/${aid}/${photo.name}`,
      })
    );

    await Promise.all(deleteRequests);
    revalidatePath("/", "layout");
    return { status: 204, message: "Successfully deleted photos" };
  } catch (err) {
    return { status: 204, message: "Photo(s) not found" };
  }
};

export default deletePhotos;
