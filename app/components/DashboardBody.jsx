"use client";
import { useEffect, useState } from "react";
import SelectableItem from "@app/common/Select/SelectableItem";
import AlbumCard from "@app/common/Cards/Album/AlbumCard";
import DraggableAndDroppable from "@app/common/DragAndDrop/DraggableAndDroppable";
import updateUser from "@actions/updateUser";
function DashboardBody({ albums }) {
  const [sortedAlbums, setSortedAlbums] = useState(albums);
  const [shouldUpdateSortOrder, setShouldUpdateSortOrder] = useState(false);
  function handleDrop(e, aidFrom) {
    const aidTo = e.dataTransfer.getData("aid");

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

    const tmp = sortedAlbums[fromIndex];
    sortedAlbums[fromIndex] = sortedAlbums[toIndex];
    sortedAlbums[toIndex] = tmp;

    setSortedAlbums([...sortedAlbums]);
    setShouldUpdateSortOrder(true);
  }

  function handleDrag(e, aid) {
    e.dataTransfer.setData("aid", aid);
  }

  useEffect(() => {
    async function updateSortOrder() {
      const aid = sortedAlbums[0]?.aid;
      const sortedAids = sortedAlbums.map((album) => album.aid);
      const res = await updateUser({ aid, albumOrder: sortedAids }, false);
    }
    if (shouldUpdateSortOrder) {
      updateSortOrder();
      setShouldUpdateSortOrder(false);
    }
  }, [shouldUpdateSortOrder]);

  useEffect(() => {
    setSortedAlbums(albums);
  }, [albums]);

  return (
    <div className="photo-grid">
      {sortedAlbums?.map((album) => (
        <DraggableAndDroppable
          handleDrop={(e) => handleDrop(e, album.aid)}
          handleDrag={(e) => handleDrag(e, album.aid)}
          key={album.aid}>
          <SelectableItem item={album.aid}>
            <AlbumCard data={album} />
          </SelectableItem>
        </DraggableAndDroppable>
      ))}
    </div>
  );
}

export default DashboardBody;
