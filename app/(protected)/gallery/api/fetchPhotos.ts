import type { PhotoWithUrl } from "@/types/photos";

interface GalleryPageData {
  photos: PhotoWithUrl[];
  nextCursor: string | null;
}

export async function fetchPhotos(cursor: string): Promise<GalleryPageData> {
  const searchParams = new URLSearchParams();

  if (cursor != null) {
    searchParams.set("cursor", cursor);
  }

  const query = searchParams.size > 0 ? `?${searchParams}` : "";
  const response = await fetch(`/api/gallery${query}`);

  if (!response.ok) {
    throw new Error("Unable to fetch photos");
  }

  return response.json() as Promise<GalleryPageData>;
}
