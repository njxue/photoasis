"use client";

import MinimalisticViewToggle from "@app/(protected)/components/MinimalisticViewToggle";
import PhotoCard from "@app/(protected)/components/Cards/Photo/PhotoCard";
import { useState } from "react";
import { notFound } from "next/navigation";
import PhotoCarousel from "@app/(protected)/components/Cards/Photo/PhotoCarousel";
import { NUM_IMAGES_ABOVE_FOLD } from "@app/configs/imageConfigs";
import { toast } from "react-toastify";

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
      <div className="p-3">
        {!minimalisticView && (
          <header className="page-heading">
            <h1>Gallery</h1>

            <hr className="mb-3" />
          </header>
        )}
        <div className="photo-grid">
          {photos &&
            photos.map((photo, idx) => (
              <PhotoCard
                key={photo.pid}
                photo={photo}
                minimalisticView={minimalisticView}
                onClick={() => setCurrentExpanded(idx)}
                lazy={idx >= NUM_IMAGES_ABOVE_FOLD}
              />
            ))}
        </div>
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
