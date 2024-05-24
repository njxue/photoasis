"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

import { revalidatePath } from "next/cache";

async function updateUser(data, revalidate = true) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

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
    return { status: 204, ok: true };
  }
  return { status: 400, ok: false };
}

export default updateUser;
