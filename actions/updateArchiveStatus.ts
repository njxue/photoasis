"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

async function updateArchivedStatus(
  photoPids: string[],
  archive: boolean
): Promise<{ status: number; message: string; data?: any; ok: boolean }> {
  const updatedPhotos = await prisma.photo.updateMany({
    where: {
      pid: {
        in: photoPids,
      },
    },
    data: { archived: archive },
  });

  if (updatedPhotos.count > 0) {
    revalidatePath("/", "layout");
    return { status: 200, message: "Success", data: updatedPhotos, ok: true };
  }
  return { status: 500, message: "Unable to update photo", ok: false };
}

export default updateArchivedStatus;
