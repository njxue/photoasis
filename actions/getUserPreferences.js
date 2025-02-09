"use server";

import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

const getUserPreferences = async () => {
  try {
    const session = await getServerSession(authOptions);
    const uid = session?.user.id;
    let userPreferences = await prisma.userPreferences.findUnique({
      where: {
        uid,
      },
    });
    return userPreferences;
  } catch (err) {
    console.log(err);
  }
};

export default getUserPreferences;
