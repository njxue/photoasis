import { authOptions } from "@app/api/auth/[...nextauth]/route";
import PhotoCard from "@app/collection/[id]/components/PhotoCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@prisma/prisma";
import AddPhotos from "@app/collection/[id]/components/AddPhotos";

const fetchCollectionData = async (cid, uid) => {
  const data = await prisma.collection.findUniqueOrThrow({
    where: {
      cid_uid: { cid, uid },
    },
    include: {
      photos: true,
    },
  });
  data.photos = data.photos.map((photo) => ({
    ...photo,
    url: `${process.env.CLOUDFLARE_URL}/${uid}/${cid}/${photo.name}`,
  }));

  return data;
};
const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  const collectionData = await fetchCollectionData(
    parseInt(params.id),
    session.user.id
  );
  const { photos, cid } = collectionData;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        <AddPhotos cid={cid} />
        {photos.map((photo) => (
          <PhotoCard photo={photo} key={photo.pid} />
        ))}
      </div>
    </>
  );
};

export default Page;
