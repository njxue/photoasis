"use client";
import { useEffect, useState } from "react";
import { useSelect } from "@utils/customHooks";
import AlbumCard from "../common/Cards/Album/AlbumCard";
import Link from "next/link";
import ConfirmationModal from "@app/common/ConfirmationModal";
import deleteAlbums from "@actions/deleteAlbums";
import SelectableItem from "@app/common/Select/SelectableItem";
import { toast } from "react-toastify";

const Dashboard = ({ albums }) => {
  const [filteredAlbums, setFilteredAlbums] = useState(albums);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeletingAlbums, setIsDeletingAlbums] = useState(false);

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
        <div className="mb-3 flex flex-row items-center justify-between mt-2 flex-wrap gap-2">
          <div className="flex flex-row flex-wrap items-center justify-between gap-3 grow">
            <div className="flex flex-row items-center gap-3">
              <p className="text-3xl ">Albums</p>
              <Link href="/album/new">
                <img src="/assets/icons/add-album.svg" width={30} />
              </Link>
            </div>

            {!isSelecting ? (
              <img
                src="/assets/icons/select.svg"
                width={30}
                className="cursor-pointer"
                onClick={beginSelect}
              />
            ) : (
              <div className="flex flex-row justify-center items-center gap-1">
                <button
                  onClick={() => setIsDeletingAlbums(true)}
                  disabled={!numSelected}
                  className="flex flex-row justify-center items-center gap-1 bg-red-700 px-2 py-1 rounded font-bold text-white disabled:opacity-50">
                  <img src="/assets/icons/trash.svg" width={20} />
                  Delete <span>({numSelected})</span>
                </button>
                <button
                  className="flex flex-row justify-center items-center gap-1 bg-white px-2 py-1 rounded font-bold"
                  onClick={endSelect}>
                  <img src="/assets/icons/cross.svg" width={20} />
                  Cancel
                </button>
              </div>
            )}
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
      <ConfirmationModal
        isOpen={isDeletingAlbums}
        setIsOpen={setIsDeletingAlbums}
        onConfirm={handleDeleteAlbums}
        prompt={`Are you sure you want to delete ${numSelected} albums?`}
      />
    </>
  );
};
export default Dashboard;
