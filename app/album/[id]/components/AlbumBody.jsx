"use client";
import SelectableItem from "@app/common/Select/SelectableItem";
import PhotoCard from "@app/common/Cards/Photo/PhotoCard";
import { useState, useEffect } from "react";
import DraggableAndDroppable from "@app/common/DragAndDrop/DraggableAndDroppable";
import updateAlbum from "@actions/updateAlbum";
function AlbumBody({ photos, minimalisticView }) {
  const [sortedPhotos, setSortedPhotos] = useState(photos);
  const [shouldUpdateSortOrder, setShouldUpdateSortOrder] = useState(false);
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

    setSortedPhotos([...sortedPhotos]);
    setShouldUpdateSortOrder(true);
  }

  function handleDrag(e, pid) {
    e.dataTransfer.setData("pid", pid);
  }

  useEffect(() => {
    async function updateSortOrder() {
      const aid = sortedPhotos[0]?.aid;
      const sortedPids = sortedPhotos.map((photo) => photo.pid);
      const res = await updateAlbum({ aid, photoOrder: sortedPids }, false);
    }
    if (shouldUpdateSortOrder) {
      updateSortOrder();
      setShouldUpdateSortOrder(false);
    }
  }, [shouldUpdateSortOrder]);

  useEffect(() => {
    setSortedPhotos(photos);
  }, [photos]);

  return (
    <div className="photo-grid">
      {sortedPhotos.map((photo) => (
        <DraggableAndDroppable
          handleDrop={(e) => handleDrop(e, photo.pid)}
          handleDrag={(e) => handleDrag(e, photo.pid)}
          key={photo.pid}>
          <SelectableItem
            item={photo.pid}
            items={photos}
            setSortedItems={setSortedPhotos}>
            <PhotoCard photo={photo} minimalisticView={minimalisticView} />
          </SelectableItem>
        </DraggableAndDroppable>
      ))}
    </div>
  );
}

export default AlbumBody;
