import type { Album, Photo } from "@/generated/prisma/client";
import type { PersistablePhotoInput } from "@/types/photos";

export type AlbumWithThumbnail = Album & {
  thumbnail: Photo | null;
};

export interface UpdateAlbumInput {
  aid: number;
  photos?: PersistablePhotoInput[];
  albumName?: string;
  photoOrder?: string[];
  thumbnailPid?: string;
  bannerPid?: string;
}
