"use client";
import { useEffect, useState } from "react";
import { useSelect } from "@utils/customHooks";
import AlbumCard from "../common/Cards/Album/AlbumCard";
import Link from "next/link";
import deleteAlbums from "@actions/deleteAlbums";
import SelectableItem from "@app/common/Select/SelectableItem";
import SelectControls from "@app/common/Select/SelectControls";
import { toast } from "react-toastify";

const Dashboard = ({ albums }) => {
  const [filteredAlbums, setFilteredAlbums] = useState(albums);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    isSelecting,
    endSelect,
    beginSelect,
    selectItem,
    selectedItems,
    numSelected,
    isSelected,
  } = useSelect();

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value.toUpperCase().trim());
  }

  async function handleDeleteAlbums() {
    const res = await deleteAlbums(selectedItems);
    if (res.status === 204) {
      endSelect();
      toast.success("Album(s) deleted successfully");
    } else {
      toast.error("Unable to delete selected album(s). Please try again later");
    }
  }

  useEffect(() => {
    setFilteredAlbums(
      albums.filter((album) =>
        album.name.toUpperCase().trim().includes(searchTerm)
      )
    );
  }, [albums, searchTerm]);

  return (
    <>
      <div>
        <div className="mb-3 flex flex-row items-center justify-between  flex-wrap gap-2">
          <div className="flex flex-row flex-wrap items-center justify-between gap-3 grow">
            <div className="flex flex-row items-center gap-3 page-heading">
              <p>Albums</p>
              <Link href="/album/new">
                <img src="/assets/icons/add-album.svg" width={30} />
              </Link>
            </div>

            <SelectControls
              isSelecting={isSelecting}
              beginSelect={beginSelect}
              endSelect={endSelect}
              numSelected={numSelected}
              handleSubmit={handleDeleteAlbums}
              prompt={`Are you sure you want to delete ${numSelected} albums?`}
            />
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
      <div className="photo-grid">
        {filteredAlbums?.map((album) => (
          <SelectableItem
            handleSelect={() => selectItem(album.aid)}
            isSelecting={isSelecting}
            selected={isSelected(album.aid)}
            key={album.aid}>
            <AlbumCard data={album} disablePointer={isSelecting} />
          </SelectableItem>
        ))}
      </div>
    </>
  );
};
export default Dashboard;
