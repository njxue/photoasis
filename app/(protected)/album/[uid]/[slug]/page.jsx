import { authOptions } from "@auth/options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AlbumContainer from "./components/AlbumContainer";
import { AlbumProvider } from "./AlbumContext";
import { fetchAlbumData } from "./queries";
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

export default Page;
