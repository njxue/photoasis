"use client";
import deletePhotos from "@actions/deletePhotos";
import { useSelect } from "@app/(protected)/components/Select/SelectContext";
import { toast } from "react-toastify";
import SelectTrigger from "@app/(protected)/components/Select/SelectTrigger";
import updateAlbum from "@actions/updateAlbum";
import { useState } from "react";
import CancelSelectButton from "@app/(protected)/components/Select/CancelSelectButton";
import ConfirmationModal from "@app/(protected)/components/Modal/ConfirmationModal";
import { useAlbum } from "../../AlbumContext";
import OptimisedImage from "@app/common/Image/OptimisedImage";

function SelectControls({ selectModes }) {
  const { selectedItems, numSelected, mode, endSelect, isSelecting } =
    useSelect();
  const album = useAlbum();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const btnClassName =
    "btn text-white font-bold border-2 border-neutral-700 hover:border-neutral-500 hover:opacity-100";

  async function handleDeletePhotos() {
    setIsLoading(true);
    const res = await deletePhotos({
      aid: album.aid,
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
      a.download = `${album.name}.zip`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.update(toastId, {
        render: `Download started for ${selectedItems.length} photo(s)`,
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleChangeThumbail() {
    if (selectedItems.length === 0) {
      return;
    }

    const selectedPhotoPid = selectedItems[0]?.pid;
    const toastId = toast.loading("Updating thumbnail");

    try {
      setIsLoading(true);
      const res = await updateAlbum({
        aid: album.aid,
        thumbnailPid: selectedPhotoPid,
      });

      const photoUrl = album.photos.find(
        (photo) => photo.pid === selectedPhotoPid
      )?.url;

      if (res.ok) {
        const updateToast = () => {
          toast.dismiss(toastId);

          // New toast instead of update + delay for smoother effect
          setTimeout(() => {
            toast.success(
              <div>
                <div className="flex justify-center w-full">
                  <div className="w-32 h-32 xs:w-60 xs:h-60">
                    <OptimisedImage src={photoUrl} showLoader />
                  </div>
                </div>
                <p className="mt-2">Thumbnail updated 😎</p>
              </div>,
              { icon: false }
            );
          }, 300);

          endSelect();
          setIsLoading(false);
        };

        // Add artificial delay for smoother transition
        setTimeout(updateToast, 500);
      } else {
        toast.error("Unable to updated thumbnail. Please try again later");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to updated thumbnail. Please try again later");
      toast.dismiss(toastId);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isSelecting)
    return (
      <SelectTrigger
        renderTrigger={
          <img
            src="/assets/icons/select-white.svg"
            alt="select"
            width={24}
            className="cursor-pointer opacity-70 hover:opacity-90 transition"
          />
        }
      />
    );

  return (
    <div className="flex flex-row justify-center items-center gap-1 animate-slideLeft">
      {mode === selectModes.changeThumbnail ? (
        <>
          <button
            disabled={!numSelected || isLoading}
            className="btn-gray font-bold"
            onClick={handleChangeThumbail}>
            Set as thumbnail
          </button>
          <CancelSelectButton />
        </>
      ) : (
        <>
          <button
            disabled={!numSelected || isLoading}
            className={`${btnClassName} bg-black`}
            onClick={async () => {
              await handleDownloadPhotosAsZip();
              endSelect();
            }}>
            <img src="/assets/icons/download.svg" width={20} alt="download" />
            <span>Download ({numSelected})</span>
          </button>
          <button
            disabled={!numSelected || isLoading}
            className={`${btnClassName} bg-red-900 hover:border-red-700`}
            onClick={() => setIsModalOpen(true)}>
            <img src="/assets/icons/trash.svg" width={20} alt="trash" />
            <span>Delete ({numSelected})</span>
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
        </>
      )}
    </div>
  );
}

export default SelectControls;
