"use client";
import { useState } from "react";
import SelectableItem from "@app/(protected)/components/Select/SelectableItem";
import AlbumCard from "@app/(protected)/components/Cards/Album/AlbumCard";
import DraggableAndDroppable from "@app/(protected)/components/DragAndDrop/DraggableAndDroppable";
import updateUser from "@actions/updateUser";
import { toast } from "react-toastify";
import { NUM_IMAGES_ABOVE_FOLD } from "@app/configs/imageConfigs";
function DashboardBody({ albums }) {
  const [sortedAlbums, setSortedAlbums] = useState(albums);

  function handleDrop(e, aidTo) {
    const aidFrom = e.dataTransfer.getData("aid");
    const isDroppedAtLeftHalf =
      e.nativeEvent.offsetX < e.target.offsetWidth / 2;

    console.log(isDroppedAtLeftHalf);

    const fromIndex = sortedAlbums.findIndex(
      (a) => a.aid.toString() === aidFrom.toString()
    );
    const toIndex = sortedAlbums.findIndex(
      (a) => a.aid.toString() === aidTo.toString()
    );

    if (fromIndex < 0 || toIndex < 0) {
      // Error, shouldn't happen
      return;
    }

    const newlySortedAlbums = [...sortedAlbums];

    // Delete the dragged album
    newlySortedAlbums.splice(fromIndex, 1);

    // Calculate new toIndex because we deleted the dragged photo
    const newToIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;

    if (isDroppedAtLeftHalf) {
      // Drop before photo at dropzone
      newlySortedAlbums.splice(newToIndex, 0, sortedAlbums[fromIndex]);
    } else {
      // Drop after photo at dropzone
      newlySortedAlbums.splice(newToIndex + 1, 0, sortedAlbums[fromIndex]);
    }

    setSortedAlbums(newlySortedAlbums);
    updateSortOrder(newlySortedAlbums);
  }

  function handleDrag(e, aid) {
    e.dataTransfer.setData("aid", aid);
  }

  async function updateSortOrder(sorted) {
    const sortedAids = sorted.map((album) => album.aid);
    const res = await updateUser({ albumOrder: sortedAids });
    if (!res.ok) {
      toast.error("Unable to update albums sort order", {
        toastId: "Error: Update albums sort order",
      });
    }
  }
  return (
    <div className="photo-grid">
      {sortedAlbums?.map((album, idx) => (
        <DraggableAndDroppable
          handleDrop={(e) => handleDrop(e, album.aid)}
          handleDrag={(e) => handleDrag(e, album.aid)}
          key={album.aid}>
          <SelectableItem item={album.aid} itemId={album.aid}>
            <AlbumCard data={album} lazy={idx >= NUM_IMAGES_ABOVE_FOLD} />
          </SelectableItem>
        </DraggableAndDroppable>
      ))}
    </div>
  );
}

export default DashboardBody;
