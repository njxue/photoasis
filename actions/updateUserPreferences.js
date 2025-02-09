"use server";

import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

const updateUserPreferences = async (data) => {
  try {
    const session = await getServerSession(authOptions);
    const uid = session?.user.id;
    let updatedUserPreferences = await prisma.userPreferences.upsert({
      where: {
        uid,
      },
      update: data,
      create: { uid, ...data },
    });
    return updatedUserPreferences;
  } catch (err) {
    console.log(err);
  }
};

export default updateUserPreferences;
