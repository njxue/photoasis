"use client";
import { useEffect, useState } from "react";
import PhotoCard from "../../../common/PhotoCard";
import DeleteAlbumForm from "./Menu/DeleteAlbumForm";
import AlbumMenu from "./Menu/AlbumMenu";
import UpdateAlbumForm from "./Menu/UpdateAlbumForm";
import AddPhotosForm from "./Menu/AddPhotosForm";
import deletePhotos from "@actions/deletePhotos";
import ConfirmationModal from "@app/common/ConfirmationModal";

const AlbumContainer = ({ albumData }) => {
  const [minimalisticView, setMinimalisticView] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [isDeletingAlbum, setIsDeletingAlbum] = useState(false);
  const [isDeletingPhotos, setIsDeletingPhotos] = useState(false);
  const [isAddingPhotos, setIsAddingPhotos] = useState(false);

  const { photos, aid } = albumData;

  function handleClickPhoto(pid) {
    if (!isSelecting) {
      return;
    }
    if (selectedPhotos[pid]) {
      const newSelectedPhotos = { ...selectedPhotos };
      delete newSelectedPhotos[pid];
      setSelectedPhotos(newSelectedPhotos);
    } else {
      setSelectedPhotos((prev) => ({ ...prev, [pid]: 1 }));
    }
  }

  async function handleDeletePhotos() {
    const res = await deletePhotos({
      aid,
      pids: Object.keys(selectedPhotos),
    });
    if (res.status === 204) {
      setIsSelecting(false);
    }
  }

  useEffect(() => {
    if (!isSelecting) {
      setSelectedPhotos({});
    }
  }, [isSelecting]);

  const numSelected = Object.keys(selectedPhotos).length;

  return (
    <div className="h-full p-1">
      <div
        className="fixed right-5 bottom-5 w-[30px] cursor-pointer z-50 opacity-20 hover:opacity-70 hover:scale-110 transition-opacity ease-in-out duration-200"
        onClick={() => setMinimalisticView((prev) => !prev)}>
        <img
          src={`/assets/icons/${minimalisticView ? "unhide" : "hide"}.svg`}
        />
      </div>
      {/** ===================================================== Header ===================================================== */}
      {!minimalisticView && (
        <div className="p-1">
          <div className="flex flex-row items-center justify-between mb-3 mt-2 font-light">
            {isEditing ? (
              <UpdateAlbumForm
                onCancel={() => setIsEditing(false)}
                onSuccess={() => setIsEditing(false)}
                albumData={albumData}
              />
            ) : (
              <div className="flex flex-row justify-between gap-12 items-center grow max-w-[100%]">
                <p className="text-ellipsis overflow-hidden text-2xl md:text-3xl">
                  {albumData.name}
                </p>
                <div className="flex flex-row gap-2 min-w-[70px]">
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
                        onClick={() => setIsDeletingPhotos(true)}
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

                  <AlbumMenu
                    setIsDeletingAlbum={setIsDeletingAlbum}
                    setIsEditing={setIsEditing}
                    setIsAddingPhotos={setIsAddingPhotos}
                  />
                </div>
              </div>
            )}
          </div>

          <hr className="mb-3" />
          <DeleteAlbumForm
            albumData={albumData}
            isDeletingAlbum={isDeletingAlbum}
            setIsDeletingAlbum={setIsDeletingAlbum}
          />
          <AddPhotosForm
            albumData={albumData}
            show={isAddingPhotos}
            setShow={setIsAddingPhotos}
          />
          <ConfirmationModal
            isOpen={isDeletingPhotos}
            setIsOpen={setIsDeletingPhotos}
            prompt={`Are you sure you want to delete ${numSelected} photos?`}
            onConfirm={handleDeletePhotos}
          />
        </div>
      )}
      {/** ===================================================== Body ===================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {photos.map((photo) => (
          <div
            className={`relative ${
              isSelecting && !selectedPhotos[photo.pid]
                ? "opacity-30"
                : "opacity-100"
            }`}
            onClick={() => {
              handleClickPhoto(photo.pid);
            }}>
            <PhotoCard
              photo={photo}
              key={photo.pid}
              minimalisticView={minimalisticView}
              expandable={!isSelecting}
              disableHover={isSelecting}
            />
            {selectedPhotos[photo.pid] && (
              <div className="absolute top-0 right-0 p-1 opacity-60">
                <img src="/assets/icons/tick-circle.svg" width={30} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumContainer;
