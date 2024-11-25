"use client";
import { useEffect, useRef, useState } from "react";
import ImagePreviews from "@app/common/ImageUpload/ImagePreviews";
import compressAndReadFileExif from "@utils/compressAndReadFileExif";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import { useFormStatus } from "react-dom";

const DroppableFileInput = ({ name, required, onChange, files }) => {
  const inputRef = useRef();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const { pending } = useFormStatus();

  function handleClick() {
    inputRef.current && inputRef.current.click();
  }

  function handleChange(e) {
    const newFiles = Array.from(e.target.files);
    onChange(newFiles);
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
    onChange(newFiles);
  }

  async function handlePreview(fileList) {
    try {
      setIsLoadingPreview(true);
      const previews = [];
      for (let i = 0; i < fileList.length; i++) {
        previews.push(compressAndReadFileExif(fileList[i]));
      }
      const compressedPreviews = await Promise.all(previews);

      setImagePreviews(compressedPreviews);
    } catch (err) {
      toast.error("Invalid image file");
      setImagePreviews([]);
    } finally {
      setIsLoadingPreview(false);
    }
  }

  useEffect(() => {
    if (files) {
      handlePreview(files);
    }
  }, [files]);

  return (
    <div className="flex flex-col h-full md:flex-row">
      <div
        className="border border-dashed border-black h-full w-full rounded flex flex-col justify-center items-center gap-5 opacity-50 text-center text-lg cursor-pointer p-3"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
        <p>Drag or click to upload files</p>
        <img
          src="/assets/icons/upload.svg"
          className="w-[35px]"
          alt="uploadIcon"
        />
        <input
          type="file"
          name={name}
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
      {(imagePreviews.length > 0 || isLoadingPreview) && (
        <div className="w-full h-full">
          {isLoadingPreview ? (
            <div className="h-full flex flex-col justify-center items-center gap-5 text-gray-500 text-wrap text-center">
              <div className="w-8">
                <LoadingSpinner />
              </div>
              <p>Preparing your photos...</p>
            </div>
          ) : (
            <ImagePreviews
              images={imagePreviews}
              setImages={setImagePreviews}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DroppableFileInput;
