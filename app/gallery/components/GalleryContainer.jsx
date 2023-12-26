"use client";

import MinimalisticViewToggle from "@app/common/MinimalisticViewToggle";
import PhotoCard from "@app/common/Cards/Photo/PhotoCard";
import { useState } from "react";

const GalleryContainer = ({ photos }) => {
  const [minimalisticView, setMinimalisticView] = useState(false);
  return (
    <>
      <div className="p-1">
        {!minimalisticView && (
          <div>
            <div className="flex flex-row items-center gap-3 mb-3 mt-2 text-3xl font-light">
              <p className="line-clamp-1">Gallery</p>
            </div>
            <hr className="mb-3" />
          </div>
        )}
        <div className="photo-grid">
          {photos &&
            photos.map((photo) => (
              <PhotoCard
                key={photo.pid}
                photo={photo}
                expandable
                minimalisticView={minimalisticView}
              />
            ))}
        </div>
      </div>
      <MinimalisticViewToggle
        minimalisticView={minimalisticView}
        setMinimalisticView={setMinimalisticView}
      />
    </>
  );
};

export default GalleryContainer;
