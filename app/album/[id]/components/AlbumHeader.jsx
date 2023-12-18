"use client";
import { useState } from "react";
import DeleteAlbumForm from "./Menu/DeleteAlbumForm";
import AlbumMenu from "./Menu/AlbumMenu";
import UpdateAlbumForm from "./Menu/UpdateAlbumForm";
import AddPhotosForm from "./Menu/AddPhotosForm";
const AlbumHeader = ({ albumData, minimalisticView }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingPhotos, setIsAddingPhotos] = useState(false);

  const { aid } = albumData;

  return (
    !minimalisticView && (
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
    )
  );
};

export default AlbumHeader;
