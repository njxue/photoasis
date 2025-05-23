"use client";
import SelectableItem from "@app/common/Select/SelectableItem";
import PhotoCard from "@app/common/Cards/Photo/PhotoCard";
import { useState } from "react";
import DraggableAndDroppable from "@app/common/DragAndDrop/DraggableAndDroppable";
import updateAlbum from "@actions/updateAlbum";
import { toast } from "react-toastify";
import { useAlbum } from "../AlbumContext";
import PhotoCarousel from "@app/common/Cards/Photo/PhotoCarousel";
function AlbumBody({ minimalisticView }) {
  const album = useAlbum();

  const [currentExpanded, setCurrentExpanded] = useState(null);
  const [sortedPhotos, setSortedPhotos] = useState(album?.photos);

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
    const res = await updateAlbum({ aid: album.aid, photoOrder: sortedPids });
    if (!res.ok) {
      toast.error(res.message, {
        toastId: "Error: Update photos sort order",
      });
    }
  }

  return (
    <div className="photo-grid">
      {sortedPhotos.map((photo, idx) => (
        <DraggableAndDroppable
          handleDrop={(e) => handleDrop(e, photo.pid)}
          handleDrag={(e) => handleDrag(e, photo.pid)}
          key={photo.pid}>
          <SelectableItem
            item={photo}
            comparator={(i1, i2) => i1.pid === i2.pid}>
            <PhotoCard
              photo={photo}
              minimalisticView={minimalisticView}
              onClick={() => setCurrentExpanded(idx)}
            />
          </SelectableItem>
        </DraggableAndDroppable>
      ))}
      {currentExpanded != null && (
        <PhotoCarousel
          photos={album.photos}
          defaultIndex={currentExpanded}
          onClose={() => setCurrentExpanded(null)}
        />
      )}
    </div>
  );
}

export default AlbumBody;
