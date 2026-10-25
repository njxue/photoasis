import prisma from "@prisma/prisma";

interface HasAlbumWithSlugInput {
  uid: number;
  slug: string;
  excludeAid?: number;
}

export async function hasAlbumWithSlug({
  uid,
  slug,
  excludeAid,
}: HasAlbumWithSlugInput): Promise<boolean> {
  const album = await prisma.album.findFirst({
    where: {
      uid,
      slug,
      ...(excludeAid === undefined ? {} : { aid: { not: excludeAid } }),
    },
    select: { aid: true },
  });

  return album !== null;
}
