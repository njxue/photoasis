import Archive from "./components/Archive";
import prisma from "@prisma/prisma";
import { unstable_cache } from "next/cache";
import { requireUserId } from "@auth/requireUser";

export const metadata = {
  title: "Archive",
};

const fetchArchivedAlbums = unstable_cache(
  async (uid: number) => {
    try {
      let albums = await prisma.album.findMany({
        where: {
          uid: uid,
          archived: true,
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
const ArchivePage = async () => {
  const uid = await requireUserId();

  const archivedAlbums = await fetchArchivedAlbums(uid);

  return (
    <div className="protected-page">
      <Archive albums={archivedAlbums} />
    </div>
  );
};

export default ArchivePage;
