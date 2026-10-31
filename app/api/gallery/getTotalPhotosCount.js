import "server-only";

import prisma from "@prisma/prisma";
import { unstable_cache } from "next/cache";

export const getTotalPhotosCount = unstable_cache(
  (uid) =>
    prisma.photo.count({
      where: {
        uid,
        album: { archived: false },
      },
    }),
  ["gallery-total-photos-count"],
  { revalidate: 3600 },
);
