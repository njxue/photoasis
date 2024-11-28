"use client";

import deleteAlbums from "@actions/deleteAlbums";
import { useSelect } from "@app/common/Select/SelectContext";
import { toast } from "react-toastify";
import DeleteSelectedControls from "@app/common/Select/DeleteSelectedControls";
import SelectTrigger from "@app/common/Select/SelectTrigger";
function AlbumSelect() {
  const { selectedItems, numSelected } = useSelect();

  async function handleDeleteAlbums() {
    const res = await deleteAlbums(selectedItems);
    if (res.ok) {
      toast.success("Album(s) deleted successfully");
    } else {
      toast.error("Unable to delete selected album(s). Please try again later");
    }
  }

  return (
    <>
      <SelectTrigger />
      <DeleteSelectedControls
        handleDelete={handleDeleteAlbums}
        prompt={`Are you sure you want to delete ${numSelected} album(s)?`}
      />
    </>
  );
}

export default AlbumSelect;
