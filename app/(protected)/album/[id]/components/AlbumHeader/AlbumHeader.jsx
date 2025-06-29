"use client";
import SelectControls from "./SelectControls";
import AlbumMenu from "./Menu/AlbumMenu";
import UpdateAlbumForm from "./Menu/UpdateAlbumForm";
import { useState } from "react";
import { useSelect } from "@app/(protected)/components/Select/SelectContext";
import { useAlbum } from "../../AlbumContext";
function AlbumHeader() {
  const album = useAlbum();
  const [isEditing, setIsEditing] = useState(false);
  const { mode, beginSelect, isSelecting } = useSelect();
  const selectModes = { delete: "DELETE", thumbnail: "THUMBNAIL" };

  const onClickChangeThumbnail = () => {
    beginSelect({ allowMultiple: false, mode: selectModes.thumbnail });
  };

  return (
    <div className="page-heading">
      {isEditing ? (
        <UpdateAlbumForm setIsEditing={setIsEditing} />
      ) : (
        <div className="flex flex-row flex-wrap justify-between gap-3 items-center">
          <p className="line-clamp-2 grow">{album.name}</p>
          <div className="flex flex-row justify-end grow gap-2 text-base">
            <SelectControls selectModes={selectModes} mode={mode} />
            {!isSelecting && (
              <AlbumMenu
                onClickChangeThumbnail={onClickChangeThumbnail}
                setIsEditing={setIsEditing}
              />
            )}
          </div>
        </div>
      )}
      <hr className="mb-3" />
    </div>
  );
}

export default AlbumHeader;
