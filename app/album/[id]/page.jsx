import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@prisma/prisma";
import AlbumContainer from "./components/AlbumContainer";

const fetchAlbumData = async (aid, uid) => {
  const data = await prisma.album.findUniqueOrThrow({
    where: {
      aid_uid: { aid, uid },
    },
    include: {
      photos: true,
    },
  });
  data.photos = data.photos.map((photo) => ({
    ...photo,
    url: `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${uid}/${aid}/${photo.name}`,
  }));

  return data;
};
const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  const albumData = await fetchAlbumData(parseInt(params.id), session.user.id);

  return <AlbumContainer albumData={albumData} />;
};

export default Page;
