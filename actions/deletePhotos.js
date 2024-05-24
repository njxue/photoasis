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
  const error = {
    status: 500,
    message: "Unable to delete photo",
    ok: false,
  };
  let newAlbumData = {};
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
      return error;
    }

    // Update thumbnail
    if (pids.includes(album.thumbnailPid)) {
      const existingPhotos = album.photos.filter(
        (photo) => !pids.includes(photo.pid)
      );
      if (existingPhotos.length > 0) {
        newAlbumData = {
          ...newAlbumData,
          thumbnail: {
            connect: {
              pid: existingPhotos[0].pid,
            },
          },
        };
      }
    }

    // Remove deleted photos from photoOrder array
    if (album.photoOrder) {
      const updatedPhotoOrder = album.photoOrder.filter(
        (pid) => !pids.includes(pid)
      );

      newAlbumData = { ...newAlbumData, photoOrder: updatedPhotoOrder };

      const updatedAlbum = await prisma.album.update({
        where: { aid_uid: { aid, uid } },
        data: newAlbumData,
      });

      if (!updatedAlbum) {
        return error;
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
    return { status: 204, message: "Successfully deleted photos", ok: true };
  } catch (err) {
    return { status: 204, message: "Photo(s) not found", ok: true };
  }
};

export default deletePhotos;
