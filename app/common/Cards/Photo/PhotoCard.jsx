"use client";
import { useState } from "react";
import ExpandedPhoto from "./ExpandedPhoto";
import PhotoInfo from "./PhotoInfo";
import Photo from "../Photo";
import { useUserPreferences } from "@app/UserPreferencesContext";

const PhotoCard = ({ photo, minimalisticView }) => {
  const [expandPhoto, setExpandPhoto] = useState(false);
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
        setExpandPhoto(true);
      }}>
      <div
        className="card relative bg-white"
        onMouseEnter={handleShowPhotoInfo}
        onMouseLeave={handleHidePhotoInfo}>
        <Photo
          src={photo.url}
          name={photo.name}
          objectFit={userPreferences.objectFit}
        />

        {showPhotoInfo && (
          <div className="absolute bottom-0 bg-black opacity-70 w-full h-full animate-slideUp">
            <PhotoInfo photo={photo} />
          </div>
        )}
      </div>
      {expandPhoto && (
        <ExpandedPhoto
          expandPhoto={expandPhoto}
          setExpandPhoto={setExpandPhoto}
          photo={photo}
        />
      )}
    </div>
  );
};

export default PhotoCard;
