import { authOptions } from "@app/api/auth/[...nextauth]/route";
import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache";
import { SelectProvider } from "../components/Select/SelectContext";
import ArchivedContainer from "./components/ArchivedContainer";

const fetchArchivedPhotos = unstable_cache(
  async (uid) => {
    try {
      let photos = await prisma.photo.findMany({
        where: {
          uid,
          archived: true,
        },
        distinct: ["pid"],
      });
      photos = photos.map((photo) => ({
        ...photo,
        url: `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${uid}/${photo.aid}/${photo.name}`,
      }));
      return photos;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  ["gallery"],
  { revalidate: 3600 }
);

const Page = async () => {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;
  const photos = await fetchArchivedPhotos(uid);
  return (
    <SelectProvider>
      <ArchivedContainer photos={photos} />
    </SelectProvider>
  );
};

export default Page;
