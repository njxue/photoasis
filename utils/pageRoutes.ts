// Public routes
export const PAGE_ROUTE_LANDING = "/";
export const PAGE_ROUTE_LOGIN = "/login";
export const PAGE_ROUTE_REGISTER = "/register";
export const PAGE_ROUTE_FORGOT_PASSWORD = "/forgot-password";
export const PAGE_ROUTE_RESET_PASSWORD = "/reset-pssword";
export const PAGE_ROUTE_EMAIL_VERIFICATION = "/verify-email";

// Protected routes
export const PAGE_ROUTE_DASHBOARD = "/dashboard";
export const PAGE_ROUTE_GALLERY = "/gallery";
export const PAGE_ROUTE_NEW_ALBUM = "/album/new";
export const PAGE_ROUTE_ARCHIVE = "/archive";
export const PAGE_ROUTE_SETTINGS = "/settings";

export const getAlbumRoute = (uid: number | string, slug: string): string =>
  `/album/${encodeURIComponent(uid)}/${encodeURIComponent(slug)}`;

export const PUBLIC_PATHS = [
  PAGE_ROUTE_LOGIN,
  PAGE_ROUTE_EMAIL_VERIFICATION,
  PAGE_ROUTE_REGISTER,
  PAGE_ROUTE_FORGOT_PASSWORD,
  PAGE_ROUTE_RESET_PASSWORD,
  PAGE_ROUTE_LANDING,
];
export const PRIVATE_PATHS = [
  PAGE_ROUTE_DASHBOARD,
  PAGE_ROUTE_GALLERY,
  PAGE_ROUTE_NEW_ALBUM,
  PAGE_ROUTE_ARCHIVE,
  PAGE_ROUTE_SETTINGS,
];
