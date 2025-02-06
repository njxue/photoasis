"use client";
import { useState } from "react";
import ExpandedPhoto from "./ExpandedPhoto";
import OptimisedImage from "../../Image/OptimisedImage";
import PhotoInfo from "./PhotoInfo";
import { QUALITY_MAX, QUALITY_MID } from "@app/common/Image/constants";
import Photo from "../Photo";

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
        <Photo src={photo.url} name={photo.name} objectFit="object-contain" />

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
