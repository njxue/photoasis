"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import PhotoSettingsInputs from "./PhotoSettingsInputs";

const ImagePreviews = ({ images, withForm }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="flex flex-col py-3 md:px-1 md:py-0 h-full">
      <div className="relative h-[90px] overflow-auto md:h-full">
        <div className="absolute top-0 left-0 w-full flex flex-row gap-1 md:grid md:grid-cols-2">
          {images &&
            images.map((image) => (
              <Image
                className={`hover:opacity-100 ${
                  selectedPhoto === image.name ? "opacity-100" : "opacity-50"
                } object-cover h-[80px] w-full max-w-[100px]`}
                width={0}
                height={0}
                src={image.url}
                onClick={(e) => setSelectedPhoto(e.target.id)}
                key={image.name}
                id={image.name}
                alt={image.name}
                priority={true}
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
