import "server-only";

import prisma from "@prisma/prisma";
import { unstable_cache } from "next/cache";
import { buildPhotoUrl } from "@utils/imageUrls";

const PAGE_SIZE = 15;

export const getPhotos = unstable_cache(
  async (uid, cursor) => {
    const photos = await prisma.photo.findMany({
      where: {
        uid,
        album: { archived: false },
      },
      distinct: ["pid"],
      // +1 to check if hasMore
      take: PAGE_SIZE + 1,
      orderBy: { date: "desc" },
      ...(cursor != null && {
        cursor: { pid: cursor },
        skip: 1,
      }),
    });

    const hasMore = photos.length > PAGE_SIZE;
    const pagePhotos = photos.slice(0, PAGE_SIZE);
    const nextCursor = hasMore ? pagePhotos[pagePhotos.length - 1].pid : null;

    return {
      photos: pagePhotos.map((photo) => ({
        ...photo,
        url: buildPhotoUrl({
          uid,
          aid: photo.aid,
          name: photo.name,
        }),
      })),
      nextCursor,
    };
  },
  ["gallery"],
  { revalidate: 3600 },
);
