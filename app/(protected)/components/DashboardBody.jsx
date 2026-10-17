"use client";
import { useEffect, useState } from "react";
import SelectableItem from "@app/(protected)/components/Select/SelectableItem";
import AlbumCard from "@app/(protected)/components/Cards/Album/AlbumCard";
import DraggableAndDroppable from "@app/(protected)/components/DragAndDrop/DraggableAndDroppable";
import updateUser from "@actions/updateUser";
import { toast } from "react-toastify";
import InfiniteList from "./InfiniteLIst/InfiniteList";
import { useSelect } from "./Select/SelectContext";

const EAGER_LOAD_COUNT = 20;
function DashboardBody({ albums, searchTerm = "" }) {
  const [sortedAlbums, setSortedAlbums] = useState(albums);
  const { isSelecting } = useSelect();

  const filteredAndSortedAlbums = sortedAlbums.filter((album) =>
    album.name.toUpperCase().trim().includes(searchTerm.toUpperCase().trim()),
  );

  const [draggedAid, setDraggedAid] = useState();
  function handleDragEnter(aidTo) {
    const aidFrom = draggedAid;
    if (aidFrom === aidTo) {
      return;
    }

    const fromIndex = sortedAlbums.findIndex(
      (a) => a.aid.toString() === aidFrom.toString(),
    );
    const toIndex = sortedAlbums.findIndex(
      (a) => a.aid.toString() === aidTo.toString(),
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

    if (fromIndex > toIndex) {
      // Drop before photo at dropzone
      newlySortedAlbums.splice(newToIndex, 0, sortedAlbums[fromIndex]);
    } else {
      // Drop after photo at dropzone
      newlySortedAlbums.splice(newToIndex + 1, 0, sortedAlbums[fromIndex]);
    }

    setSortedAlbums(newlySortedAlbums);
  }

  function handleDragStart(aid) {
    setDraggedAid(aid);
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

  useEffect(() => {
    setSortedAlbums(albums);
  }, [albums]);

  return (
    <>
      {sortedAlbums?.length === 0 && (
        <div className="empty-state">
          <p className="eyebrow">A blank canvas</p>
          <h2 className="mt-2 text-2xl font-semibold">
            Create your first album.
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-black/50">
            Create an album and add images
          </p>
        </div>
      )}

      <InfiniteList
        initialSize={10}
        className="album-grid"
        items={filteredAndSortedAlbums}
        keyExtractor={(album) => album.aid}
        renderItem={(album, i) => (
          <DraggableAndDroppable
            onDrop={() => updateSortOrder(filteredAndSortedAlbums)}
            onDragStart={() => handleDragStart(album.aid)}
            onDragEnter={() => handleDragEnter(album.aid)}
            key={album.aid}
            disabled={searchTerm.length > 0 || isSelecting}>
            <SelectableItem item={album.aid} itemId={album.aid}>
              <AlbumCard data={album} lazy={i >= EAGER_LOAD_COUNT} />
            </SelectableItem>
          </DraggableAndDroppable>
        )}
      />
    </>
  );
}

export default DashboardBody;
