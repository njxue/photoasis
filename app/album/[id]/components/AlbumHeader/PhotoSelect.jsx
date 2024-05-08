"use client";
import deletePhotos from "@actions/deletePhotos";
import { useSelectContext } from "@app/common/Select/SelectContext";
import SelectControls from "@app/common/Select/SelectControls";
function AlbumSelect({ albumData }) {
  const { selectedItems, numSelected } = useSelectContext();

  async function handleDeletePhotos() {
    const res = await deletePhotos({
      aid: albumData.aid,
      pids: selectedItems,
    });
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
