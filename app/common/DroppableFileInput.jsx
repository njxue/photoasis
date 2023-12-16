"use client";
import { useRef, useState } from "react";
import ImagePreviews from "@app/components/ImagePreviews";
import readFileExif from "@utils/readFileExif";

const DroppableFileInput = ({ name, disabled }) => {
  const inputRef = useRef();
  const [images, setImages] = useState([]);

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
    const previews = [];
    for (let i = 0; i < fileList.length; i++) {
      previews.push(await readFileExif(fileList[i]));
    }
    setImages(previews);
  }

  return (
    <div className="flex flex-col h-full md:flex-row">
      <div
        className="border border-dashed border-black h-full w-full rounded flex flex-col justify-center items-center gap-5 opacity-50 text-center text-lg cursor-pointer"
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
          disabled={disabled}
        />
      </div>
      {images.length > 0 && (
        <div className="md:w-1/5 h-full">
          <ImagePreviews images={images} withForm />
        </div>
      )}
    </div>
  );
};

export default DroppableFileInput;
