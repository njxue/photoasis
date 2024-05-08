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
    <>
      <div
        className="card relative bg-white"
        onMouseEnter={handleShowPhotoInfo}
        onMouseLeave={handleHidePhotoInfo}>
        <OptimisedImage
          src={photo.url}
          onClick={() => {
            setExpandPhoto(true);
          }}
          className="object-cover h-full w-full"
          hover
        />

        {showPhotoInfo && (
          <div className="absolute bottom-0 bg-black opacity-70 w-full animate-slideUp">
            <PhotoInfo photo={photo} />
          </div>
        )}
      </div>
      <ExpandedPhoto
        expandPhoto={expandPhoto}
        setExpandPhoto={setExpandPhoto}
        photo={photo}
      />
    </>
  );
};

export default PhotoCard;
