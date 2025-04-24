"use client";
import SelectableItem from "@app/common/Select/SelectableItem";
import PhotoCard from "@app/common/Cards/Photo/PhotoCard";
import { useState } from "react";
import DraggableAndDroppable from "@app/common/DragAndDrop/DraggableAndDroppable";
import updateAlbum from "@actions/updateAlbum";
import { toast } from "react-toastify";
function AlbumBody({ photos, minimalisticView }) {
  const [sortedPhotos, setSortedPhotos] = useState(photos);
  const aid = photos && photos[0]?.aid;
  function handleDrop(e, pidFrom) {
    const pidTo = e.dataTransfer.getData("pid");
    if (pidTo === pidFrom) {
      return;
    }

    const fromIndex = sortedPhotos.findIndex((i) => i.pid === pidFrom);
    const toIndex = sortedPhotos.findIndex((i) => i.pid === pidTo);

    if (fromIndex < 0 || toIndex < 0) {
      // Error, shouldn't happen
      return;
    }

    const tmp = sortedPhotos[fromIndex];
    sortedPhotos[fromIndex] = sortedPhotos[toIndex];
    sortedPhotos[toIndex] = tmp;

    const newlySortedPhotos = [...sortedPhotos];
    setSortedPhotos(newlySortedPhotos);

    updateSortOrder(newlySortedPhotos);
  }

  function handleDrag(e, pid) {
    e.dataTransfer.setData("pid", pid);
  }

  async function updateSortOrder(sorted) {
    const sortedPids = sorted.map((photo) => photo.pid);
    const res = await updateAlbum({ aid, photoOrder: sortedPids });
    if (!res.ok) {
      toast.error(res.message, {
        toastId: "Error: Update photos sort order",
      });
    }
  }

  return (
    <div className="photo-grid">
      {sortedPhotos.map((photo) => (
        <DraggableAndDroppable
          handleDrop={(e) => handleDrop(e, photo.pid)}
          handleDrag={(e) => handleDrag(e, photo.pid)}
          key={photo.pid}>
          <SelectableItem
            item={photo}
            comparator={(i1, i2) => i1.pid === i2.pid}>
            <PhotoCard photo={photo} minimalisticView={minimalisticView} />
          </SelectableItem>
        </DraggableAndDroppable>
      ))}
    </div>
  );
}

export default AlbumBody;
