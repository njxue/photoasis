"use server";
import prisma from "@prisma/prisma";
import { registerSchema } from "@zodSchema/registerSchema";
import bcrypt from "bcrypt";
import sendEmailVerification from "./sendEmailVerification";
async function signUp(_, formData) {
  try {
    const data = Object.fromEntries(formData);
    const result = registerSchema.safeParse(data);

    if (!result.success) {
      return {
        form: data,
        validationErrors: result.error.flatten().fieldErrors,
        success: false,
      };
    }

    const { email, password } = data;

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
    console.log(emailRes);

    // Roll-back user creation if failed to send email verification
    if (!emailRes.success) {
      await prisma.user.delete({
        where: { email },
      });
      return { success: false, error: "Unable to create user" };
    }

    return {
      form: data,
      success: true,
    };
  } catch (err) {
    console.log(err);
    return { success: false, error: "Unable to create user" };
  }
}

export default signUp;
