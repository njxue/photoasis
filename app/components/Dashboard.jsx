"use client";
import { useState } from "react";
import { useSelect } from "@utils/customHooks";
import AlbumCard from "../common/Cards/Album/AlbumCard";
import Link from "next/link";
import ConfirmationModal from "@app/common/ConfirmationModal";
import deleteAlbums from "@actions/deleteAlbums";
import SelectableItem from "@app/common/Select/SelectableItem";

const Dashboard = ({ albums }) => {
  const [filteredAlbums, setFilteredAlbums] = useState(albums);
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

  function handleChange(e) {
    const searchTerm = e.target.value.toUpperCase().trim();
    setFilteredAlbums(
      albums.filter((album) =>
        album.name.toUpperCase().trim().includes(searchTerm)
      )
    );
  }

  async function handleDeleteAlbums() {
    const res = await deleteAlbums(selectedItems);
    if (res.status === 204) {
      // Temporary fix, since revalidatePath in deleteAlbums is not working for some reason
      window.location.reload();
    }
  }

  return (
    <>
      <div>
        <div className="mb-3 flex flex-row items-center justify-between mt-2 flex-wrap gap-2">
          <div className="flex flex-row items-center gap-3 grow">
            <p className="text-3xl ">Albums</p>
            <Link href="/album/new">
              <img src="/assets/icons/add-album.svg" width={30} />
            </Link>
          </div>
          <div className="flex flex-row gap-2 items-center flex-wrap max-w-[100%]">
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
            <input
              type="search"
              onChange={handleChange}
              placeholder="Find an album..."
              className="input py-1 px-2 rounded grow w-[300px] max-w-[100%]"
            />
          </div>
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
            <Link
              href={`/album/${album.aid}`}
              aria-disabled={isSelecting}
              className={isSelecting && "pointer-events-none"}>
              <AlbumCard data={album} />
            </Link>
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
