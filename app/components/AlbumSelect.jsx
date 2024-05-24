"use client";

import deleteAlbums from "@actions/deleteAlbums";
import { useSelectContext } from "@app/common/Select/SelectContext";
import { toast } from "react-toastify";
import SelectControls from "@app/common/Select/SelectControls";
function AlbumSelect() {
  const { selectedItems, numSelected } = useSelectContext();

  async function handleDeleteAlbums() {
    const res = await deleteAlbums(selectedItems);
    if (res.ok) {
      toast.success("Album(s) deleted successfully");
    } else {
      toast.error("Unable to delete selected album(s). Please try again later");
    }
  }

  return (
    <SelectControls
      text="Delete"
      onConfirm={handleDeleteAlbums}
      prompt={`Are you sure you want to delete ${numSelected} album(s)?`}
    />
  );
}

export default AlbumSelect;
