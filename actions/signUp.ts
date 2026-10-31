"use server";
import prisma from "@prisma/prisma";
import { registerSchema } from "@zodSchema/registerSchema";
import bcrypt from "bcryptjs";
import sendEmailVerification from "./sendEmailVerification";

async function signUp(_previousState: unknown, formData: FormData) {
  try {
    const form = Object.fromEntries(formData);
    const result = registerSchema.safeParse(form);

    if (!result.success) {
      return {
        form,
        validationErrors: result.error.flatten().fieldErrors,
        success: false,
      };
    }

    const { email, password } = result.data;

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return { success: false, error: "User already exists" };
    }

    // Create user
    user = await prisma.user.create({
      data: {
        email,
        name: email,
        password: await bcrypt.hash(password, 10),
      },
    });

    // Send email verification
    const emailRes = await sendEmailVerification(email);

    // Roll-back user creation if failed to send email verification
    if (!emailRes.success) {
      await prisma.user.delete({
        where: { email },
      });
      return { success: false, error: "Unable to create user" };
    }

    return {
      form,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Unable to create user" };
  }
}

export default signUp;
