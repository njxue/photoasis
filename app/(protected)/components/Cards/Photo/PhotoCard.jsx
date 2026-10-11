"use client";
import React, { useState } from "react";
import PhotoInfo from "./PhotoInfo";
import CustomImage from "@app/common/Image/CustomImage";
import { useUserPreferences } from "@app/(protected)/UserPreferencesContext";

const PHOTO_GRID_FALLBACK_SIZES =
  "(min-width: 1536px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33.333vw, 50vw";

const PhotoCard = React.memo(
  ({
    photo,
    minimalisticView,
    onClick,
    lazy = true,
    sizes = PHOTO_GRID_FALLBACK_SIZES,
  }) => {
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
          <CustomImage
            preview
            fill
            src={photo.url}
            name={photo.name}
            blurhash={photo.blurhash}
            objectFit={userPreferences.objectFit}
            lazy={lazy}
            sizes={sizes}
            maxSourceWidth={960}
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
      prevProps.minimalisticView === nextProps.minimalisticView &&
      prevProps.sizes === nextProps.sizes &&
      prevProps.lazy === nextProps.lazy
    );
  },
);

PhotoCard.displayName = "PhotoCard";
export default PhotoCard;
