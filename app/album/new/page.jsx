import NewAlbumForm from "./components/NewAlbumForm";

const Page = () => {
  return (
    <div className="flex flex-col p-1 h-full">
      <div>
        <p className="text-3xl font-light line-clamp-1">New Album</p>
        <hr className="mb-3" />
      </div>
      <div className="grow">
        <NewAlbumForm />
      </div>
    </div>
  );
};

export default Page;
