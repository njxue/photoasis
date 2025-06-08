"use client";

import MinimalisticViewToggle from "@app/common/MinimalisticViewToggle";
import PhotoCard from "@app/common/Cards/Photo/PhotoCard";
import { useState } from "react";
import { notFound } from "next/navigation";
import PhotoCarousel from "@app/common/Cards/Photo/PhotoCarousel";
import { NUM_IMAGES_ABOVE_FOLD } from "@app/configs/imageConfigs";

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
      <div>
        {!minimalisticView && (
          <div className="page-heading">
            <div className="flex flex-row items-center gap-3 mb-3 ">
              <p>Gallery</p>
            </div>
            <hr className="mb-3" />
          </div>
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
