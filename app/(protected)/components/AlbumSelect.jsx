"use client";

import deleteAlbums from "@actions/deleteAlbums";
import { useSelect } from "@app/(protected)/components/Select/SelectContext";
import { toast } from "react-toastify";
import SelectTrigger from "@app/(protected)/components/Select/SelectTrigger";
import CancelSelectButton from "@app/(protected)/components/Select/CancelSelectButton";
import ConfirmationModal from "@app/(protected)/components/Modal/ConfirmationModal";
import { useState } from "react";
function AlbumSelect() {
  const { selectedItems, numSelected, isSelecting, endSelect } = useSelect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleDeleteAlbums() {
    const res = await deleteAlbums(selectedItems);
    if (res.ok) {
      toast.success("Album(s) deleted successfully");
    } else {
      toast.error("Unable to delete selected album(s). Please try again later");
    }
  }

  return !isSelecting ? (
    <div className="flex items-center justify-center">
      <SelectTrigger />
    </div>
  ) : (
    <div className="flex flex-row justify-center items-center gap-1">
      <button
        disabled={!numSelected}
        className="btn-red font-bold"
        onClick={() => setIsModalOpen(true)}>
        <img src="/assets/icons/trash.svg" width={20} alt="trash" />
        Delete <span>({numSelected})</span>
      </button>
      <CancelSelectButton />
      <ConfirmationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onConfirm={async () => {
          await handleDeleteAlbums();
          endSelect();
        }}
        prompt={`Are you sure you want to delete ${numSelected} album(s)?`}
      />
    </div>
  );
}

export default AlbumSelect;
