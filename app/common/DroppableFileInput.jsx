"use client";
import { useRef, useState } from "react";
import ImagePreviews from "@app/components/ImagePreviews";
import readFileExif from "@utils/readFileExif";

const DroppableFileInput = ({ name }) => {
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
    <>
      <div
        className="border border-dashed border-gray-500 h-full w-full rounded"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
        <input
          type="file"
          name={name}
          multiple
          className="hidden"
          ref={inputRef}
          onChange={handleChange}
          accept="image/*"
        />
      </div>
      <ImagePreviews images={images} withForm />
    </>
  );
};

export default DroppableFileInput;
