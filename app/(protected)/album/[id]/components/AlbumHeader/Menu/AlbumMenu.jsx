"use client";

import { useState, useRef } from "react";
import DeleteAlbumForm from "./DeleteAlbumForm";
import AddPhotosForm from "./AddPhotosForm";
import ImageUploadProvider from "@app/(protected)/components/ImageUpload/ImageUploadContext";
import SelectTrigger from "@app/(protected)/components/Select/SelectTrigger";
import useClickOutside from "@app/common/hooks/useClickOutside";
import { useSelect } from "@app/(protected)/components/Select/SelectContext";
import SelectControls from "../SelectControls";

const AlbumMenu = () => {
  const [isDeletingAlbum, setIsDeletingAlbum] = useState(false);
  const [isAddingPhotos, setIsAddingPhotos] = useState(false);

  const { isSelecting } = useSelect();
  const selectModes = {
    changeThumbnail: "changeThumbnail",
    deletePhotos: "deletePhotos",
    downloadPhotos: "downloadPhotos",
  };

  const menuRef = useRef();
  const { isVisible: showMenu, setIsVisible: setShowMenu } =
    useClickOutside(menuRef);

  return (
    <>
      <div className="relative z-50 flex flex-col items-end">
        {showMenu && !isSelecting && (
          <div
            className="absolute top-8 flex flex-col z-50 bg-black/70 rounded text-white text-sm w-[180px] right-0 sm:bottom-8 sm:top-auto animate-slideUp"
            ref={menuRef}>
            <div
              className="cursor-pointer p-2 hover:bg-black"
              onClick={() => setIsAddingPhotos(true)}>
              Add Photos
            </div>

            <div
              className="cursor-pointer p-2 hover:bg-black"
              onClick={() => setIsDeletingAlbum(true)}>
              Delete
            </div>
            <SelectTrigger
              renderTrigger={
                <div className="cursor-pointer p-2 hover:bg-black">
                  Change Thumbnail
                </div>
              }
              allowMultiple={false}
              mode={selectModes.changeThumbnail}
            />
          </div>
        )}

        <div className="flex items-center gap-2 text-xs ">
          <SelectControls selectModes={selectModes} />
          {!isSelecting && (
            <img
              src="/assets/icons/settings-white.svg"
              alt="settings"
              className="min-w-[20px] w-[20px] cursor-pointer bottom-0 right-2 opacity-70 hover:opacity-90 transition"
              onClick={() => setShowMenu(true)}
            />
          )}
        </div>
      </div>
      <DeleteAlbumForm
        isDeletingAlbum={isDeletingAlbum}
        setIsDeletingAlbum={setIsDeletingAlbum}
      />
      <ImageUploadProvider>
        <AddPhotosForm show={isAddingPhotos} setShow={setIsAddingPhotos} />
      </ImageUploadProvider>
    </>
  );
};

export default AlbumMenu;
