import NewAlbumForm from "./components/NewAlbumForm";

const Page = () => {
  return (
    <div className="flex flex-col  h-full">
      <div className="page-heading">
        <p>New Album</p>
    
      </div>
      <div className="grow text-md">
        <NewAlbumForm />
      </div>
    </div>
  );
};

export default Page;
