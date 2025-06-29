"use server";
import prisma from "@prisma/prisma";
import { registerSchema } from "@zodSchema/registerSchema";
import bcrypt from "bcrypt";
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

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return { success: false, error: "User already exists" };
    }

    user = await prisma.user.create({
      data: {
        email,
        name: email,
        password: await bcrypt.hash(password, 10),
      },
    });

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
