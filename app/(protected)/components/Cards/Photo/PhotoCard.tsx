"use client";
import React, { useState, type Ref } from "react";
import PhotoInfo from "./PhotoInfo";
import CustomImage from "@app/common/Image/CustomImage";
import { useUserPreferences } from "@app/(protected)/UserPreferencesContext";
import type { PhotoWithUrl } from "@/types/photos";

const PHOTO_GRID_FALLBACK_SIZES =
  "(min-width: 1536px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33.333vw, 50vw";

interface PhotoCardProps {
  className?: string;
  dragHandleRef?: Ref<HTMLButtonElement>;
  photo: PhotoWithUrl;
  minimalisticView: boolean;
  onClick?: () => void;
  lazy?: boolean;
  sizes?: string;
}

const PhotoCard = React.memo(
  ({
    className = "",
    dragHandleRef,
    photo,
    minimalisticView,
    onClick,
    lazy = true,
    sizes = PHOTO_GRID_FALLBACK_SIZES,
  }: PhotoCardProps) => {
    const [showPhotoInfo, setShowPhotoInfo] = useState<boolean>(false);

    const { userPreferences } = useUserPreferences();

    function handleShowPhotoInfo() {
      setShowPhotoInfo(!minimalisticView);
    }

    function handleHidePhotoInfo() {
      setShowPhotoInfo(false);
    }

    const card = (
      <div
        className={`card photo-card relative overflow-hidden bg-[#e9e9e6] ${className}`}
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
    );

    if (!onClick) return card;

    return (
      <button
        ref={dragHandleRef}
        type="button"
        className="block w-full text-left"
        aria-label={`Open ${photo.name}`}
        onClick={onClick}>
        {card}
      </button> 
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.className === nextProps.className &&
      prevProps.photo.pid === nextProps.photo.pid &&
      prevProps.minimalisticView === nextProps.minimalisticView &&
      prevProps.sizes === nextProps.sizes &&
      prevProps.lazy === nextProps.lazy
    );
  },
);

PhotoCard.displayName = "PhotoCard";
export default PhotoCard;
