import { authOptions } from "@app/api/auth/[...nextauth]/route";
import PhotoCard from "@app/common/PhotoCard";
import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
const fetchPhotos = async (uid) => {
  let photos = await prisma.photo.findMany({
    where: {
      uid,
    },
    distinct: ["name"],
  });
  photos = photos.map((photo) => ({
    ...photo,
    url: `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${uid}/${photo.aid}/${photo.name}`,
  }));
  return photos;
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  const uid = session?.user.id;
  const photos = await fetchPhotos(uid);
  return (
    <div className="p-1">
      <div>
        <div className="flex flex-row items-center gap-3 mb-3 mt-2 text-3xl font-light">
          <p className="line-clamp-1">Gallery</p>
        </div>
        <hr className="mb-3" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {photos && photos.map((photo) => <PhotoCard photo={photo} expandable/>)}
      </div>
    </div>
  );
};

export default Page;
