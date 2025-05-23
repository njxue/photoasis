"use client";

import { useState, useRef } from "react";
import DeleteAlbumForm from "./DeleteAlbumForm";
import AddPhotosForm from "./AddPhotosForm";
import ImageUploadProvider from "@app/common/ImageUpload/ImageUploadContext";
import SelectTrigger from "@app/common/Select/SelectTrigger";
import useClickOutside from "@app/common/hooks/useClickOutside";
import { useAlbum } from "@app/album/[id]/AlbumContext";
const AlbumMenu = ({ setIsEditing, onClickChangeThumbnail }) => {
  const [isDeletingAlbum, setIsDeletingAlbum] = useState(false);
  const [isAddingPhotos, setIsAddingPhotos] = useState(false);

  const menuRef = useRef();
  const { isVisible: showMenu, setIsVisible: setShowMenu } =
    useClickOutside(menuRef);
  return (
    <>
      <div className="relative">
        <img
          src="/assets/icons/vertical-dots.svg"
          alt="settings"
          className="min-w-[30px] w-[30px] cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
        {showMenu && (
          <div
            className="flex flex-col absolute z-50 bg-white w-[200px] right-0 rounded border border-solid border-gray-200 mt-2"
            ref={menuRef}>
            <div
              className="cursor-pointer hover:bg-gray-500 hover:text-white p-2"
              onClick={() => setIsAddingPhotos(true)}>
              Add Photos
            </div>
            <hr />
            <div
              className="cursor-pointer hover:bg-gray-500 hover:text-white p-2"
              onClick={() => setIsEditing(true)}>
              Edit
            </div>
            <hr />
            <div
              className="cursor-pointer hover:bg-gray-500 hover:text-white p-2"
              onClick={() => setIsDeletingAlbum(true)}>
              Delete
            </div>
            <SelectTrigger
              renderTrigger={
                <div
                  className="cursor-pointer hover:bg-gray-500 hover:text-white p-2"
                  onClick={() => {
                    onClickChangeThumbnail();
                    setShowMenu(false);
                  }}>
                  Change Thumbnail
                </div>
              }
            />
          </div>
        )}
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
