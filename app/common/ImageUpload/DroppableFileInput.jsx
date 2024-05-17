"use client";
import { useRef, useState } from "react";
import ImagePreviews from "@app/common/ImageUpload/ImagePreviews";
import compressAndReadFileExif from "@utils/compressAndReadFileExif";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";

const DroppableFileInput = ({ name, required }) => {
  const inputRef = useRef();
  const [images, setImages] = useState([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  function handleClick() {
    inputRef.current && inputRef.current.click();
  }

  function handleChange(e) {
    const fileList = e.target.files;
    handlePreview(fileList);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const fileList = e.dataTransfer.files;
    if (inputRef?.current) {
      inputRef.current.files = fileList;
    }
    handlePreview(fileList);
  }

  async function handlePreview(fileList) {
    try {
      setIsLoadingPreview(true);
      const previews = [];
      for (let i = 0; i < fileList.length; i++) {
        previews.push(compressAndReadFileExif(fileList[i]));
      }
      const compressedPreviews = await Promise.all(previews);

      setImages(compressedPreviews);
    } catch (err) {
      toast.error("Invalid image file");
      setImages([]);
    } finally {
      setIsLoadingPreview(false);
    }
  }

  return (
    <div className="flex flex-col h-full md:flex-row">
      <div
        className="border border-dashed border-black h-full w-full rounded flex flex-col justify-center items-center gap-5 opacity-50 text-center text-lg cursor-pointer p-3"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
        <p>Drag or click to upload files</p>
        <img src="/assets/icons/upload.svg" className="w-[35px]" />
        <input
          type="file"
          name={name}
          multiple
          className="hidden"
          ref={inputRef}
          onChange={handleChange}
          accept="image/*"
          required={required}
        />
      </div>
      {(images.length > 0 || isLoadingPreview) && (
        <div className="md:w-[300px] h-full">
          {isLoadingPreview ? (
            <div className="h-full flex flex-col justify-center items-center">
              <LoadingSpinner text="Preparing your photos..." />
            </div>
          ) : (
            <ImagePreviews images={images} setImages={setImages} />
          )}
        </div>
      )}
    </div>
  );
};

export default DroppableFileInput;
