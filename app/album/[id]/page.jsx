import { authOptions } from "@app/api/auth/[...nextauth]/route";
import PhotoCard from "@app/album/[id]/components/PhotoCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@prisma/prisma";
import AddPhotos from "@app/album/[id]/components/AddPhotos";

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
    url: `${process.env.CLOUDFLARE_URL}/${uid}/${aid}/${photo.name}`,
  }));

  return data;
};
const Page = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  const albumData = await fetchAlbumData(parseInt(params.id), session.user.id);
  const { photos, aid, name } = albumData;

  return (
    <>
      <div className="relative h-full p-3">
        <div className="flex flex-row text-5xl font-light items-center gap-16 mb-10">
          <hr className="grow border border-solid border-gray-300" />
          {name}
          <hr className="grow border border-solid border-gray-300" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          <AddPhotos aid={aid} />

          {photos.map((photo) => (
            <PhotoCard photo={photo} key={photo.pid} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
