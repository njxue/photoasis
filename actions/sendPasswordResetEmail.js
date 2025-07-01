"use server";

import { Resend } from "resend";
import jwt from "jsonwebtoken";
import ResetPasswordTemplate from "@app/emailTemplates/ResetPasswordTemplate";
import prisma from "@prisma/prisma";
import {
  ADMIN_EMAIL_ADDRESS,
  JWT_EXPIRY_RESET_PASSWORD,
  RESEND_API_KEY,
} from "@app/configs/emailConfigs";

export default async function sendPasswordResetEmail(email) {
  try {
    const resend = new Resend(RESEND_API_KEY);

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user is not valid, do not send email but return successfully to prevent user enumeration attacks
    if (!user || !user.isVerified || !user.password) {
      return {
        success: true,
      };
    }

    // User exists. Generate token and send email
    const emailToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRY_RESET_PASSWORD,
    });

    const { data, error } = await resend.emails.send({
      from: ADMIN_EMAIL_ADDRESS,
      to: email,
      subject: "Photoasis - Reset your password",
      react: ResetPasswordTemplate(emailToken),
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: String(error) };
  }
}
