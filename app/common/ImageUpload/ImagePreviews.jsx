"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import PhotoSettingsInputs from "./PhotoSettingsInputs";
import OptimisedImage from "../OptimisedImage";

const ImagePreviews = ({ images, withForm }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="flex flex-col py-3 md:px-1 md:py-0 h-full">
      <div className="relative h-[90px] overflow-auto md:h-full">
        <div className="absolute top-0 left-0 w-full flex flex-row gap-1 md:grid md:grid-cols-2">
          {images &&
            images.map((image) => (
              <OptimisedImage
                className={`${selectedPhoto === image.name && "opacity-50 border-4 border-solid border-black"} h-[80px] w-full max-w-[100px]`}
                src={image.url}
                onClick={(e) => setSelectedPhoto(e.target.id)}
                key={image.name}
                name={image.name}
                hover
              />
            ))}
        </div>
      </div>
      {images &&
        withForm &&
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
