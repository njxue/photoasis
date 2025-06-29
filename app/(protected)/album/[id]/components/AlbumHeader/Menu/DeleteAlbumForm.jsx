"use client";

import deleteAlbum from "@actions/deleteAlbum";
import { useAlbum } from "../../../AlbumContext";
import ConfirmationModal from "@app/(protected)/components/Modal/ConfirmationModal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteAlbumForm = ({ isDeletingAlbum, setIsDeletingAlbum }) => {
  const album = useAlbum();
  const { aid, name } = album;
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
