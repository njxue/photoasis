"use client";
import deletePhotos from "@actions/deletePhotos";
import { useSelectContext } from "@app/common/Select/SelectContext";
import SelectControls from "@app/common/Select/SelectControls";
import { toast } from "react-toastify";

function AlbumSelect({ albumData }) {
  const { selectedItems, numSelected } = useSelectContext();

  async function handleDeletePhotos() {
    const res = await deletePhotos({
      aid: albumData.aid,
      pids: selectedItems,
    });
    if (res.ok) {
      toast.success("Photo(s) deleted successfully");
    } else {
      toast.error("Unable to delete selected photo(s). Please try again later");
    }
  }

  return (
    <SelectControls
      text="Delete"
      onConfirm={handleDeletePhotos}
      prompt={`Are you sure you want to delete ${numSelected} photo(s)?`}
    />
  );
}

export default AlbumSelect;
