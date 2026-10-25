"use server";

import prisma from "@prisma/prisma";
import { passwordSchema } from "@zodSchema/passwordSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface PasswordResetToken {
  email: string;
}

export async function resetPassword(token: string, password: string) {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as PasswordResetToken;
    const { email } = payload;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // User does not exist, user is not verified, or user is not registered via credentials
    if (!user || !user.isVerified || !user.password) {
      return { success: false, error: "User not found" };
    }

    // Validate password strength
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      return {
        validationError: result.error.errors?.[0]?.message,
        success: false,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Invalid or expired token" };
  }
}
