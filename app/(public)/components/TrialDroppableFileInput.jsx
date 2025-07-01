"use client";
import ExpandedPhotoInfo from "@app/(protected)/components/Cards/Photo/ExpandedPhotoInfo";
import LoadingSpinner from "@app/common/LoadingSpinner";
import { extractFileMetadata } from "@utils/imageUploadUtils";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
const TrialDroppableFileInput = () => {
  const [photo, setPhoto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const acceptedFileTypes = ["jpg", "jpeg", "png"];
  async function handleUpload(file) {
    if (!(file instanceof File)) return;
    try {
      setIsLoading(true);
      const mimeType = file.type.toLocaleLowerCase();
      if (
        !acceptedFileTypes.some(
          (acceptedType) =>
            `image/${acceptedType.toLocaleLowerCase()}` === mimeType
        )
      ) {
        toast.error("File extension not supported (supports jpg and png only)");
        return;
      }

      const processedFile = await extractFileMetadata(file);
      const url = URL.createObjectURL(file);
      setPhoto({ url, ...processedFile });
    } catch (err) {
      toast.error("Photo not supported. Please try another photo");
    } finally {
      setIsLoading(false);
    }
  }

  function handleClick() {
    inputRef.current && inputRef.current.click();
  }

  function handleChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    handleUpload(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  async function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleUpload(file);
  }

  return (
    <div className="w-1/2 max-md:hidden h-[90%]">
      {!photo ? (
        <div
          className="border border-dashed border-black h-full w-full rounded flex flex-col justify-center items-center opacity-50 text-center text-lg cursor-pointer hover:opacity-100 transition-all"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}>
          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              <p>Loading your image</p>
              <div className="w-10">
                <LoadingSpinner />
              </div>
            </div>
          ) : (
            <>
              <p className="text-3xl font-bold m-3">Try Me!</p>
              <p>Drag or click to upload a file (jpg or png only)</p>
              <img
                src="/assets/icons/upload.svg"
                className="w-[35px] mt-5"
                alt="uploadIcon"
              />
            </>
          )}

          <input
            type="file"
            name="_"
            className="hidden"
            ref={inputRef}
            onClick={(e) => {
              e.target.value = null;
            }}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div
          className="flex flex-col justify-center items-center gap-2 h-full animate-fadeIn"
          onDrop={handleDrop}
          onDragOver={handleDragOver}>
          <div className="relative max-h-full">
            <img
              src={photo.url}
              className="max-h-[80vh] w-full"
              alt={photo.name}
            />
            <div className="absolute -translate-y-[106%] left-1">
              <ExpandedPhotoInfo photo={photo} defaultShow readonly />
            </div>
          </div>

          <button
            onClick={() => setPhoto(null)}
            className="bg-zinc-900 rounded-sm py-1 text-white font-semibold w-20">
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default TrialDroppableFileInput;
