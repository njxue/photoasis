"use client";
import { useRef } from "react";
import ImagePreviews from "./ImagePreviews";
import LoadingSpinner from "../../../common/LoadingSpinner";
import { useFormStatus } from "react-dom";
import { useImageUploadContext } from "./ImageUploadContext";
import { bytesToMegabytes } from "@utils/helpers";
import {
  IMAGE_SIZE_RESTRICTION_ENABLED,
  MAX_SIZE_BYTES,
} from "@app/configs/imageConfigs";

const DroppableFileInput = ({ required, customDropzone }) => {
  const inputRef = useRef();
  const { pending } = useFormStatus();
  const { handleAddFiles, isLoading, files } = useImageUploadContext();

  function handleClick() {
    inputRef.current && inputRef.current.click();
  }

  function handleChange(e) {
    const newFiles = Array.from(e.target.files);
    handleAddFiles(newFiles);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    if (pending) {
      return;
    }
    const newFiles = Array.from(e.dataTransfer.files);
    handleAddFiles(newFiles);
  }

  return (
    <div className="flex flex-col h-full md:flex-row md:gap-3">
      {customDropzone ? (
        customDropzone
      ) : (
        <div
          className="border border-dashed border-black h-full w-full rounded flex flex-col justify-center items-center opacity-50 text-center text-lg cursor-pointer hover:opacity-100 transition-all"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}>
          <p>Drag or click to upload files</p>
          {IMAGE_SIZE_RESTRICTION_ENABLED && (
            <p className="mt-2">{`(max ${bytesToMegabytes(
              MAX_SIZE_BYTES
            )}MB per file)`}</p>
          )}

          <img
            src="/assets/icons/upload.svg"
            className="w-[35px] mt-5"
            alt="uploadIcon"
          />
          <input
            type="file"
            name="_" // Don't need name; we are not getting the files from this input
            multiple
            className="hidden"
            ref={inputRef}
            onChange={handleChange}
            accept="image/*"
            required={required}
            disabled={pending}
            onClick={(e) => {
              e.target.value = null;
            }}
          />
        </div>
      )}
      {(files.length > 0 || isLoading) && (
        <div className="w-full h-full">
          {isLoading ? (
            <div className="h-full flex flex-col justify-center items-center gap-5 text-gray-500 text-wrap text-center">
              <div className="w-8">
                <LoadingSpinner />
              </div>
              <p>Preparing your photos...</p>
            </div>
          ) : (
            <ImagePreviews />
          )}
        </div>
      )}
    </div>
  );
};

export default DroppableFileInput;
