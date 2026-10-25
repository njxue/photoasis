import { unstable_cache } from "next/cache";
import type { Album, Photo } from "@prisma/client";
import prisma from "@prisma/prisma";
import { buildPhotoUrl } from "@utils/imageUrls";

export type PhotoView = Photo & { url?: string };

export type AlbumPageData = Omit<Album, "photos"> & {
  photos: PhotoView[];
  banner: PhotoView | null;
};

const getAlbumData = unstable_cache(
  async (slug: string, uid: number): Promise<AlbumPageData | null> => {
    try {
      const data = await prisma.album.findUniqueOrThrow({
        where: {
          uid_slug: { uid, slug },
        },
        include: {
          photos: true,
          banner: true,
        },
      });
      const orderByPid = new Map(
        data.photoOrder.map((pid, index) => [pid, index]),
      );
      const photos = data.photos
        .map((photo) => ({
          ...photo,
          url: buildPhotoUrl({ uid, aid: data.aid, name: photo.name }),
        }))
        .sort((first, second) => {
          if (orderByPid.size === 0) {
            return first.pid.localeCompare(second.pid);
          }

          return (
            (orderByPid.get(first.pid) ?? Number.MAX_SAFE_INTEGER) -
            (orderByPid.get(second.pid) ?? Number.MAX_SAFE_INTEGER)
          );
        });
      const banner = data.banner
        ? {
            ...data.banner,
            url: buildPhotoUrl({
              uid,
              aid: data.aid,
              name: data.banner.name,
            }),
          }
        : null;

      return { ...data, photos, banner };
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  ["album"],
  { revalidate: 3600 },
);

export const fetchAlbumData = getAlbumData;
