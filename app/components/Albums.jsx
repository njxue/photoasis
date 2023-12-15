import AlbumCard from "./AlbumCard";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import AddAlbum from "./AddAlbum";

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
const Albums = async ({}) => {
  const res = await fetchAlbums();

  return (
    <>
      <div>
        <div className="text-3xl mb-3 flex flex-row items-center justify-start gap-3 mt-2">
          <p>Albums</p>
          <AddAlbum />
        </div>
        <hr className="mb-3" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {/* <AddAlbum /> */}
        {res.data?.map((album) => (
          <AlbumCard data={album} key={album.aid} />
        ))}
      </div>
    </>
  );
};
export default Albums;
