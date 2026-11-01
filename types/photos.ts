import type { PhotoDataInput } from "@utils/helpers";
import type { Photo } from "@/generated/prisma/client";

export type PhotoWithUrl = Photo & {
  url: string | undefined;
};

export type EditablePhotoData = Omit<PhotoDataInput, "date"> & {
  date?: string | Date | null;
  id?: string;
  url?: string;
  size?: number;
  blurhash?: string | null;
  fileId?: string;
};

export interface PersistablePhotoInput extends PhotoDataInput {
  fileId: string;
  name: string;
  size: number;
  blurhash?: string | null;
}

export interface UpdatePhotoInput extends PhotoDataInput {
  pid: string;
}
