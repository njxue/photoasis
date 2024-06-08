"use client";
import { useState } from "react";
import ExpandedPhoto from "./ExpandedPhoto";
import OptimisedImage from "../../OptimisedImage";
import PhotoInfo from "./PhotoInfo";

const PhotoCard = ({ photo, minimalisticView }) => {
  const [expandPhoto, setExpandPhoto] = useState(false);
  const [showPhotoInfo, setShowPhotoInfo] = useState(false);

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
        <OptimisedImage
          src={photo.url}
          name={photo.name}
          className="object-cover h-full w-full"
          hover
        />

        {showPhotoInfo && (
          <div className="absolute bottom-0 bg-black opacity-70 w-full h-full animate-slideUp">
            <PhotoInfo photo={photo} />
          </div>
        )}
      </div>
      <ExpandedPhoto
        expandPhoto={expandPhoto}
        setExpandPhoto={setExpandPhoto}
        photo={photo}
      />
    </div>
  );
};

export default PhotoCard;
