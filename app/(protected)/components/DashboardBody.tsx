"use client";
import { useEffect, useState } from "react";
import {
  DragDropProvider,
  DragOverlay,
  type DragEndEvent,
} from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { arrayMove } from "@dnd-kit/helpers";
import SelectableItem from "@app/(protected)/components/Select/SelectableItem";
import AlbumCard from "@app/(protected)/components/Cards/Album/AlbumCard";
import SortableItem from "@app/(protected)/components/DragAndDrop/SortableItem";
import DragEndMonitor from "@app/(protected)/components/DragAndDrop/DragEndMonitor";
import {
  KeyboardSensor,
  PointerSensor,
  SORTABLE_POINTER_SENSOR_OPTIONS,
} from "@app/(protected)/components/DragAndDrop/sortableSensors";
import { SORTABLE_DROP_ANIMATION } from "@app/(protected)/components/DragAndDrop/sortableAnimations";
import updateUser from "@actions/updateUser";
import { toast } from "react-toastify";
import InfiniteList from "./InfiniteLIst/InfiniteList";
import { useSelect } from "./Select/SelectContext";
import type { AlbumWithThumbnail } from "@/types/albums";

const EAGER_LOAD_COUNT = 20;
const ALBUM_SORTING_SENSORS = [
  PointerSensor.configure({
    ...SORTABLE_POINTER_SENSOR_OPTIONS,
    // Album cards are links
    preventActivation: () => false,
  }),
  KeyboardSensor,
];

interface DashboardBodyProps {
  albums: AlbumWithThumbnail[];
  searchTerm?: string;
}

function DashboardBody({ albums, searchTerm = "" }: DashboardBodyProps) {
  const [sortedAlbums, setSortedAlbums] =
    useState<AlbumWithThumbnail[]>(albums);
  const { isSelecting } = useSelect();

  const filteredAndSortedAlbums = sortedAlbums.filter((album) =>
    album.name.toUpperCase().trim().includes(searchTerm.toUpperCase().trim()),
  );

  async function updateSortOrder(sorted: AlbumWithThumbnail[]) {
    const sortedAids = sorted.map((album) => album.aid);
    const res = await updateUser({ albumOrder: sortedAids });
    if (!res.ok) {
      toast.error("Unable to update albums sort order", {
        toastId: "Error: Update albums sort order",
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { source } = event.operation;

    if (event.canceled || !isSortable(source)) {
      return;
    }

    // initialIndex: original position
    // index: target position
    const { initialIndex, index } = source;

    if (initialIndex === index) {
      return;
    }

    const reorderedAlbums = arrayMove(sortedAlbums, initialIndex, index);
    setSortedAlbums(reorderedAlbums);
    void updateSortOrder(reorderedAlbums);
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

      <DragDropProvider sensors={ALBUM_SORTING_SENSORS}>
        <DragEndMonitor onDragEnd={handleDragEnd} />
        <InfiniteList
          initialSize={10}
          className="album-grid"
          items={filteredAndSortedAlbums}
          keyExtractor={(album) => album.aid}
          renderItem={(album, index) => (
            <SortableItem
              id={album.aid}
              index={index}
              disabled={searchTerm.length > 0 || isSelecting}>
              <SelectableItem item={album.aid} itemId={album.aid}>
                <AlbumCard data={album} lazy={index >= EAGER_LOAD_COUNT} />
              </SelectableItem>
            </SortableItem>
          )}
        />

        <DragOverlay dropAnimation={SORTABLE_DROP_ANIMATION}>
          {(source) => {
            const activeAlbum = sortedAlbums.find(
              (album) => album.aid === source.id,
            );

            return activeAlbum ? (
              <div className="pointer-events-none scale-[1.02] opacity-95 shadow-2xl">
                <AlbumCard data={activeAlbum} lazy={false} />
              </div>
            ) : null;
          }}
        </DragOverlay>
      </DragDropProvider>
    </>
  );
}

export default DashboardBody;
