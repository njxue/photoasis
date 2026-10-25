"use server";

import prisma from "@prisma/prisma";
import type { UserPreferences } from "@prisma/client";
import { requireUserId } from "@auth/requireUser";

type UserPreferencesUpdate = Pick<UserPreferences, "objectFit">;

const updateUserPreferences = async (data: UserPreferencesUpdate) => {
  try {
    const uid = await requireUserId();
    const updatedUserPreferences = await prisma.userPreferences.upsert({
      where: {
        uid,
      },
      update: data,
      create: { uid, ...data },
    });
    return updatedUserPreferences;
  } catch (error) {
    console.error(error);
  }
};

export default updateUserPreferences;
