"use client";
import deletePhotos from "@actions/deletePhotos";
import { useSelect } from "@app/common/Select/SelectContext";
import { toast } from "react-toastify";
import SelectTrigger from "@app/common/Select/SelectTrigger";
import ChangeThumbnailSelectControls from "./ChangeThumbnailSelectControls";
import { b2GetDownloadUrl } from "@actions/b2";
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

  async function handleDownloadPhotos() {
    setIsLoading(true);
    const toastId = toast.loading(
      `Preparing to download ${selectedItems.length} photos`
    );
    try {
      const res = await Promise.allSettled(
        selectedItems.map(async (item) => {
          const downloadUrl = await b2GetDownloadUrl(
            item.uid,
            item.aid,
            item.name
          );
          return { url: downloadUrl, name: item.name };
        })
      );

      // Some browsers may prevent spammy pop-ups, so add a delay between downloads
      res.forEach((item, i) => {
        setTimeout(() => {
          window.open(item.value.url, "_self");
        }, i * 2000);
      });

      const fulfilledFileNames = new Set(
        res.filter((r) => r.status === "fulfilled").map((r) => r.value.name)
      );
      const numFulfilled = fulfilledFileNames.size;
      const numRejected = res.length - numFulfilled;

      if (numFulfilled === res.length) {
        toast.update(toastId, {
          render: `Download started for ${selectedItems.length} photo(s)`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
          isLoading: false,
        });
      } else {
        const rejectedFileNames = selectedItems
          .filter((item) => !fulfilledFileNames.has(item.name))
          .map((item) => item.name);

        toast.update(toastId, {
          render: `Download started for ${numFulfilled} photo(s). Unable to download ${numRejected} photo(s): ${rejectedFileNames.join(
            ", "
          )}`,
          type: toast.TYPE.WARNING,
          autoClose: 3000,
          isLoading: false,
        });
      }
    } catch (err) {
      toast.update(toastId, {
        render: `Failed to download photos`,
        type: toast.TYPE.ERROR,
        autoClose: 3000,
        isLoading: false,
      });
    } finally {
      setIsLoading(false);
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
          await handleDownloadPhotos();
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
