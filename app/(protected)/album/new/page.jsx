import ImageUploadProvider from "@app/(protected)/components/ImageUpload/ImageUploadContext";
import NewAlbumForm from "./components/NewAlbumForm";

const Page = () => {
  return (
    <div className="flex flex-col h-full p-3">
      <header className="page-heading">
        <h1>New Album</h1>
      </header>
      <div className="new-album-form grow text-md mt-2">
        <ImageUploadProvider>
          <NewAlbumForm />
        </ImageUploadProvider>
      </div>
    </div>
  );
};

export default Page;
