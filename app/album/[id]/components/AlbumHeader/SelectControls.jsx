"use client";
import deletePhotos from "@actions/deletePhotos";
import { useSelect } from "@app/common/Select/SelectContext";
import DeleteSelectedControls from "@app/common/Select/DeleteSelectedControls";
import { toast } from "react-toastify";
import SelectTrigger from "@app/common/Select/SelectTrigger";
import ChangeThumbnailSelectControls from "./ChangeThumbnailSelectControls";

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

  return (
    <>
      {!isSelecting && <SelectTrigger />}
      {mode === selectModes.thumbnail ? (
        <ChangeThumbnailSelectControls albumData={albumData}/>
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
