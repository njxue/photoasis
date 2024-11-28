"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function updateAlbumThumbnail(data, revalidate = true) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  const { aid, thumbnailPid } = data;
  const res = await prisma.$transaction(async (prisma) => {
    const albumData = {
      thumbnail: {
        connect: {
          pid: thumbnailPid,
        },
      },
    };
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

export default updateAlbumThumbnail;
