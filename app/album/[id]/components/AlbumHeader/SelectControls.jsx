"use client";
import deletePhotos from "@actions/deletePhotos";
import { useSelect } from "@app/common/Select/SelectContext";
import { toast } from "react-toastify";
import SelectTrigger from "@app/common/Select/SelectTrigger";
import ChangeThumbnailSelectControls from "./ChangeThumbnailSelectControls";
import { useState } from "react";
import CancelSelectButton from "@app/common/Select/CancelSelectButton";
import ConfirmationModal from "@app/common/ConfirmationModal";

function SelectControls({ albumData, selectModes }) {
  const { selectedItems, numSelected, mode, endSelect, isSelecting } =
    useSelect();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeletePhotos() {
    setIsLoading(true);
    const res = await deletePhotos({
      aid: albumData.aid,
      pids: selectedItems.map((i) => i.pid),
    });
    if (res.ok) {
      toast.success("Photo(s) deleted successfully");
      endSelect();
    } else {
      toast.error("Unable to delete selected photo(s). Please try again later");
    }
    setIsLoading(false);
  }
  console.log(selectedItems);
  async function handleDownloadPhotosAsZip() {
    setIsLoading(true);
    const toastId = toast.loading(
      `Preparing to download ${selectedItems.length} photos. Please remain on the page until the download starts`
    );
    const fileIdsAndNames = selectedItems.map((file) => ({
      id: file.pid,
      name: file.name,
    }));

    try {
      const res = await fetch("/api/download-zip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileIdsAndNames }),
      });

      if (res.status !== 200) {
        return toast.update(toastId, {
          render: "Download failed",
          type: toast.TYPE.ERROR,
          autoClose: 3000,
          isLoading: false,
        });
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${albumData.name}.zip`;
      a.click();
      window.URL.revokeObjectURL(url);

      setIsLoading(false);
      toast.update(toastId, {
        render: `Download started for ${selectedItems.length} photo(s)`,
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  if (!isSelecting) return <SelectTrigger />;

  if (mode === selectModes.thumbnail) {
    return <ChangeThumbnailSelectControls albumData={albumData} />;
  }

  return (
    <div className="flex flex-row justify-center items-center gap-1">
      <button
        disabled={!numSelected || isLoading}
        className="btn-gray font-bold "
        onClick={async () => {
          await handleDownloadPhotosAsZip();
          endSelect();
        }}>
        <img src="/assets/icons/download.svg" width={20} alt="download" />
        <span className="max-xs:hidden">Download</span>
        <span className="text-sm">({numSelected})</span>
      </button>
      <button
        disabled={!numSelected || isLoading}
        className="btn-red font-bold"
        onClick={() => setIsModalOpen(true)}>
        <img src="/assets/icons/trash.svg" width={20} alt="trash" />
        <span className="max-xs:hidden">Delete</span>
        <span className="text-sm">({numSelected})</span>
      </button>
      <CancelSelectButton disabled={isLoading} />
      <ConfirmationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onConfirm={async () => {
          await handleDeletePhotos();
          endSelect();
        }}
        prompt={`Are you sure you want to delete ${numSelected} photo(s)?`}
      />
    </div>
  );
}

export default SelectControls;
