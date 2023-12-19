import { authOptions } from "@app/api/auth/[...nextauth]/route";
import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import Dashboard from "./Dashboard";

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
const DashboardContainer = async () => {
  const res = await fetchAlbums();
  return <Dashboard albums={res.data} />;
};
export default DashboardContainer;
