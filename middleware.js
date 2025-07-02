import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const redirectAfterLogin = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const redirectUrl = new URL(`/login`, req.url);
  if (redirectAfterLogin !== "/") {
    redirectUrl.searchParams.set("redirectTo", redirectAfterLogin);
  }

  if (!token) {
    return NextResponse.redirect(redirectUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|assets|favicon.ico|robots.txt|static|images|fonts|login|register|emailVerification|forgotPassword|resetPassword).*)",
  ],
};
