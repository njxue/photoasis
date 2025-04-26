"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { formatPhotoData } from "@utils/helpers";

async function updatePhoto(data, revalidate = true) {
  const prisma = new PrismaClient();

  const updatedPhoto = await prisma.photo.update({
    where: {
      pid: data.pid,
    },
    data: formatPhotoData(data),
  });

  if (updatedPhoto) {
    if (revalidate) {
      revalidatePath("/", "layout");
    }
    return { status: 200, message: "Success", data: updatedPhoto, ok: true };
  }
  return { status: 500, message: "Unable to update photo", ok: false };
}

export default updatePhoto;
