import { authOptions } from "@app/api/auth/[...nextauth]/route";
import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import Dashboard from "./components/Dashboard";
import { unstable_cache } from "next/cache";
import { UserPreferencesProvider } from "./UserPreferencesContext";

const fetchAlbums = unstable_cache(
  async (uid) => {
    try {
      let albums = await prisma.album.findMany({
        where: {
          uid: uid,
        },
        include: {
          thumbnail: true,
        },
      });

      let user = await prisma.user.findUnique({
        where: { id: uid },
      });

      const albumOrder = user.albumOrder;

      if (albumOrder) {
        albums.sort(
          (a1, a2) => albumOrder.indexOf(a1.aid) - albumOrder.indexOf(a2.aid)
        );
      }

      return albums;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  ["albums"],
  { revalidate: 3600 }
);

const Home = async () => {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;

  const albums = await fetchAlbums(uid);

  return (
    <div className="flex flex-center flex-col h-full w-full">
      <Dashboard albums={albums} />
    </div>
  );
};

export default Home;
