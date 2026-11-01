"use client";
import SelectableItem from "@app/(protected)/components/Select/SelectableItem";
import PhotoCard from "@app/(protected)/components/Cards/Photo/PhotoCard";
import { useState } from "react";
import SortableItem from "@app/(protected)/components/DragAndDrop/SortableItem";
import DragEndMonitor from "@app/(protected)/components/DragAndDrop/DragEndMonitor";
import { DEFAULT_SORTABLE_SENSORS } from "@app/(protected)/components/DragAndDrop/sortableSensors";
import { SORTABLE_DROP_ANIMATION } from "@app/(protected)/components/DragAndDrop/sortableAnimations";
import {
  DragDropProvider,
  DragOverlay,
  type DragEndEvent,
} from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { arrayMove } from "@dnd-kit/helpers";
import updateAlbum from "@actions/updateAlbum";
import { toast } from "react-toastify";
import { useAlbum } from "../AlbumContext";
import PhotoCarousel from "@app/(protected)/components/Cards/Photo/PhotoCarousel";
import CustomImage from "@app/common/Image/CustomImage";
import UpdateAlbumForm from "./AlbumHeader/Settings/UpdateAlbumForm";
import AlbumSettings from "./AlbumHeader/Settings/AlbumSettings";
import { useSelect } from "@app/(protected)/components/Select/SelectContext";
import InfiniteList from "@app/(protected)/components/InfiniteLIst/InfiniteList";
import type { PhotoWithUrl } from "@/types/photos";

interface AlbumBodyProps {
  minimalisticView: boolean;
}

function AlbumBody({ minimalisticView }: AlbumBodyProps) {
  const album = useAlbum();

  const [currentExpanded, setCurrentExpanded] = useState<number | null>(null);
  const [sortedPhotos, setSortedPhotos] =
    useState<PhotoWithUrl[]>(album.photos);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { selectedItems, mode, isSelecting } = useSelect<PhotoWithUrl>();

  async function updateSortOrder(sorted: PhotoWithUrl[]) {
    const sortedPids = sorted.map((photo) => photo.pid);
    const res = await updateAlbum({ aid: album.aid, photoOrder: sortedPids });
    if (!res.ok) {
      toast.error(res.message, {
        toastId: "Error: Update photos sort order",
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { source } = event.operation;

    if (event.canceled || !isSortable(source)) {
      return;
    }

    const { initialIndex, index } = source;

    if (initialIndex === index) {
      return;
    }

    const reorderedPhotos = arrayMove(sortedPhotos, initialIndex, index);
    setSortedPhotos(reorderedPhotos);
    void updateSortOrder(reorderedPhotos);
  }

  let banner: PhotoWithUrl | undefined | null;

  if (isSelecting && mode === "changeBanner" && selectedItems?.[0]) {
    banner = selectedItems[0];
  } else {
    banner = album.banner ?? sortedPhotos?.[0];
  }

  return (
    <>
      <section className="banner-image relative h-[55vh] min-h-[380px] max-h-[620px] overflow-hidden bg-black">
        <div className="h-full cursor-pointer group">
          {banner ? (
            <CustomImage
              preview
              fill
              priority
              src={banner.url}
              className="h-full max-w-full brightness-[0.58] transition-all duration-500 group-hover:scale-[1.01] group-hover:brightness-[0.48]"
              name={banner.name}
              lazy={false}
              sizes="(min-width: 768px) calc(100vw - 240px), 100vw"
              blurhash={banner.blurhash}
            />
          ) : (
            <div className="flex justify-center h-full">
              <img
                src="/assets/images/placeholder.png"
                className="object-contain"
              />
            </div>
          )}
          <div className="absolute bottom-8 left-5 z-40 max-w-[75%] text-white animate-fadeInAndSlideDown sm:bottom-10 sm:left-10">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
              Album · {sortedPhotos.length}{" "}
              {sortedPhotos.length === 1 ? "image" : "images"}
            </p>
            <div className="flex items-center gap-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              {isEditing ? (
                <UpdateAlbumForm onClose={() => setIsEditing(false)} />
              ) : (
                <>
                  <h1>{album.name}</h1>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                    }}>
                    <img
                      src="/assets/icons/pencil.svg"
                      className="w-6 opacity-50 hover:opacity-80 transition-all"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {/** Shouldn't trigger hover effects */}
        <div className="album-settings absolute right-5 top-5 z-40 flex sm:bottom-8 sm:right-8 sm:top-auto">
          <AlbumSettings />
        </div>
      </section>

      <div className="p-1 sm:p-4">
        {sortedPhotos.length === 0 && (
          <div className="empty-state my-8">
            <p className="eyebrow">Empty album</p>
            <h2 className="mt-2 text-2xl font-semibold">Add photo</h2>
          </div>
        )}

        <DragDropProvider sensors={DEFAULT_SORTABLE_SENSORS}>
          <DragEndMonitor onDragEnd={handleDragEnd} />
          <InfiniteList
            className="photo-grid"
            initialSize={10}
            items={sortedPhotos}
            keyExtractor={(photo) => photo.pid}
            renderItem={(photo, index) => (
              <SortableItem
                id={photo.pid}
                index={index}
                disabled={isSelecting}>
                {(handleRef) => (
                  <SelectableItem item={photo} itemId={photo.pid}>
                    <PhotoCard
                      dragHandleRef={handleRef}
                      photo={photo}
                      minimalisticView={minimalisticView}
                      onClick={() => setCurrentExpanded(index)}
                      lazy={true}
                    />
                  </SelectableItem>
                )}
              </SortableItem>
            )}
          />

          <DragOverlay dropAnimation={SORTABLE_DROP_ANIMATION}>
            {(source) => {
              const activePhoto = sortedPhotos.find(
                (photo) => photo.pid === source.id,
              );

              return activePhoto ? (
                <div className="pointer-events-none scale-[1.02] opacity-95 shadow-2xl">
                  <PhotoCard
                    className="!h-auto w-full aspect-square"
                    photo={activePhoto}
                    minimalisticView={minimalisticView}
                    lazy={false}
                  />
                </div>
              ) : null;
            }}
          </DragOverlay>
        </DragDropProvider>

        {currentExpanded != null && (
          <PhotoCarousel
            photos={album.photos}
            defaultIndex={currentExpanded}
            onClose={() => setCurrentExpanded(null)}
          />
        )}
      </div>
    </>
  );
}

export default AlbumBody;
