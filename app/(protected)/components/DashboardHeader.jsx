import AlbumSelect from "./AlbumSelect";
import Link from "next/link";
function DashboardHeader({ handleSearchTermChange }) {
  return (
    <>
      <div className="mb-3 flex flex-row items-center justify-between  flex-wrap gap-2">
        <div className="flex flex-row flex-wrap items-center justify-between gap-3 grow">
          <div className="flex flex-row items-center gap-3 page-heading">
            <header>
              <h1>Albums</h1>
            </header>
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
        <search className="grow basis-[150px]">
          <input
            type="search"
            onChange={handleSearchTermChange}
            placeholder="Find an album..."
            className="py-1 px-2 rounded w-full"
          />
        </search>
      </div>
      <hr className="mb-3" />
    </>
  );
}

export default DashboardHeader;
