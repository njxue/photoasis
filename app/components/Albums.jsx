"use client";
import { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";
import Link from "next/link";
import ConfirmationModal from "@app/common/ConfirmationModal";
import deleteAlbums from "@actions/deleteAlbums";

const Albums = ({ albums }) => {
  const [filteredAlbums, setFilteredAlbums] = useState(albums);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isDeletingAlbums, setIsDeletingAlbums] = useState(false);

  const [selectedAlbums, setSelectedAlbums] = useState({});

  function handleChange(e) {
    const searchTerm = e.target.value.toUpperCase().trim();
    setFilteredAlbums(
      albums.filter((album) =>
        album.name.toUpperCase().trim().includes(searchTerm)
      )
    );
  }

  function handleClickAlbum(aid) {
    if (!isSelecting) {
      return;
    }
    if (selectedAlbums[aid]) {
      const newSelectedAlbums = { ...selectedAlbums };
      delete newSelectedAlbums[aid];
      setSelectedAlbums(newSelectedAlbums);
    } else {
      setSelectedAlbums((prev) => ({ ...prev, [aid]: 1 }));
    }
  }

  async function handleDeleteAlbums() {
    const res = await deleteAlbums(Object.keys(selectedAlbums));
    if (res.status === 204) {
      // Temporary fix, since revalidatePath in deleteAlbums is not working for some reason
      window.location.reload();
    }
  }

  useEffect(() => {
    if (!isSelecting) {
      setSelectedAlbums({});
    }
  }, [isSelecting]);

  const numSelected = Object.keys(selectedAlbums).length;

  return (
    <>
      <div>
        <div className="mb-3 flex flex-row items-center justify-between mt-2 flex-wrap gap-2">
          <div className="flex flex-row items-center gap-3 grow basis-3/4">
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
              onClick={() => setIsSelecting(true)}
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
                onClick={() => setIsSelecting(false)}>
                <img src="/assets/icons/cross.svg" width={20} />
                Cancel
              </button>
            </div>
          )}
          <input
            type="search"
            onChange={handleChange}
            placeholder="Find an album..."
            className="input py-1 px-2 rounded grow"
          />
        </div>
        <hr className="mb-3" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {filteredAlbums?.map((album) => (
          <div
            className={`relative ${
              isSelecting && !selectedAlbums[album.aid]
                ? "opacity-30"
                : "opacity-100"
            }`}
            onClick={() => {
              handleClickAlbum(album.aid);
            }}>
            <div className="cursor-pointer">
              <Link
                href={`/album/${album.aid}`}
                aria-disabled={isSelecting}
                className={isSelecting && "pointer-events-none"}>
                <AlbumCard
                  data={album}
                  key={album.aid}
                  selectedAlbums={selectedAlbums}
                  setSelectedAlbums={setSelectedAlbums}
                />
              </Link>
            </div>

            {selectedAlbums[album.aid] && (
              <div className="absolute top-0 right-0 p-1 opacity-60">
                <img src="/assets/icons/tick-circle.svg" width={30} />
              </div>
            )}
          </div>
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
export default Albums;
