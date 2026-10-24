"use client";

import deleteAlbums from "@actions/deleteAlbums";
import { useSelect } from "@app/(protected)/components/Select/SelectContext";
import { toast } from "react-toastify";
import SelectTrigger from "@app/(protected)/components/Select/SelectTrigger";
import CancelSelectButton from "@app/(protected)/components/Select/CancelSelectButton";
import ConfirmationModal from "@app/(protected)/components/Modal/ConfirmationModal";
import { useState } from "react";
import archiveAlbums from "@actions/archiveAlbums";

function AlbumSelect() {
  const { selectedItems, numSelected, isSelecting, endSelect } = useSelect();
  const [confirmationAction, setConfirmationAction] = useState(null);

  async function handleDeleteAlbums() {
    const res = await deleteAlbums(selectedItems);
    if (res.ok) {
      toast.success("Album(s) deleted successfully");
    } else {
      toast.error("Unable to delete selected album(s). Please try again later");
    }
  }
  async function handleArchiveAlbums() {
    const res = await archiveAlbums(selectedItems);
    if (res.ok) {
      toast.success("Album(s) archived successfully");
    } else {
      toast.error(
        "Unable to archive selected album(s). Please try again later",
      );
    }
  }

  async function handleConfirmation() {
    switch (confirmationAction) {
      case ACTION_ARCHIVE:
        return handleArchiveAlbums();
      case ACTION_DELETE:
        return handleDeleteAlbums();
      default:
        return;
    }
  }

  return !isSelecting ? (
    <div className="flex min-w-0 flex-1 items-center justify-center sm:flex-none">
      <SelectTrigger />
    </div>
  ) : (
    <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-row sm:items-center">
      <button
        type="button"
        disabled={!numSelected}
        className="btn-white min-w-0 whitespace-nowrap font-bold sm:min-w-fit"
        onClick={() => {
          setConfirmationAction(ACTION_ARCHIVE);
        }}>
        <img src="/assets/icons/box.svg" width={20} alt="" />
        Archive <span>({numSelected})</span>
      </button>

      <button
        type="button"
        disabled={!numSelected}
        className="btn-red min-w-0 whitespace-nowrap font-bold sm:min-w-fit"
        onClick={() => {
          setConfirmationAction(ACTION_DELETE);
        }}>
        <img src="/assets/icons/trash.svg" width={20} alt="trash" />
        Delete <span>({numSelected})</span>
      </button>

      <CancelSelectButton className="col-span-2 w-full whitespace-nowrap sm:w-auto" />

      <ConfirmationModal
        isOpen={confirmationAction !== null}
        onClose={() => setConfirmationAction(null)}
        onConfirm={async () => {
          await handleConfirmation();
          endSelect();
        }}
        prompt={getConfirmActionText(numSelected, confirmationAction)}
      />
    </div>
  );
}

const ACTION_ARCHIVE = "archive";
const ACTION_DELETE = "delete";

const getConfirmActionText = (numSelected, action) => {
  return `Are you sure you want to ${action} ${numSelected} album(s)?`;
};

export default AlbumSelect;
