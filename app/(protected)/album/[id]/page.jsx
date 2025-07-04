import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import prisma from "@prisma/prisma";
import AlbumContainer from "./components/AlbumContainer";
import { unstable_cache } from "next/cache";
import { AlbumProvider } from "./AlbumContext";
export const fetchAlbumData = unstable_cache(
  async (aid, uid) => {
    try {
      const data = await prisma.album.findUniqueOrThrow({
        where: {
          aid_uid: { aid, uid },
        },
        include: {
          photos: true,
          banner: true,
        },
      });

      data.photos = data.photos.map((photo) => ({
        ...photo,
        url: `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${uid}/${aid}/${photo.name}`,
      }));

      const sortedPids = data.photoOrder;

      if (sortedPids.length) {
        data.photos.sort(
          (p1, p2) => sortedPids.indexOf(p1.pid) - sortedPids.indexOf(p2.pid)
        );
      } else {
        data.photos.sort((p1, p2) => p1.pid.localeCompare(p2.pid));
      }

      if (data.banner) {
        data.banner = {
          ...data.banner,
          url: `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${uid}/${aid}/${data.banner.name}`,
        };
      }
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  ["album"],
  { revalidate: 3600 }
);
const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);

  const albumData = await fetchAlbumData(parseInt(params.id), session.user.id);
  if (!albumData) {
    return notFound();
  }
  return (
    <AlbumProvider value={albumData}>
      <AlbumContainer />;
    </AlbumProvider>
  );
};

export default Page;
