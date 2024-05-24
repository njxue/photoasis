"use client";

import deleteAlbum from "@actions/deleteAlbum";
import ConfirmationModal from "@app/common/ConfirmationModal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteAlbumForm = ({
  albumData,
  isDeletingAlbum,
  setIsDeletingAlbum,
}) => {
  const { aid, name } = albumData;
  const router = useRouter();

  async function handleDeleteAlbum() {
    const res = await deleteAlbum(aid);
    if (res.ok) {
      router.push("/");
      toast.success(`Album "${name}" deleted`);
    } else {
      toast.error("Unable to delete album. Plase try again later");
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
