"use client";
import { useRef } from "react";
import ImagePreviews from "./ImagePreviews";
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
    <div className="flex h-full flex-col md:flex-row md:gap-5">
      {customDropzone ? (
        customDropzone
      ) : (
        <div
          className="flex h-full min-h-[300px] w-full cursor-pointer flex-col items-center justify-center border border-dashed border-black/35 bg-[#f7f7f5] p-8 text-center transition-all hover:border-black hover:bg-white"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}>
          <p className="text-lg font-semibold">Add photographs</p>
          <p className="mt-2 text-xs uppercase tracking-[0.15em] text-black/45">
            Drag files here or browse
          </p>
          {IMAGE_SIZE_RESTRICTION_ENABLED && (
            <p className="mt-2 text-xs text-black/45">{`Maximum ${bytesToMegabytes(
              MAX_SIZE_BYTES
            )}MB per file`}</p>
          )}

          <img
            src="/assets/icons/upload.svg"
            className="mt-6 w-8 opacity-70"
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
            <div
              className="flex h-full min-h-[260px] flex-col items-center justify-center px-8 text-center"
              role="status"
              aria-live="polite">
              <div className="relative mb-7 h-14 w-14">
                <div className="absolute inset-0 rounded-full border border-black/15" />
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-black" />
                <div className="absolute inset-[18px] bg-black" />
              </div>
              <p className="eyebrow">Preparing upload</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                Preparing {files.length} {files.length === 1 ? "photo" : "photos"}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-black/45">
                Reading image details and creating previews. This should only
                take a moment.
              </p>
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
