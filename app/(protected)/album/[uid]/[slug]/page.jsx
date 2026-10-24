import { cache } from "react";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import prisma from "@prisma/prisma";
import AlbumContainer from "./components/AlbumContainer";
import { unstable_cache } from "next/cache";
import { AlbumProvider } from "./AlbumContext";
import { buildPhotoUrl } from "@utils/imageUrls";
export async function generateMetadata({ params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return { title: "Album" };
  }

  const { uid, slug } = await params;
  const routeUid = Number(uid);
  const sessionUid = Number(session.user.id);

  if (routeUid !== sessionUid) {
    return { title: "Album" };
  }

  const albumData = await fetchAlbumData(slug, routeUid);

  return {
    title: albumData?.name ?? "Album",
  };
}

const getAlbumData = unstable_cache(
  async (slug, uid) => {
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

      data.photos = data.photos.map((photo) => ({
        ...photo,
        url: buildPhotoUrl({ uid, aid: data.aid, name: photo.name }),
      }));

      const sortedPids = data.photoOrder;

      if (sortedPids.length) {
        data.photos.sort(
          (p1, p2) => sortedPids.indexOf(p1.pid) - sortedPids.indexOf(p2.pid),
        );
      } else {
        data.photos.sort((p1, p2) => p1.pid.localeCompare(p2.pid));
      }

      if (data.banner) {
        data.banner = {
          ...data.banner,
          url: buildPhotoUrl({
            uid,
            aid: data.aid,
            name: data.banner.name,
          }),
        };
      }
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  ["album"],
  { revalidate: 3600 },
);

const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const { uid, slug } = await params;
  const routeUid = Number(uid);
  const sessionUid = Number(session?.user?.id);

  if (!session?.user || routeUid !== sessionUid) {
    return notFound();
  }

  const albumData = await fetchAlbumData(slug, routeUid);
  if (!albumData) {
    return notFound();
  }
  return (
    <AlbumProvider value={albumData}>
      <AlbumContainer />
    </AlbumProvider>
  );
};

export const fetchAlbumData = cache(getAlbumData);
export default Page;
