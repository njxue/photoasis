"use client";
import SelectableItem from "@app/(protected)/components/Select/SelectableItem";
import PhotoCard from "@app/(protected)/components/Cards/Photo/PhotoCard";
import { useCallback, useState } from "react";
import DraggableAndDroppable from "@app/(protected)/components/DragAndDrop/DraggableAndDroppable";
import updateAlbum from "@actions/updateAlbum";
import { toast } from "react-toastify";
import { useAlbum } from "../AlbumContext";
import PhotoCarousel from "@app/(protected)/components/Cards/Photo/PhotoCarousel";
import Photo from "@app/(protected)/components/Cards/Photo";
import UpdateAlbumForm from "./AlbumHeader/Menu/UpdateAlbumForm";
import AlbumMenu from "./AlbumHeader/Menu/AlbumMenu";
import { useSelect } from "@app/(protected)/components/Select/SelectContext";
function AlbumBody({ minimalisticView }) {
  const album = useAlbum();

  const [currentExpanded, setCurrentExpanded] = useState(null);
  const [sortedPhotos, setSortedPhotos] = useState(album?.photos);
  const [isEditing, setIsEditing] = useState(false);
  const { selectedItems, mode, isSelecting } = useSelect();
  console.log(selectedItems);

  const photoComparator = useCallback((i1, i2) => i1.pid === i2.pid, []);

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

  let banner;

  if (isSelecting && mode === "changeBanner" && selectedItems?.[0]) {
    banner = selectedItems[0];
  } else {
    banner = album.banner ?? sortedPhotos?.[0];
  }

  return (
    <>
      <div className="relative h-[450px]">
        <div className="h-full cursor-pointer group">
          {banner ? (
            <Photo
              src={banner.url}
              className="max-w-full group-hover:opacity-80 transition-all h-full brightness-50"
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
          <div className="flex items-center gap-4 absolute bottom-6 left-6 font-bold text-4xl md:text-5xl text-white z-50 animate-fadeInAndSlideDown">
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
        {/** Shouldn't trigger hover effects */}
        <div className="absolute flex top-3 right-3 sm:bottom-3 sm:top-auto">
          <AlbumMenu />
        </div>
      </div>

      <div className="photo-grid p-2">
        {sortedPhotos.map((photo, idx) => (
          <DraggableAndDroppable
            handleDrop={(e) => handleDrop(e, photo.pid)}
            handleDrag={(e) => handleDrag(e, photo.pid)}
            key={photo.pid}>
            <SelectableItem item={photo} comparator={photoComparator}>
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
