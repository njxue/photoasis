"use client";
import { useState } from "react";
import AddPhotos from "./AddPhotos";
import DeleteAlbumForm from "./Menu/DeleteAlbumForm";
import AlbumMenu from "./Menu/AlbumMenu";
import UpdateAlbumForm from "./Menu/UpdateAlbumForm";
const AlbumHeader = ({ albumData, minimalisticView }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
            <div className="flex flex-row justify-between items-center grow">
              <div className="flex flex-row justify-between items-center gap-3">
                <p className="line-clamp-1 text-3xl">{albumData.name}</p>
                <AddPhotos aid={aid} />
              </div>
              <AlbumMenu
                setIsDeleting={setIsDeleting}
                setIsEditing={setIsEditing}
              />
            </div>
          )}
        </div>

        <hr className="mb-3" />
        <DeleteAlbumForm
          albumData={albumData}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
        />
      </div>
    )
  );
};

export default AlbumHeader;
