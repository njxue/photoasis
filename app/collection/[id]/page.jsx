import { authOptions } from "@app/api/auth/[...nextauth]/route";
import PhotoCard from "@components/Collection/PhotoCard";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const fetchCollectionData = async (cid) => {
  const prisma = new PrismaClient();
  const data = await prisma.collection.findUniqueOrThrow({
    where: {
      cid: cid,
    },
    include: {
      photos: true,
    },
  });
  data.photos = data.photos.map((photo) => ({
    ...photo,
    url: `${process.env.CLOUDFLARE_URL}/${data.uid}/thumbnail_${photo.name}`,
  }));

  return data;
};
const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session?.user) {
    redirect("/");
  }
  const collectionData = await fetchCollectionData(parseInt(params.id));
  const { photos } = collectionData;

  return (
    <div className="flex flex-row flex-wrap">
      {photos.map((photo) => (
        <PhotoCard photo={photo} key={photo.pid} />
      ))}
    </div>
  );
};

export default Page;
