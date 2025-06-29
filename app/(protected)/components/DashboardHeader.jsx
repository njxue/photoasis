import AlbumSelect from "./AlbumSelect";
import Link from "next/link";
function DashboardHeader({ handleSearchTermChange }) {
  return (
    <div>
      <div className="mb-3 flex flex-row items-center justify-between  flex-wrap gap-2">
        <div className="flex flex-row flex-wrap items-center justify-between gap-3 grow">
          <div className="flex flex-row items-center gap-3 page-heading">
            <p>Albums</p>
            <Link href="/album/new">
              <img
                src="/assets/icons/add-album.svg"
                width={30}
                alt="addAlbum"
              />
            </Link>
          </div>
          <AlbumSelect />
        </div>
        <input
          type="search"
          onChange={handleSearchTermChange}
          placeholder="Find an album..."
          className=" py-1 px-2 rounded grow basis-[150px]"
        />
      </div>
      <hr className="mb-3" />
    </div>
  );
}

export default DashboardHeader;
