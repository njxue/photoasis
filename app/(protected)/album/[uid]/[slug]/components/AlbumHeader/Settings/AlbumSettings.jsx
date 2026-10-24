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
    "flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left text-xs font-semibold hover:bg-black/[0.05]";

  return (
    <>
      <div className="relative z-50 flex flex-col items-end">
        {showMenu && !isSelecting && (
          <menu
            className="album-menu absolute right-0 top-8 z-50 flex w-[210px] flex-col border border-black bg-white p-1 text-sm text-black shadow-[6px_6px_0_rgba(0,0,0,0.15)] animate-slideUp sm:bottom-8 sm:top-auto"
            ref={menuRef}>
            <li>
              <button
                className={menuOptionClassname}
                onClick={() => setIsAddingPhotos(true)}>
                <img
                  src="/assets/icons/plus-white.svg"
                  alt="add photos"
                  className="w-4 invert"
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
                      className="w-4 px-[2px] invert"
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
                      className="w-4 invert"
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
                  alt=""
                  className="w-4 invert"
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
