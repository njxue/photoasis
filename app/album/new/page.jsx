import DroppableFileInput from "@app/common/DroppableFileInput";
import NewAlbumForm from "./components/NewAlbumForm";

const Page = () => {
  return (
    <div className="p-1">
      <div className="flex flex-row items-center gap-3 mb-3 mt-2 text-3xl font-light">
        <p className="line-clamp-1">New Album</p>
      </div>
      <hr className="mb-3" />
      <NewAlbumForm />
    </div>
  );
};

export default Page;
