"use client";
import { useState } from "react";
import PhotoSettingsInputs from "./PhotoSettingsInputs";
import OptimisedImage from "../OptimisedImage";

const ImagePreviews = ({ images, setImages }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  function handleRemoveImage(image) {
    const newImages = images.filter((i) => i.name !== image);
    setImages(newImages);
  }

  return (
    <div className="flex flex-col py-3 md:px-1 md:py-0 h-full">
      <div className="relative min-h-[90px] overflow-auto md:h-full">
        <div className="absolute top-0 left-0 w-full flex flex-row gap-1 md:grid md:grid-cols-2">
          {images &&
            images.map((image) => (
              <div className="relative min-w-[80px]" key={image.name}>
                <OptimisedImage
                  className={`${
                    selectedPhoto === image.name && "opacity-30"
                  } h-[80px] w-full`}
                  src={image.url}
                  onClick={(e) => setSelectedPhoto(e.target.id)}
                  name={image.name}
                  hover
                />
                <div className="bg-black absolute right-0 top-0 cursor-pointer opacity-0 hover:opacity-70">
                  <img
                    src="/assets/icons/cross-white.svg"
                    width={16}
                    onClick={() => handleRemoveImage(image.name)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      {images &&
        images.map((photo) => (
          <div
            hidden={selectedPhoto !== photo.name}
            className="h-fit mt-2"
            key={photo.name}>
            <PhotoSettingsInputs photo={photo} />
          </div>
        ))}
    </div>
  );
};

export default ImagePreviews;
