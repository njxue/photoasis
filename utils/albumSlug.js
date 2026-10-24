import { Prisma } from "@prisma/client";

export const DUPLICATE_ALBUM_NAME_MESSAGE =
  "You already have an album with this name.";

export function createAlbumSlug(albumName) {
  const slug = albumName
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "album";
}

export function isAlbumSlugConflict(error) {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return false;
  }

  const target = error.meta?.target;

  if (Array.isArray(target)) {
    return target.includes("uid") && target.includes("slug");
  }

  return String(target).includes("uid_slug");
}
