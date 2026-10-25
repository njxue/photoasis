export const DUPLICATE_ALBUM_NAME_MESSAGE =
  "You already have an album with this name.";

export function createAlbumSlug(albumName: string): string {
  const slug = albumName
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "album";
}
