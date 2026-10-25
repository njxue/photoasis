"use server";

import type { Photo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { formatPhotoData } from "@utils/helpers";
import prisma from "@prisma/prisma";
import { requireUserId } from "@auth/requireUser";
import type { MutationResult } from "@actions/types";
import type { UpdatePhotoInput } from "@/types/photos";

async function updatePhoto(
  data: UpdatePhotoInput,
  revalidate = true,
): Promise<MutationResult<Photo>> {
  const uid = await requireUserId();
  const updatedPhoto = await prisma.photo.update({
    where: {
      pid: data.pid,
      uid,
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
