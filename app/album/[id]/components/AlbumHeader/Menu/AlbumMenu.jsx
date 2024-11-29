"use client";

import { useState, useEffect, useRef } from "react";
import DeleteAlbumForm from "./DeleteAlbumForm";
import AddPhotosForm from "./AddPhotosForm";
import ImageUploadProvider from "@app/common/ImageUpload/ImageUploadContext";
import SelectTrigger from "@app/common/Select/SelectTrigger";
const AlbumMenu = ({ setIsEditing, albumData, onClickChangeThumbnail }) => {
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [isDeletingAlbum, setIsDeletingAlbum] = useState(false);
  const [isAddingPhotos, setIsAddingPhotos] = useState(false);

  const menuRef = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setShowMenuItems(false);
      }
    };
    if (showMenuItems) {
      document.addEventListener("click", handleClick);
    }
    return () => document.removeEventListener("click", handleClick);
  }, [showMenuItems]);

  return (
    <>
      <div className="relative">
        <img
          src="/assets/icons/vertical-dots.svg"
          alt="settings"
          className="min-w-[30px] w-[30px] cursor-pointer"
          onClick={() => {
            setShowMenuItems((prev) => !prev);
          }}
        />
        {showMenuItems && (
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
                    setShowMenuItems(false);
                  }}>
                  Change Thumbnail
                </div>
              }
            />
          </div>
        )}
      </div>
      <DeleteAlbumForm
        albumData={albumData}
        isDeletingAlbum={isDeletingAlbum}
        setIsDeletingAlbum={setIsDeletingAlbum}
      />
      <ImageUploadProvider>
        <AddPhotosForm
          albumData={albumData}
          show={isAddingPhotos}
          setShow={setIsAddingPhotos}
        />
      </ImageUploadProvider>
    </>
  );
};

export default AlbumMenu;
