"use client";
import SelectableItem from "@app/(protected)/components/Select/SelectableItem";
import PhotoCard from "@app/(protected)/components/Cards/Photo/PhotoCard";
import { useState } from "react";
import DraggableAndDroppable from "@app/(protected)/components/DragAndDrop/DraggableAndDroppable";
import updateAlbum from "@actions/updateAlbum";
import { toast } from "react-toastify";
import { useAlbum } from "../AlbumContext";
import PhotoCarousel from "@app/(protected)/components/Cards/Photo/PhotoCarousel";
import Photo from "@app/(protected)/components/Cards/Photo";
import UpdateAlbumForm from "./AlbumHeader/Settings/UpdateAlbumForm";
import AlbumSettings from "./AlbumHeader/Settings/AlbumSettings";
import { useSelect } from "@app/(protected)/components/Select/SelectContext";
function AlbumBody({ minimalisticView }) {
  const album = useAlbum();

  const [currentExpanded, setCurrentExpanded] = useState(null);
  const [sortedPhotos, setSortedPhotos] = useState(album?.photos);
  const [isEditing, setIsEditing] = useState(false);
  const { selectedItems, mode, isSelecting } = useSelect();
  const [draggedPid, setDraggedPid] = useState();

  function handleDragEnter(pidTo) {
    const pidFrom = draggedPid;

    if (pidFrom === pidTo) {
      return;
    }

    const fromIndex = sortedPhotos.findIndex((i) => i.pid === pidFrom);
    const toIndex = sortedPhotos.findIndex((i) => i.pid === pidTo);

    if (fromIndex < 0 || toIndex < 0) {
      // Error, shouldn't happen
      return;
    }

    const newlySortedPhotos = [...sortedPhotos];

    // Delete the dragged photo
    newlySortedPhotos.splice(fromIndex, 1);

    // Calculate new toIndex because we deleted the dragged photo
    const newToIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;

    if (fromIndex > toIndex) {
      // Drop before photo at dropzone
      newlySortedPhotos.splice(newToIndex, 0, sortedPhotos[fromIndex]);
    } else {
      // Drop after photo at dropzone
      newlySortedPhotos.splice(newToIndex + 1, 0, sortedPhotos[fromIndex]);
    }

    setSortedPhotos(newlySortedPhotos);
    //updateSortOrder(newlySortedPhotos);
  }

  function handleDragStart(pid) {
    setDraggedPid(pid);
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

  let banner;

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
            <Photo
              src={banner.url}
              className="h-full max-w-full brightness-[0.58] transition-all duration-500 group-hover:scale-[1.01] group-hover:brightness-[0.48]"
              name={banner.name}
              lazy={false}
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
              Collection · {sortedPhotos.length} {sortedPhotos.length === 1 ? "image" : "images"}
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

      <div className="photo-grid p-1 sm:p-4">
        {sortedPhotos.length === 0 && (
          <div className="empty-state my-8">
            <p className="eyebrow">Empty collection</p>
            <h2 className="mt-2 text-2xl font-semibold">Add photographs to begin the story.</h2>
          </div>
        )}
        {sortedPhotos.map((photo, idx) => (
          <DraggableAndDroppable
            onDrop={() => updateSortOrder(sortedPhotos)}
            onDragStart={() => handleDragStart(photo.pid)}
            onDragEnter={() => handleDragEnter(photo.pid)}
            key={photo.pid}>
            <SelectableItem item={photo} itemId={photo.pid}>
              <PhotoCard
                photo={photo}
                minimalisticView={minimalisticView}
                onClick={() => setCurrentExpanded(idx)}
                lazy={true}
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
    </>
  );
}

export default AlbumBody;
