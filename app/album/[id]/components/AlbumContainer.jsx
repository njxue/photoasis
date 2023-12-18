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
import AlbumHeader from "./AlbumHeader";
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

      <AlbumHeader minimalisticView={minimalisticView} albumData={albumData} />

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
