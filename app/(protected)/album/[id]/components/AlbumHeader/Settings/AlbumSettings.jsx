"use client";

import { useState, useRef } from "react";
import DeleteAlbumForm from "./DeleteAlbumForm";
import AddPhotosForm from "./AddPhotosForm";
import ImageUploadProvider from "@app/(protected)/components/ImageUpload/ImageUploadContext";
import SelectTrigger from "@app/(protected)/components/Select/SelectTrigger";
import useClickOutside from "@app/common/hooks/useClickOutside";
import { useSelect } from "@app/(protected)/components/Select/SelectContext";
import SelectControls from "../SelectControls";

const AlbumSettings = () => {
  const [isDeletingAlbum, setIsDeletingAlbum] = useState(false);
  const [isAddingPhotos, setIsAddingPhotos] = useState(false);

  const { isSelecting } = useSelect();
  const selectModes = {
    changeThumbnail: "changeThumbnail",
    deletePhotos: "deletePhotos",
    downloadPhotos: "downloadPhotos",
    changeBanner: "changeBanner",
  };

  const menuRef = useRef();
  const { isVisible: showMenu, setIsVisible: setShowMenu } =
    useClickOutside(menuRef);

  const menuOptionClassname =
    "flex items-center w-full gap-2 cursor-pointer p-2 text-xs hover:bg-black";

  return (
    <>
      <div className="relative z-50 flex flex-col items-end">
        {showMenu && !isSelecting && (
          <menu
            className="album-menu absolute top-8 flex flex-col z-50 bg-black/70 rounded text-white text-sm w-[180px] right-0 sm:bottom-8 sm:top-auto animate-slideUp"
            ref={menuRef}>
            <li>
              <button
                className={menuOptionClassname}
                onClick={() => setIsAddingPhotos(true)}>
                <img
                  src="/assets/icons/plus-white.svg"
                  alt="add photos"
                  className="w-4"
                />
                <span>Add Photos</span>
              </button>
            </li>
            <li>
              <SelectTrigger
                renderTrigger={
                  <div className={menuOptionClassname}>
                    <img
                      src="/assets/icons/thumbnail-white.svg"
                      alt="add photos"
                      className="w-4 px-[2px]"
                    />
                    <span>Change Thumbnail</span>
                  </div>
                }
                allowMultiple={false}
                mode={selectModes.changeThumbnail}
              />
            </li>
            <li>
              <SelectTrigger
                renderTrigger={
                  <div className={menuOptionClassname}>
                    <img
                      src="/assets/icons/image-white.svg"
                      alt="add photos"
                      className="w-4"
                    />
                    <span>Change Banner</span>
                  </div>
                }
                allowMultiple={false}
                mode={selectModes.changeBanner}
              />
            </li>
            <li>
              <button
                className={menuOptionClassname}
                onClick={() => setIsDeletingAlbum(true)}>
                <img
                  src="/assets/icons/trash.svg"
                  alt="add photos"
                  className="w-4"
                />
                Delete Album
              </button>
            </li>
          </menu>
        )}

        <div className="flex items-center gap-2 text-xs ">
          <SelectControls selectModes={selectModes} />
          {!isSelecting && (
            <button
              onClick={() => setShowMenu(true)}
              className="min-w-[20px] w-[20px] bottom-0 right-2 opacity-70 hover:opacity-90 transition">
              <img src="/assets/icons/settings-white.svg" alt="settings" />
            </button>
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

export default AlbumSettings;
