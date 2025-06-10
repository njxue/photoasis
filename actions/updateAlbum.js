"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { formatPhotoData } from "@utils/helpers";
import {
  MAX_SIZE_BYTES,
  IMAGE_SIZE_RESTRICTION_ENABLED,
} from "@app/configs/imageConfigs";

async function updateAlbum(data, revalidate = true) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  // Only aid is compulsory
  const { aid, photos, albumName, photoOrder, thumbnailPid } = data;
  const res = await prisma.$transaction(async (prisma) => {
    // If updated album name
    let albumData = albumName ? { name: albumName } : {};

    // If updated photoOrder
    if (photoOrder) {
      albumData = { ...albumData, photoOrder };
    }

    if (photos) {
      if (
        IMAGE_SIZE_RESTRICTION_ENABLED &&
        photos.some((photo) => photo.size > MAX_SIZE_BYTES)
      ) {
        return {
          status: 400,
          message: `Contains file(s) that exceed ${MAX_SIZE_BYTES} bytes`,
        };
      }
      // Insert photos
      const formattedPhotoData = photos.map((photo) => {
        const formattedData = formatPhotoData(photo);
        // These additional fields are not visible to user
        return {
          aid,
          uid,
          pid: photo.fileId,
          blurhash: photo.blurhash,
          ...formattedData,
        };
      });
      const newPhotos = await prisma.photo.createMany(
        {
          data: formattedPhotoData,
        },

        { timeout: 10000 }
      );

      if (!newPhotos || newPhotos.count === 0) {
        return { status: 400, message: "Unable to create photos", ok: false };
      }
    }

    // Update thumbnail
    if (thumbnailPid) {
      albumData = albumData = {
        ...albumData,
        thumbnail: {
          connect: {
            pid: thumbnailPid,
          },
        },
      };
    } else {
      const existingThumbnail = await prisma.album.findUnique({
        where: {
          aid_uid: { aid, uid },
        },
        select: {
          thumbnailPid: true,
        },
      });

      if (!existingThumbnail.thumbnailPid) {
        const thumbnail = await prisma.photo.findFirst({
          where: {
            aid,
            uid,
          },
        });
        albumData = albumData = {
          ...albumData,
          thumbnail: {
            connect: {
              pid: thumbnail.pid,
            },
          },
        };
      }
    }

    const updatedAlbum = await prisma.album.update({
      where: { aid_uid: { aid, uid } },
      data: albumData,
      include: {
        photos: true,
      },
    });
    if (!updatedAlbum) {
      return { status: 400, message: "Unable to update album", ok: false };
    }
    return { status: 200, message: "Success", data: updatedAlbum, ok: true };
  });

  if (res.ok && revalidate) {
    revalidatePath("/", "layout");
  }
  return res;
}

export default updateAlbum;
