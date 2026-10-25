import {
  PAGE_ROUTE_DASHBOARD,
  PAGE_ROUTE_LOGIN,
  PUBLIC_PATHS,
} from "@utils/pageRoutes";
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isAuthenticated = !!token;

  // Redirect to login page from protected pages if not authenticated
  if (!isAuthenticated && !isPublicPath) {
    const redirectUrl = new URL(PAGE_ROUTE_LOGIN, req.url);
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to dashboard from public pages (except landing) if authenticated
  if (isAuthenticated && isPublicPath && pathname !== "/") {
    return NextResponse.redirect(new URL(PAGE_ROUTE_DASHBOARD, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
