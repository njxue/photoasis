"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import prisma from "@prisma/prisma";
import { revalidatePath } from "next/cache";
import { formatPhotoData } from "@utils/helpers";
async function createAlbum(data) {
  const { albumName, photos } = data;
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;
  const res = await prisma.$transaction(async (prisma) => {
    let albumData = { name: albumName, uid };
    if (photos) {
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
      albumData = {
        ...albumData,
        photos: {
          create: formattedPhotoData,
        },
      };
    }

    const album = await prisma.album.create(
      {
        data: albumData,
      },
      { timeout: 10000 }
    );

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
  });

  if (res.ok) {
    revalidatePath("/", "layout");
  }
  return res;
}

export default createAlbum;
