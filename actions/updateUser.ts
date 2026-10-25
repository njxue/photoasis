"use server";

import { revalidatePath } from "next/cache";
import prisma from "@prisma/prisma";
import { requireUserId } from "@auth/requireUser";
import type { MutationResult } from "@actions/types";

interface UpdateUserInput {
  albumOrder: number[];
}

async function updateUser(
  data: UpdateUserInput,
  revalidate = true,
): Promise<MutationResult> {
  const uid = await requireUserId();

  const { albumOrder } = data;

  const updatedUser = await prisma.user.update({
    where: { id: uid },
    data: {
      albumOrder,
    },
  });

  if (updatedUser) {
    if (revalidate) {
      revalidatePath("/", "layout");
    }
    return { status: 204, ok: true, message: "Successfully updated user" };
  }
  return { status: 400, ok: false, message: "Unable to update user" };
}

export default updateUser;
