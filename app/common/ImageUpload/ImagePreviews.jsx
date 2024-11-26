"use client";
import { useState } from "react";
import PhotoSettingsInputs from "./PhotoSettingsInputs";
import OptimisedImage from "../Image/OptimisedImage";
import { QUALITY_LOW } from "../Image/constants";
import { useFormStatus } from "react-dom";
import { useImageUploadContext } from "./ImageUploadContext";

const ImagePreviews = () => {
  const { pending } = useFormStatus();

  const {
    handleClickImagePreview,
    handleRemoveFile,
    selectedFile,
    imagePreviews: images,
  } = useImageUploadContext();

  return (
    <div className="flex flex-col py-3 md:py-0 md:px-1 h-full">
      <div className="relative min-h-[90px] overflow-auto grow">
        <div className="absolute top-0 left-0 w-full grid gap-1 grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {images?.map((image) => (
            <div className="relative min-w-[80px]" key={image.id}>
              <OptimisedImage
                className={`${
                  selectedFile === image.id && "opacity-30"
                } h-[80px] w-full`}
                src={image.url}
                onClick={(e) => {
                  handleClickImagePreview(e.target.id);
                }}
                name={image.id}
                quality={QUALITY_LOW}
                hover
              />
              {!pending && (
                <div className="bg-black absolute right-0 top-0 cursor-pointer opacity-0 hover:opacity-70">
                  <img
                    src="/assets/icons/cross.svg"
                    alt="Remove"
                    width={16}
                    onClick={(e) => {
                      // Stops modal from closing once the image (and this img tag) is removed from the DOM
                      e.stopPropagation();
                      handleRemoveFile(image.id);
                    }}
                    className="invert"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="min-h-[150px] mt-6" hidden={selectedFile == null}>
        {images &&
          images.map((image) => (
            <div
              hidden={selectedFile !== image.id}
              className="h-full"
              key={image.id}>
              <PhotoSettingsInputs photo={image} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImagePreviews;
