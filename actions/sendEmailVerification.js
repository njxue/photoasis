"use server";

import { Resend } from "resend";
import jwt from "jsonwebtoken";
import VerifyEmailTemplate from "@app/emailTemplates/VerifyEmailTemplate";
import prisma from "@prisma/prisma";
import {
  ADMIN_EMAIL_ADDRESS,
  JWT_EMAIL_TOKEN_EXPIRY,
  RESEND_API_KEY,
} from "@app/configs/emailConfigs";

export default async function sendEmailVerification(email) {
  try {
    const resend = new Resend(RESEND_API_KEY);

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user does not exist, do not send email but return successfully to prevent user enumeration attacks
    if (!user) {
      return {
        success: true,
      };
    }

    // User exists. Generate token and send email
    const emailToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: JWT_EMAIL_TOKEN_EXPIRY,
    });

    const { data, error } = await resend.emails.send({
      from: ADMIN_EMAIL_ADDRESS,
      to: email,
      subject: "Photoasis - Activate your account",
      react: VerifyEmailTemplate(emailToken),
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
