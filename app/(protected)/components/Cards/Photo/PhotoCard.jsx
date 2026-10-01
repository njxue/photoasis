"use client";
import React, { useState } from "react";
import PhotoInfo from "./PhotoInfo";
import Photo from "../Photo";
import { useUserPreferences } from "@app/(protected)/UserPreferencesContext";

const PhotoCard = React.memo(
  ({ photo, minimalisticView, onClick, lazy = true }) => {
    const [showPhotoInfo, setShowPhotoInfo] = useState(false);

    const { userPreferences } = useUserPreferences();

    function handleShowPhotoInfo() {
      setShowPhotoInfo(!minimalisticView);
    }

    function handleHidePhotoInfo() {
      setShowPhotoInfo(false);
    }

    return (
      <div
        onClick={() => {
          onClick?.();
        }}>
        <div
          className="card photo-card relative overflow-hidden bg-[#e9e9e6]"
          onMouseEnter={handleShowPhotoInfo}
          onMouseLeave={handleHidePhotoInfo}>
          <Photo
            src={photo.url}
            name={photo.name}
            blurhash={photo.blurhash}
            objectFit={userPreferences.objectFit}
            lazy={lazy}
            sizes="(max-width: 450px) 50px, (max-width: 640px) 64px, 125px"
          />

          {showPhotoInfo && (
            <div className="absolute inset-0 w-full bg-black/65 animate-slideUp">
              <PhotoInfo photo={photo} />
            </div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.photo.pid === nextProps.photo.pid &&
      prevProps.minimalisticView === nextProps.minimalisticView
    );
  }
);

PhotoCard.displayName = "PhotoCard";
export default PhotoCard;
