import { authOptions } from "@app/api/auth/[...nextauth]/route";
import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import GalleryContainer from "./components/GalleryContainer";
import { unstable_cache } from "next/cache";

const fetchPhotos = unstable_cache(
  async (uid) => {
    let photos = await prisma.photo.findMany({
      where: {
        uid,
      },
      distinct: ["name"],
    });
    photos = photos.map((photo) => ({
      ...photo,
      url: `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${uid}/${photo.aid}/${photo.name}`,
    }));
    return photos;
  },
  ["gallery"],
  { revalidate: 3600 }
);

const Page = async () => {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;
  const photos = await fetchPhotos(uid);
  return <GalleryContainer photos={photos} />;
};

export default Page;
