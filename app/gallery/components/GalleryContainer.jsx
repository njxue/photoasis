"use client";

import MinimalisticViewToggle from "@app/common/MinimalisticViewToggle";
import PhotoCard from "@app/common/Cards/Photo/PhotoCard";
import { useState } from "react";
import { notFound } from "next/navigation";

const GalleryContainer = ({ photos }) => {
  if (!photos) {
    toast.error("Unable to fetch photos. Please try again later", {
      toastId: "Error: Fetch gallery",
    });
    notFound();
  }
  const [minimalisticView, setMinimalisticView] = useState(false);
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
