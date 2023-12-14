"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

async function createAlbum(data) {
  try {
    const prisma = new PrismaClient();
    const { albumName, photos } = data;
    const session = await getServerSession(authOptions);
    const uid = session?.user.id;
    const res = await prisma.$transaction(async (prisma) => {
      let albumData = { name: albumName, uid };
      if (photos) {
        albumData = {
          ...albumData,
          photos: {
            create: photos.map((photo) => ({
              name: photo,
              uid,
              aperture: parseFloat(photo.aperture),
              shutterspeed: photo.shutterspeed,
              iso: parseInt(photo.iso),
            })),
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
        return { status: 400, message: "Unable to create album" };
      } else {
        return { status: 200, message: "Success", data: album };
      }
    });
    return res;
  } catch (err) {
    console.log(err);
    return { status: 500, message: "Something went wrong" };
  }
}

export default createAlbum;