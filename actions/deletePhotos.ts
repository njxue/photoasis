"use server";

import { revalidatePath } from "next/cache";
import BackBlazeB2 from "backblaze-b2";
import type { Photo, Prisma } from "@prisma/client";
import prisma from "@prisma/prisma";
import { requireUserId } from "@auth/requireUser";
import type { MutationResult } from "@actions/types";

interface DeletePhotosInput {
  aid: number;
  pids: string[];
}

const deletePhotos = async ({
  aid,
  pids,
}: DeletePhotosInput): Promise<MutationResult> => {
  const uid = await requireUserId();
  let photosToDelete: Photo[] = [];
  const error = {
    status: 500,
    message: "Unable to delete photo",
    ok: false,
  };
  let newAlbumData: Prisma.AlbumUpdateInput = {};
  await prisma.$transaction(async (prisma) => {
    // Get the album information
    const album = await prisma.album.findUniqueOrThrow({
      where: {
        aid_uid: { aid, uid },
      },
      include: {
        thumbnail: true,
        banner: true,
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
        aid,
        uid,
      },
    });

    if (res.count < 1 || !album) {
      return error;
    }

    // Update thumbnail
    if (album.thumbnailPid && pids.includes(album.thumbnailPid)) {
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

    // Update banner
    if (album.bannerPid && pids.includes(album.bannerPid)) {
      newAlbumData = {
        ...newAlbumData,
        banner: { disconnect: true },
      };
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
      applicationKey: process.env.BACKBLAZE_APP_KEY!,
      applicationKeyId: process.env.BACKBLAZE_KEY_ID!,
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
  } catch (error) {
    console.error(error);
    return { status: 204, message: "Photo(s) not found", ok: true };
  }
};

export default deletePhotos;
