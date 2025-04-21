"use client";
import PhotoSettingsInputs from "./PhotoSettingsInputs";
import OptimisedImage from "../Image/OptimisedImage";
import { QUALITY_LOW } from "../Image/constants";
import { useFormStatus } from "react-dom";
import { useImageUploadContext } from "./ImageUploadContext";

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
            <div className="relative h-[90px]" key={file.id}>
              <input name="blurhash" value={file.blurhash} hidden />
              <div
                className={`${
                  selectedFile.fileData.id === file.id &&
                  "border-2 border-black"
                } h-full`}>
                <OptimisedImage
                  className={`${
                    selectedFile.fileData.id === file.id && "opacity-30"
                  } h-full w-full`}
                  src={file.url}
                  onClick={() => {
                    handleClickImagePreview(file.id);
                  }}
                  name={file.name}
                  id={file.id}
                  quality={QUALITY_LOW}
                  hover
                />
              </div>

              {!pending && (
                <div className="bg-black absolute right-0 top-0 cursor-pointer opacity-0 hover:opacity-70">
                  <img
                    src="/assets/icons/cross.svg"
                    alt="Remove"
                    width={16}
                    onClick={(e) => {
                      // Stops modal from closing once the image (and this img tag) is removed from the DOM
                      e.stopPropagation();
                      handleRemoveFile(file.id);
                    }}
                    className="invert"
                  />
                </div>
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
