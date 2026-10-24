"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import unarchiveAlbums from "@actions/unarchiveAlbums";
import CancelSelectButton from "@app/(protected)/components/Select/CancelSelectButton";
import SelectTrigger from "@app/(protected)/components/Select/SelectTrigger";
import { useSelect } from "@app/(protected)/components/Select/SelectContext";

const ArchiveSelect = () => {
  const { selectedItems, numSelected, isSelecting, endSelect } = useSelect();
  const [isUnarchiving, setIsUnarchiving] = useState(false);

  async function handleUnarchiveAlbums() {
    setIsUnarchiving(true);
    const res = await unarchiveAlbums(selectedItems);
    setIsUnarchiving(false);

    if (!res.ok) {
      toast.error(
        res.message ||
          "Unable to unarchive selected album(s). Please try again later",
      );
      return;
    }

    toast.success("Album(s) unarchived successfully");
    endSelect();
  }

  return !isSelecting ? (
    <div className="w-full sm:w-auto">
      <SelectTrigger />
    </div>
  ) : (
    <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center">
      <button
        type="button"
        disabled={!numSelected || isUnarchiving}
        className="btn-white min-w-0 whitespace-nowrap font-bold sm:min-w-fit"
        onClick={handleUnarchiveAlbums}>
        <img src="/assets/icons/box.svg" width={20} alt="" />
        Unarchive <span>({numSelected})</span>
      </button>
      <CancelSelectButton
        disabled={isUnarchiving}
        className="w-full whitespace-nowrap sm:w-auto"
      />
    </div>
  );
};

export default ArchiveSelect;
