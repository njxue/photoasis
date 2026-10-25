import type { PhotoDataInput } from "@utils/helpers";

export interface PersistablePhotoInput extends PhotoDataInput {
  fileId: string;
  name: string;
  size: number;
  blurhash?: string | null;
}

export interface UpdatePhotoInput extends PhotoDataInput {
  pid: string;
}

export interface UpdateAlbumInput {
  aid: number;
  photos?: PersistablePhotoInput[];
  albumName?: string;
  photoOrder?: string[];
  thumbnailPid?: string;
  bannerPid?: string;
}
