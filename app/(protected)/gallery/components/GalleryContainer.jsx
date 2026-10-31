"use client";

import MinimalisticViewToggle from "@app/(protected)/components/MinimalisticViewToggle";
import PhotoCard from "@app/(protected)/components/Cards/Photo/PhotoCard";
import { useCallback, useRef, useState } from "react";
import { notFound } from "next/navigation";
import PhotoCarousel from "@app/(protected)/components/Cards/Photo/PhotoCarousel";
import { toast } from "react-toastify";
import PaginatedInfiniteList from "@app/(protected)/components/InfiniteLIst/PaginatedInfiniteList";
import { fetchPhotos } from "../api/fetchPhotos";

const EAGER_LOAD_IMAGES_COUNT = 20;
const GalleryContainer = ({
  photos: initialPhotos,
  nextCursor: initialCursor,
  totalPhotosCount,
}) => {
  if (!initialPhotos) {
    toast.error("Unable to fetch photos. Please try again later", {
      toastId: "Error: Fetch gallery",
    });
    notFound();
  }

  const [minimalisticView, setMinimalisticView] = useState(false);
  const [currentExpanded, setCurrentExpanded] = useState(null);
  const [photos, setPhotos] = useState(initialPhotos);
  const [nextCursor, setNextCursor] = useState(initialCursor);
  const requestInFlightRef = useRef(false);

  const loadNextPage = useCallback(async () => {
    if (requestInFlightRef.current || nextCursor == null) return false;

    requestInFlightRef.current = true;

    try {
      const page = await fetchPhotos(nextCursor);

      setPhotos((current) => [...current, ...page.photos]);
      setNextCursor(page.nextCursor);
      return page.photos.length > 0;
    } catch {
      toast.error("Unable to fetch more photos. Please try again later", {
        toastId: "Error: Fetch more gallery photos",
      });
      return false;
    } finally {
      requestInFlightRef.current = false;
    }
  }, [nextCursor]);

  const hasMore = nextCursor != null;

  return (
    <>
      <div className={minimalisticView ? "p-1" : "protected-page"}>
        {!minimalisticView && (
          <header className="mb-8 border-b border-black/15 pb-5">
            <p className="eyebrow">All photographs</p>
            <div className="mt-1 flex items-end justify-between gap-4">
              <h1 className="page-title">Gallery</h1>
              <p className="pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
                {totalPhotosCount}{" "}
                {totalPhotosCount === 1 ? "image" : "images"}
              </p>
            </div>
          </header>
        )}

        {photos.length === 0 && (
          <div className="empty-state">
            <p className="eyebrow">Nothing here yet</p>
            <h2 className="mt-2 text-2xl font-semibold">
              Create an album and add photos to see them here
            </h2>
          </div>
        )}
        <PaginatedInfiniteList
          items={photos}
          renderItem={(photo, i) => (
            <PhotoCard
              key={photo.pid}
              photo={photo}
              minimalisticView={minimalisticView}
              onClick={() => setCurrentExpanded(i)}
              lazy={i >= EAGER_LOAD_IMAGES_COUNT}
            />
          )}
          keyExtractor={(photo) => photo.pid}
          className="photo-grid"
          hasMore={hasMore}
          loadNextPage={loadNextPage}
        />

        {currentExpanded != null && (
          <PhotoCarousel
            photos={photos}
            defaultIndex={currentExpanded}
            hasMore={hasMore}
            loadNextPage={loadNextPage}
            onClose={() => setCurrentExpanded(null)}
          />
        )}
      </div>
      <MinimalisticViewToggle
        minimalisticView={minimalisticView}
        setMinimalisticView={setMinimalisticView}
      />
    </>
  );
};

export default GalleryContainer;
