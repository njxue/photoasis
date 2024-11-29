"use client";
import deletePhotos from "@actions/deletePhotos";
import { useSelect } from "@app/common/Select/SelectContext";
import DeleteSelectedControls from "@app/common/Select/DeleteSelectedControls";
import { toast } from "react-toastify";
import SelectTrigger from "@app/common/Select/SelectTrigger";
import ChangeThumbnailSelectControls from "./ChangeThumbnailSelectControls";
import updateAlbum from "@actions/updateAlbum";
import OptimisedImage from "@app/common/Image/OptimisedImage";

function SelectControls({ albumData, selectModes }) {
  const { selectedItems, numSelected, mode, endSelect, isSelecting } =
    useSelect();

  async function handleDeletePhotos() {
    const res = await deletePhotos({
      aid: albumData.aid,
      pids: selectedItems,
    });
    if (res.ok) {
      toast.success("Photo(s) deleted successfully");
      endSelect();
    } else {
      toast.error("Unable to delete selected photo(s). Please try again later");
    }
  }

  async function handleChangeThumbail() {
    if (selectedItems.length === 0) {
      return;
    }

    const selectedPhotoPid = selectedItems[0];

    const res = await updateAlbum({
      aid: albumData.aid,
      thumbnailPid: selectedPhotoPid,
    });

    const photoUrl = albumData.photos.find(
      (photo) => photo.pid === selectedPhotoPid
    )?.url;

    if (res.ok) {
      toast.success(
        <div>
          <div className="flex justify-center w-full">
            <div className="w-32 xs:w-60">
              <OptimisedImage src={photoUrl} />
            </div>
          </div>
          <p className="mt-2">Thumbnail updated 😎</p>
        </div>,
        { icon: false, closeButton: false }
      );
      endSelect();
    } else {
      toast.error("Unable to updated thumbnail. Please try again later");
    }
  }

  return (
    <>
      {!isSelecting && <SelectTrigger />}
      {mode === selectModes.thumbnail ? (
        <ChangeThumbnailSelectControls
          handleChangeThumbail={handleChangeThumbail}
        />
      ) : (
        <DeleteSelectedControls
          handleDelete={handleDeletePhotos}
          prompt={`Are you sure you want to delete ${numSelected} photo(s)?`}
        />
      )}
    </>
  );
}

export default SelectControls;
