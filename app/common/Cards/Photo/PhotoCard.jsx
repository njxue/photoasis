"use client";
import { useState } from "react";
import PhotoInfo from "./PhotoInfo";
import Photo from "../Photo";
import { useUserPreferences } from "@app/UserPreferencesContext";

const PhotoCard = ({ photo, minimalisticView, onClick }) => {
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
        className="card relative"
        onMouseEnter={handleShowPhotoInfo}
        onMouseLeave={handleHidePhotoInfo}>
        <Photo
          src={photo.url}
          name={photo.name}
          blurhash={photo.blurhash}
          objectFit={userPreferences.objectFit}
        />

        {showPhotoInfo && (
          <div className="absolute bottom-0 bg-black opacity-70 w-full h-full animate-slideUp">
            <PhotoInfo photo={photo} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoCard;
