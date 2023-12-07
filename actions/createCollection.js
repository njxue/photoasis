"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

async function createCollection(data) {
  try {
    const prisma = new PrismaClient();
    const { collectionName, photos } = data;
    const session = await getServerSession(authOptions);
    const uid = session?.user.id;
    const res = await prisma.$transaction(async (prisma) => {
      let collectionData = { name: collectionName, uid };
      if (photos) {
        collectionData = {
          ...collectionData,
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

      const collection = await prisma.collection.create(
        {
          data: collectionData,
        },
        { timeout: 10000 }
      );

      // If creation of collection and photos is successful
      if (collection && collection.photos?.length > 0) {
        await prisma.collection.update({
          where: {
            cid_uid: { cid: collection.cid, uid },
          },
          data: {
            thumbnail: {
              connect: {
                pid: collection.photos[0].pid,
              },
            },
          },
        });
      }

      if (!collection) {
        return { status: 400, message: "Unable to create collection" };
      } else {
        return { status: 200, message: "Success", data: collection };
      }
    });
    return res;
  } catch (err) {
    console.log(err);
    return { status: 500, message: "Something went wrong" };
  }
}

export default createCollection;
