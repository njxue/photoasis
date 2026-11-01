import prisma from "@prisma/prisma";
import Dashboard from "../components/Dashboard";
import { unstable_cache } from "next/cache";
import { requireUserId } from "@auth/requireUser";

export const metadata = {
  title: "Dashboard",
};

const fetchAlbums = unstable_cache(
  async (uid: number) => {
    try {
      let albums = await prisma.album.findMany({
        where: {
          uid: uid,
          archived: false,
        },
        include: {
          thumbnail: true,
        },
      });

      let user = await prisma.user.findUnique({
        where: { id: uid },
      });

      const albumOrder = user?.albumOrder;

      if (albumOrder) {
        albums.sort(
          (a1, a2) => albumOrder.indexOf(a1.aid) - albumOrder.indexOf(a2.aid),
        );
      }

      return albums;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  ["albums"],
  { revalidate: 3600 },
);

const Home = async () => {
  const uid = await requireUserId();

  const albums = await fetchAlbums(uid);

  return (
    <div className="protected-page">
      <Dashboard albums={albums} />
    </div>
  );
};

export default Home;
