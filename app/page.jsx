import { authOptions } from "@app/api/auth/[...nextauth]/route";
import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import Dashboard from "./components/Dashboard";

const fetchAlbums = async () => {
  try {
    const session = await getServerSession(authOptions);
    const uid = session?.user.id;

    let albums = await prisma.album.findMany({
      where: {
        uid: uid,
      },
      include: {
        thumbnail: true,
      },
    });
    return {
      data: albums,
      status: 200,
    };
  } catch (err) {
    return { status: 500 };
  }
};

const Home = async () => {
  const res = await fetchAlbums();
  return (
    <div className="flex flex-center flex-col h-full w-full">
      <Dashboard albums={res.data} />
    </div>
  );
};

export default Home;
