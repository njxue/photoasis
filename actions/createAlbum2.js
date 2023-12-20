"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import prisma from "@prisma/prisma";
import { b2UploadFiles } from "./b2";

async function createAlbum(formData) {
  try {
    console.log(formData.getAll("compressedPhotos"));
    /*  console.log(formData.get("albumName"));
    console.log(Object.values(formData.get("compressedPhotos"))); */
    /* const { albumName, photos } = data;
    const session = await getServerSession(authOptions);
    const uid = session?.user.id;
    const res = await prisma.$transaction(async (prisma) => {
      let albumData = { name: albumName, uid };

      if (photos) {
        albumData = {
          ...albumData,
          photos: {
            create: photos.map((photo) => ({
              name: photo.name,
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

      // If creation of album and photos is successful, set thumbnail
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
      }

      if (photos) {
        // Convert photo name to b2 path (which is the file name for b2)
        photos.forEach((photo) => {
          photo.name = `${uid}/${album.aid}/${photo.name}`;
        });
        await b2UploadFiles(photos);
      }
      return { status: 200, message: "Success", data: album };
    });
    return res; */
  } catch (err) {
    console.log(err);
    return { status: 500, message: "Something went wrong" };
  }
}

export default createAlbum;
