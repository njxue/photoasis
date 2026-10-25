"use server";

import prisma from "@prisma/prisma";
import { requireUserId } from "@auth/requireUser";

const getUserPreferences = async () => {
  try {
    const uid = await requireUserId();
    const userPreferences = await prisma.userPreferences.findUnique({
      where: {
        uid,
      },
    });
    return userPreferences;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getUserPreferences;
