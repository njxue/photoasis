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
import { DATABASE_TRANSACTION_TIMEOUT_MS } from "@app/configs/databaseConfigs";
import {
  createAlbumSlug,
  DUPLICATE_ALBUM_NAME_MESSAGE,
  isAlbumSlugConflict,
} from "@utils/albumSlug";

async function updateAlbum(data, revalidate = true) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  // Only aid is compulsory
  const { aid, photos, albumName, photoOrder, thumbnailPid, bannerPid } = data;
  const normalizedAlbumName =
    typeof albumName === "string" ? albumName.trim() : undefined;

  if (albumName !== undefined && !normalizedAlbumName) {
    return { status: 400, message: "Album name is required", ok: false };
  }

  let res;

  try {
    res = await prisma.$transaction(
      async (prisma) => {
        // If updated album name
        let albumData = normalizedAlbumName
          ? {
              name: normalizedAlbumName,
              slug: createAlbumSlug(normalizedAlbumName),
            }
          : {};

        // If updated photoOrder
        if (photoOrder) {
          albumData = { ...albumData, photoOrder };
        }

        // If adding photos
        if (photos?.length) {
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
          const newPhotos = await prisma.photo.createMany({
            data: formattedPhotoData,
          });

          if (!newPhotos || newPhotos.count === 0) {
            return {
              status: 400,
              message: "Unable to create photos",
              ok: false,
            };
          }

          // If no thumbnail, set first photo as thumbnail
          const existingThumbnail = await prisma.album.findUnique({
            where: {
              aid_uid: { aid, uid },
            },
            select: {
              thumbnailPid: true,
            },
          });

          if (!existingThumbnail?.thumbnailPid) {
            albumData = {
              ...albumData,
              thumbnail: {
                connect: {
                  pid: photos[0].fileId,
                },
              },
            };
          }
        }

        // Update banner
        if (bannerPid) {
          albumData = {
            ...albumData,
            banner: { connect: { pid: bannerPid } },
          };
        }

        // Update thumbnail
        if (thumbnailPid) {
          albumData = {
            ...albumData,
            thumbnail: {
              connect: {
                pid: thumbnailPid,
              },
            },
          };
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
        return {
          status: 200,
          message: "Success",
          data: updatedAlbum,
          ok: true,
        };
      },
      { timeout: DATABASE_TRANSACTION_TIMEOUT_MS },
    );
  } catch (error) {
    if (isAlbumSlugConflict(error)) {
      return {
        status: 409,
        message: DUPLICATE_ALBUM_NAME_MESSAGE,
        ok: false,
      };
    }

    throw error;
  }

  if (res.ok && revalidate) {
    revalidatePath("/", "layout");
  }
  return res;
}

export default updateAlbum;
