"use client";

import deleteAlbum from "@actions/deleteAlbum";
import ConfirmationModal from "@app/common/ConfirmationModal";
import { useRouter } from "next/navigation";

const DeleteAlbumForm = ({
  albumData,
  isDeletingAlbum,
  setIsDeletingAlbum,
}) => {
  const { aid } = albumData;
  const router = useRouter();
  
  async function handleDeleteAlbum() {
    const res = await deleteAlbum(aid);
    if (res.status === 204) {
      router.push("/");
    }
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
