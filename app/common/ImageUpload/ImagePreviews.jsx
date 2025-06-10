"use client";
import PhotoSettingsInputs from "./PhotoSettingsInputs";
import { QUALITY_LOW } from "../Image/constants";
import { useFormStatus } from "react-dom";
import { useImageUploadContext } from "./ImageUploadContext";
import {
  MAX_SIZE_BYTES,
  IMAGE_SIZE_RESTRICTION_ENABLED,
} from "@app/configs/imageConfigs";

const ImagePreviews = () => {
  const { pending } = useFormStatus();

  const { handleClickImagePreview, handleRemoveFile, selectedFile, files } =
    useImageUploadContext();
  const fileData = files.map((f) => f.fileData);

  return (
    <div className="flex flex-col py-3 md:py-0 md:px-1 h-full">
      <div className="relative min-h-[90px] overflow-auto grow">
        <div className="absolute top-0 left-0 w-full grid gap-1 grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5">
          {fileData?.map((file) => (
            <div
              className="relative h-[90px] cursor-pointer hover:opacity-50 transition-opacity ease-in-out duration-50"
              key={file.id}
              onClick={() => {
                handleClickImagePreview(file.id);
              }}>
              <input name="blurhash" value={file.blurhash} hidden />
              <div
                className={`${
                  selectedFile.fileData.id === file.id &&
                  "border-2 border-black"
                } h-full`}>
                <img
                  className={`${
                    selectedFile.fileData.id === file.id && "opacity-30"
                  } h-full w-full ${
                    IMAGE_SIZE_RESTRICTION_ENABLED &&
                    file.size > MAX_SIZE_BYTES &&
                    "opacity-20"
                  }`}
                  src={file.url}
                  name={file.name}
                  id={file.id}
                  quality={QUALITY_LOW}
                />
              </div>

              {!pending && (
                <div className="bg-black absolute right-0 top-0 cursor-pointer opacity-0 hover:opacity-70">
                  <img
                    src="/assets/icons/cross.svg"
                    alt="Remove"
                    width={16}
                    onClick={(e) => {
                      handleRemoveFile(file.id);
                    }}
                    className="invert"
                  />
                </div>
              )}
              {IMAGE_SIZE_RESTRICTION_ENABLED && file.size > MAX_SIZE_BYTES && (
                <img
                  src={"/assets/icons/warning.svg"}
                  className="absolute bottom-1 right-1 w-6"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="min-h-[150px] mt-6">
        {selectedFile && (
          <PhotoSettingsInputs
            fileData={selectedFile.fileData}
            key={selectedFile.fileData.id}
          />
        )}
      </div>
    </div>
  );
};

export default ImagePreviews;
