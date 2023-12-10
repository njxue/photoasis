"use client";
import Image from "next/image";
import { useState } from "react";

const ImagePreviews = ({ images, withForm }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  return (
    <>
      <div className="flex flex-row gap-1 flex-wrap">
        {images &&
          images.map((image) => (
            <Image
              className={`hover:opacity-100 ${
                selectedPhoto === image.name ? "opacity-100" : "opacity-50"
              }`}
              width={100}
              height={20}
              src={image.url}
              onClick={(e) => setSelectedPhoto(e.target.id)}
              key={image.name}
              id={image.name}
              alt={image.name}
              priority={true}
            />
          ))}
      </div>
      {images &&
        withForm &&
        images.map((image) => (
          <div hidden={selectedPhoto !== image.name}>
            <p>{image.name}</p>
            <label>Aperture: </label>
            <input
              className="border border-solid border-gray-600 rounded p-1"
              type="number"
              name="aperture"
              step={0.1}
              min={0}
              defaultValue={image.aperture}
              placeholder="Aperture"
            />
            <label>Shutter Speed: </label>
            <input
              className="border border-solid border-gray-600 rounded p-1"
              type="text"
              name="shutterspeed"
              defaultValue={image.shutterspeed}
              placeholder="Shutter Speed"
            />
            <label>ISO: </label>
            <input
              className="border border-solid border-gray-600 rounded p-1"
              type="number"
              name="iso"
              min={0}
              defaultValue={image.iso}
              placeholder="ISO"
            />
            <div />
          </div>
        ))}
    </>
  );
};

export default ImagePreviews;
