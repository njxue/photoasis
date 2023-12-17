"use client";
import { useEffect, useRef, useState } from "react";
import PhotoCard from "../../../common/PhotoCard";
import AddPhotos from "./AddPhotos";
import updateAlbum from "@actions/updateAlbum";
import deleteAlbum from "@actions/deleteAlbum";
import Modal from "@app/common/Modal/Modal";
import { ModalHeader } from "@app/common/Modal/ModalHeader";
import { ModalBody } from "@app/common/Modal/ModalBody";
import SubmitButton from "@app/common/SubmitButton";
const AlbumContainer = ({ albumData }) => {
  const [minimalisticView, setMinimalisticView] = useState(false);
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const menuRef = useRef();
  const { photos, aid } = albumData;

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

  async function handleUpdateAlbum(formdata) {
    const albumName = formdata.get("albumName");
    await updateAlbum({ aid, albumName });
    setIsEditing(false);
  }

  async function handleDeleteAlbum(formdata) {
    const confirmText = formdata.get("deleteConfirmation");
    if (confirmText === "Delete") {
      const res = await deleteAlbum(aid);
      if (res.status === 204) {
        console.log("Redirecting");
      }
    }
  }

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
        <div>
          <div className="flex flex-row items-center justify-between mb-3 mt-2 font-light">
            <div className="flex flex-row items-center gap-3 max-w-[100%] grow">
              {isEditing ? (
                <form
                  className="flex flex-col items-center grow gap-2 md:flex-row"
                  action={handleUpdateAlbum}>
                  <input
                    type="text"
                    name="albumName"
                    defaultValue={albumData.name}
                    className="px-2 py-1 rounded w-full text-3xl"
                  />
                  <div className="flex flex-row justify-center items-center gap-2">
                    <button type="submit" className="h-full w-1/2">
                      <img
                        src="/assets/icons/tick.svg"
                        className="h-[30px] cursor-pointer"
                      />
                    </button>
                    <button className="h-full w-1/2">
                      <img
                        src="/assets/icons/cross.svg"
                        className="h-[30px] cursor-pointer"
                        onClick={() => {
                          setIsEditing(false);
                        }}
                      />
                    </button>
                  </div>
                </form>
              ) : (
                <p className="line-clamp-1 text-3xl">{albumData.name}</p>
              )}
              {!isEditing && <AddPhotos aid={aid} />}
            </div>
            {!isEditing && (
              <div className="relative">
                <img
                  src="/assets/icons/vertical-dots.svg"
                  className="h-[30px] cursor-pointer"
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
                      onClick={() => setIsEditing(true)}>
                      Edit
                    </div>
                    <hr />
                    <div
                      className="cursor-pointer hover:bg-gray-500 hover:text-white p-2"
                      onClick={() => setIsDeleting(true)}>
                      Delete
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <hr className="mb-3" />
        </div>
      )}

      <Modal isOpen={isDeleting} setOpen={setIsDeleting} size="sm">
        <ModalHeader>Are you sure you want to delete this album?</ModalHeader>
        <ModalBody>
          <form className="w-full" action={handleDeleteAlbum}>
            <label for="deleteConfirmation">Type "Delete" to confirm: </label>
            <input
              className="w-full border border-solid border-gray-600 rounded p-1"
              type="text"
              name="deleteConfirmation"
            />
            <div className="flex flex-row gap-1 w-full mt-1">
              <SubmitButton text="Yes" />

              <button
                onClick={() => {
                  setIsDeleting(false);
                }}
                className="bg-red-700 rounded p-2 text-white w-full">
                No
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>

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
