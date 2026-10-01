import ImageUploadProvider from "@app/(protected)/components/ImageUpload/ImageUploadContext";
import NewAlbumForm from "./components/NewAlbumForm";

const Page = () => {
  return (
    <div className="protected-page flex min-h-screen flex-col">
      <header className="mb-8 border-b border-black/15 pb-5">
        <p className="eyebrow">New collection</p>
        <h1 className="page-title">Create an album</h1>
      </header>
      <div className="new-album-form grow text-md">
        <ImageUploadProvider>
          <NewAlbumForm />
        </ImageUploadProvider>
      </div>
    </div>
  );
};

export default Page;
