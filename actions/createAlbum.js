"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import prisma from "@prisma/prisma";
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

async function createAlbum(data) {
  const { albumName, photos } = data;
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;
  const normalizedAlbumName = albumName?.trim();

  if (!normalizedAlbumName) {
    return { status: 400, message: "Album name is required", ok: false };
  }

  let res;

  try {
    res = await prisma.$transaction(
      async (prisma) => {
        let albumData = {
          name: normalizedAlbumName,
          slug: createAlbumSlug(normalizedAlbumName),
          uid,
        };

        const album = await prisma.album.create({
          data: albumData,
        });

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
          const formattedPhotoData = photos.map((photo) => {
            const formattedData = formatPhotoData(photo);
            // These additional fields are not visible to user
            return {
              aid: album.aid,
              uid,
              pid: photo.fileId,
              blurhash: photo.blurhash,
              ...formattedData,
            };
          });
          albumData = {
            ...albumData,
            photos: {
              create: formattedPhotoData,
            },
          };
        }

        // If creation of album and photos is successful
        if (album && album.photos?.length > 0) {
          await prisma.album.update({
            where: {
              aid_uid: { aid: album.aid, uid },
            },
            data: {
              thumbnail: {
                connect: {
                  pid: album.photos[0].pid,
                },
              },
            },
          });
        }

        if (!album) {
          return { status: 400, message: "Unable to create album", ok: false };
        } else {
          return {
            status: 200,
            message: "Successfully created album",
            data: album,
            ok: true,
          };
        }
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

  if (res.ok) {
    revalidatePath("/", "layout");
  }
  return res;
}

export default createAlbum;
