"use client";
import { useSelectContext } from "@app/common/Select/SelectContext";
import AlbumSelect from "./PhotoSelect";
import AlbumMenu from "./Menu/AlbumMenu";
import UpdateAlbumForm from "./Menu/UpdateAlbumForm";
import { useState } from "react";
function AlbumHeader({ albumData }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-1 mb-3 mt-2 font-light">
      {isEditing ? (
        <UpdateAlbumForm setIsEditing={setIsEditing} albumData={albumData} />
      ) : (
        <div className="flex flex-row flex-wrap justify-between gap-2 items-center grow max-w-[100%]">
          <p className="line-clamp-2 text-2xl md:text-3xl basis-1/2 grow ">
            {albumData.name}
          </p>
          <div className="flex flex-row justify-end grow gap-2 ">
            <AlbumSelect albumData={albumData} />
            <AlbumMenu setIsEditing={setIsEditing} albumData={albumData} />
          </div>
        </div>
      )}

      <hr className="mb-3" />
    </div>
  );
}

export default AlbumHeader;
