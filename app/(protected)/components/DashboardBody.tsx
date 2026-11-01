"use client";
import { useEffect, useState } from "react";
import SelectableItem from "@app/(protected)/components/Select/SelectableItem";
import AlbumCard from "@app/(protected)/components/Cards/Album/AlbumCard";
import DraggableAndDroppable from "@app/(protected)/components/DragAndDrop/DraggableAndDroppable";
import updateUser from "@actions/updateUser";
import { toast } from "react-toastify";
import InfiniteList from "./InfiniteLIst/InfiniteList";
import { useSelect } from "./Select/SelectContext";
import type { AlbumWithThumbnail } from "@/types/albums";

const EAGER_LOAD_COUNT = 20;
interface DashboardBodyProps {
  albums: AlbumWithThumbnail[];
  searchTerm?: string;
}

function DashboardBody({
  albums,
  searchTerm = "",
}: DashboardBodyProps) {
  const [sortedAlbums, setSortedAlbums] =
    useState<AlbumWithThumbnail[]>(albums);
  const { isSelecting } = useSelect();

  const filteredAndSortedAlbums = sortedAlbums.filter((album) =>
    album.name.toUpperCase().trim().includes(searchTerm.toUpperCase().trim()),
  );

  const [draggedAid, setDraggedAid] = useState<number | string | null>(null);
  function handleDragEnter(aidTo: number) {
    const aidFrom = draggedAid;
    if (aidFrom == null || aidFrom === aidTo) {
      return;
    }

    const fromIndex = sortedAlbums.findIndex(
      (album) => album.aid.toString() === aidFrom.toString(),
    );
    const toIndex = sortedAlbums.findIndex(
      (album) => album.aid.toString() === aidTo.toString(),
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
      newlySortedAlbums.splice(newToIndex, 0, sortedAlbums[fromIndex]!);
    } else {
      // Drop after photo at dropzone
      newlySortedAlbums.splice(newToIndex + 1, 0, sortedAlbums[fromIndex]!);
    }

    setSortedAlbums(newlySortedAlbums);
  }

  function handleDragStart(aid: number) {
    setDraggedAid(aid);
  }

  async function updateSortOrder(sorted: AlbumWithThumbnail[]) {
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
      {albums?.length === 0 && (
        <div className="empty-state">
          <p className="eyebrow">A blank canvas</p>
          <h2 className="mt-2 text-2xl font-semibold">
            Create your first album
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-black/50">
            Create an album and add images
          </p>
        </div>
      )}

      {filteredAndSortedAlbums?.length === 0 && (
        <div className="empty-state">
          <p className="eyebrow">Search album</p>
          <h2 className="mt-2 text-2xl font-semibold">
            No albums match your search term
          </h2>
        </div>
      )}

      <InfiniteList
        initialSize={10}
        className="album-grid"
        items={filteredAndSortedAlbums}
        keyExtractor={(album) => album.aid}
        renderItem={(album, index) => (
          <DraggableAndDroppable
            onDrop={() => updateSortOrder(filteredAndSortedAlbums)}
            onDragStart={() => handleDragStart(album.aid)}
            onDragEnter={() => handleDragEnter(album.aid)}
            key={album.aid}
            disabled={searchTerm.length > 0 || isSelecting}>
            <SelectableItem item={album.aid} itemId={album.aid}>
              <AlbumCard data={album} lazy={index >= EAGER_LOAD_COUNT} />
            </SelectableItem>
          </DraggableAndDroppable>
        )}
      />
    </>
  );
}

export default DashboardBody;
