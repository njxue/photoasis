"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
async function createCollection(formData) {
  try {
    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions);
    const uid = session?.user.id;

    const collectionName = formData.get("collectionName");
    const files = formData.getAll("fileName");
    const aperture = formData.getAll("aperture");
    const shutterspeed = formData.getAll("shutterspeed");
    const iso = formData.getAll("iso");

    // Interactive transaction
    await prisma.$transaction(async (prisma) => {
      let collection = await prisma.collection.create(
        {
          data: {
            name: collectionName,
            uid,
            photos: {
              create: files.map((file, i) => ({
                name: file,
                uid,
                aperture: parseFloat(aperture[i]),
                shutterspeed: shutterspeed[i],
                iso: parseInt(iso[i]),
              })),
            },
          },
          include: { photos: true },
        },
        { timeout: 10000 }
      );
      collection = await prisma.collection.update({
        where: {
          cid: collection.cid,
        },
        data: {
          thumbnail: {
            connect: {
              pid: collection.photos[0].pid,
            },
          },
        },
      });
    });

    revalidatePath("/");
    return { status: 200 };
  } catch (err) {
    console.log(err);
    return { status: 500 };
  }
}

export default createCollection;
