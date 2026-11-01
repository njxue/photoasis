"use client";
import ExpandedPhotoInfo from "@app/(protected)/components/Cards/Photo/ExpandedPhotoInfo";
import LoadingSpinner from "@app/common/LoadingSpinner";
import { extractFileMetadata } from "@utils/imageUploadUtils";
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
} from "react";
import { toast } from "react-toastify";
const TrialDroppableFileInput = () => {
  type TrialPhoto = Awaited<ReturnType<typeof extractFileMetadata>> & {
    url: string;
  };
  const [photo, setPhoto] = useState<TrialPhoto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptedFileTypes = ["jpg", "jpeg", "png"];
  async function handleUpload(file: File) {
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
      console.error(err);
      toast.error("Photo not supported. Please try another photo");
    } finally {
      setIsLoading(false);
    }
  }

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) void handleUpload(file);
  }

  function handleDragOver(event: DragEvent<HTMLElement>) {
    event.preventDefault();
  }

  async function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) await handleUpload(file);
  }

  return (
    <section className="w-1/2 max-md:hidden h-[90%]">
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
              <h2 className="text-3xl font-bold m-3">Try Me!</h2>
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
            onClick={(event: MouseEvent<HTMLInputElement>) => {
              event.currentTarget.value = "";
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
            <div className="absolute bottom-4 left-1">
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
    </section>
  );
};

export default TrialDroppableFileInput;
