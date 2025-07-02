import {
  PAGE_ROUTE_DASHBOARD,
  PAGE_ROUTE_EMAIL_VERIFICATION,
  PAGE_ROUTE_FORGOT_PASSWORD,
  PAGE_ROUTE_LOGIN,
  PAGE_ROUTE_REGISTER,
  PAGE_ROUTE_RESET_PASSWORD,
} from "@utils/pageRoutes";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = [
  PAGE_ROUTE_LOGIN,
  PAGE_ROUTE_EMAIL_VERIFICATION,
  PAGE_ROUTE_REGISTER,
  PAGE_ROUTE_FORGOT_PASSWORD,
  PAGE_ROUTE_RESET_PASSWORD,
];

export default async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isAuthenticated = !!token;

  // Redirect to login page from protected pages if not authenticated
  if (!isAuthenticated && !isPublicPath) {
    const redirectUrl = new URL(PAGE_ROUTE_LOGIN, req.url);
    if (pathname !== "/") {
      redirectUrl.searchParams.set("redirectTo", pathname);
    }
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to dashboard from public pages (except landing) if authenticated
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL(PAGE_ROUTE_DASHBOARD, req.url));
  }

  // Landing page
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|assets|favicon.ico|robots.txt|static|images|fonts).*)",
  ],
};
