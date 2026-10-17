"use client";

import MinimalisticViewToggle from "@app/(protected)/components/MinimalisticViewToggle";
import PhotoCard from "@app/(protected)/components/Cards/Photo/PhotoCard";
import { useState } from "react";
import { notFound } from "next/navigation";
import PhotoCarousel from "@app/(protected)/components/Cards/Photo/PhotoCarousel";
import { toast } from "react-toastify";
import InfiniteList from "@app/(protected)/components/InfiniteLIst/InfiniteList";

const EAGER_LOAD_IMAGES_COUNT = 20;
const GalleryContainer = ({ photos }) => {
  if (!photos) {
    toast.error("Unable to fetch photos. Please try again later", {
      toastId: "Error: Fetch gallery",
    });
    notFound();
  }
  const [minimalisticView, setMinimalisticView] = useState(false);
  const [currentExpanded, setCurrentExpanded] = useState(null);

  return (
    <>
      <div className={minimalisticView ? "p-1" : "protected-page"}>
        {!minimalisticView && (
          <header className="mb-8 border-b border-black/15 pb-5">
            <p className="eyebrow">All photographs</p>
            <div className="mt-1 flex items-end justify-between gap-4">
              <h1 className="page-title">Gallery</h1>
              <p className="pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
                {photos.length} {photos.length === 1 ? "image" : "images"}
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
        {photos && (
          <InfiniteList
            initialSize={EAGER_LOAD_IMAGES_COUNT}
            batchSize={10}
            className="photo-grid"
            items={photos}
            keyExtractor={(photo) => photo.pid}
            renderItem={(photo, i) => (
              <PhotoCard
                key={photo.pid}
                photo={photo}
                minimalisticView={minimalisticView}
                onClick={() => setCurrentExpanded(i)}
                lazy={i >= EAGER_LOAD_IMAGES_COUNT}
              />
            )}
          />
        )}
        {currentExpanded != null && (
          <PhotoCarousel
            photos={photos}
            defaultIndex={currentExpanded}
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
