"use client";

import deleteAlbum from "@actions/deleteAlbum";
import ConfirmationModal from "@app/common/ConfirmationModal";
const DeleteAlbumForm = ({
  albumData,
  isDeletingAlbum,
  setIsDeletingAlbum,
}) => {
  const { aid } = albumData;

  async function handleDeleteAlbum() {
    await deleteAlbum(aid);
  }

  return (
    <ConfirmationModal
      prompt="Are you sure you want to delete this album?"
      isOpen={isDeletingAlbum}
      setIsOpen={setIsDeletingAlbum}
      onConfirm={handleDeleteAlbum}
    />
  );
};

export default DeleteAlbumForm;
