"use client";
import { useState } from "react";
import PhotoCard from "../../../common/PhotoCard";
import DeleteAlbumForm from "./Menu/DeleteAlbumForm";
import AlbumMenu from "./Menu/AlbumMenu";
import UpdateAlbumForm from "./Menu/UpdateAlbumForm";
import AddPhotosForm from "./Menu/AddPhotosForm";

const AlbumContainer = ({ albumData }) => {
  const [minimalisticView, setMinimalisticView] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingPhotos, setIsAddingPhotos] = useState(false);

  const { photos } = albumData;

  return (
    <div className="h-full p-1">
      <div
        className="fixed right-5 bottom-5 w-[30px] cursor-pointer z-50 opacity-20 hover:opacity-70 hover:scale-110 transition-opacity ease-in-out duration-200"
        onClick={() => setMinimalisticView((prev) => !prev)}>
        <img
          src={`/assets/icons/${minimalisticView ? "unhide" : "hide"}.svg`}
        />
      </div>

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
                  <img src="/assets/icons/select.svg" width={30} />
                  <AlbumMenu
                    setIsDeleting={setIsDeleting}
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
            isDeleting={isDeleting}
            setIsDeleting={setIsDeleting}
          />
          <AddPhotosForm
            albumData={albumData}
            show={isAddingPhotos}
            setShow={setIsAddingPhotos}
          />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {photos.map((photo) => (
          <PhotoCard
            photo={photo}
            key={photo.pid}
            minimalisticView={minimalisticView}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumContainer;
