import GalleryContainer from "./components/GalleryContainer";
import { requireUserId } from "@auth/requireUser";
import { getPhotos } from "@app/api/gallery/getPhotos";
import { getTotalPhotosCount } from "@app/api/gallery/getTotalPhotosCount";

export const metadata = {
  title: "Gallery",
};

const Page = async () => {
  const uid = await requireUserId();

  // First page photos
  const [{ photos, nextCursor }, totalPhotosCount] = await Promise.all([
    getPhotos(uid),
    getTotalPhotosCount(uid),
  ]);

  return (
    <GalleryContainer
      photos={photos}
      nextCursor={nextCursor}
      totalPhotosCount={totalPhotosCount}
    />
  );
};

export default Page;
