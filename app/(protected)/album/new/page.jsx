import ImageUploadProvider from "@app/(protected)/components/ImageUpload/ImageUploadContext";
import NewAlbumForm from "./components/NewAlbumForm";

const Page = () => {
  return (
    <div className="flex flex-col  h-full">
      <div className="page-heading">
        <p>New Album</p>
      </div>
      <div className="grow text-md mt-2">
        <ImageUploadProvider>
          <NewAlbumForm />
        </ImageUploadProvider>
      </div>
    </div>
  );
};

export default Page;
