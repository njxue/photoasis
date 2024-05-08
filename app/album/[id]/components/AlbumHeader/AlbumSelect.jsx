"use client";
import ConfirmationModal from "@app/common/ConfirmationModal";
import { useState } from "react";
import deletePhotos from "@actions/deletePhotos";
function AlbumSelect({
  beginSelect,
  endSelect,
  isSelecting,
  selectedItems,
  albumData,
}) {
  const [isDeletingPhotos, setIsDeletingPhotos] = useState(false);
  const numSelected = selectedItems.length;

  async function handleDeletePhotos() {
    const res = await deletePhotos({
      aid: albumData.aid,
      pids: selectedItems,
    });
    if (res.status === 204) {
      setIsDeletingPhotos(false);
      endSelect();
    }
  }

  return !isSelecting ? (
    <img
      src="/assets/icons/select.svg"
      width={30}
      className="cursor-pointer"
      onClick={beginSelect}
    />
  ) : (
    <>
      <div className="flex flex-row justify-center items-center gap-1">
        <button
          onClick={() => {
            setIsDeletingPhotos(true);
          }}
          disabled={!numSelected}
          className="btn-red font-bold">
          <img src="/assets/icons/trash.svg" width={20} />
          Delete <span>({numSelected})</span>
        </button>
        <button className="btn-white font-bold" onClick={endSelect}>
          <img src="/assets/icons/cross.svg" width={20} />
          Cancel
        </button>
      </div>
      <ConfirmationModal
        isOpen={isDeletingPhotos}
        setIsOpen={setIsDeletingPhotos}
        prompt={`Are you sure you want to delete ${numSelected} photos?`}
        onConfirm={handleDeletePhotos}
      />
    </>
  );
}

export default AlbumSelect;
