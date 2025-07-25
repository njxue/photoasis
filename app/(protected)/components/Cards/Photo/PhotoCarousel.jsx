import { useEffect, useCallback, useState, useRef } from "react";
import Modal from "@app/(protected)/components/Modal/Modal";
import DownloadPhoto from "./DownloadPhoto";
import ExpandedPhotoInfo from "./ExpandedPhotoInfo";
import OptimisedImage from "@app/common/Image/OptimisedImage";
import { QUALITY_MID } from "@app/common/Image/constants";

const PhotoCarousel = ({ photos, defaultIndex, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex ?? 0);
  const photoRef = useRef();

  const photo = photos[selectedIndex];

  const arrowStyles =
    "max-sm:hidden cursor-pointer transition-opacity w-[20px] sm:w-[30px] opacity-50 hover:opacity-100";
  const navigatorStyles =
    "max-sm:grow sm:w-[42px] flex cursor-pointer h-full hover:bg-black hover:opacity-50 items-center transition-all duration-50 select-none";
  const topAndBottomBorderStyles =
    "flex flex-row justify-between items-center w-full bg-black opacity-90 px-2 h-[60px]";

  const handleNextImage = useCallback(() => {
    if (selectedIndex === photos.length - 1) {
      return;
    }
    setSelectedIndex((prev) => prev + 1);
  }, [selectedIndex, photos.length]);

  const handlePreviousImage = useCallback(() => {
    if (selectedIndex === 0) {
      return;
    }
    setSelectedIndex((prev) => prev - 1);
  }, [selectedIndex]);

  useEffect(() => {
    function handleKeyDown(e) {
      switch (e.code) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          handleNextImage();
          break;
        case "ArrowLeft":
          handlePreviousImage();
          break;
        default:
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleNextImage, handlePreviousImage, onClose]);

  const handleClickPhotoContainer = (e) => {
    if (!photoRef.current?.contains(e.target)) {
      onClose();
    }
  };

  return (
    <Modal isOpen={true} className="bg-transparent">
      <section className="carousel flex flex-col w-screen h-screen">
        {/** Top bar */}
        <div className={topAndBottomBorderStyles}>
          <div className="flex flex-row gap-1 items-center">
            <DownloadPhoto photo={photo} />
          </div>
          <button className="invert opacity-50 hover:opacity-100 transition-opacity w-6">
            <img
              src="/assets/icons/cross.svg"
              alt="close carousel"
              onClick={onClose}
            />
          </button>
        </div>

        {/** Photo */}
        <div className="flex items-center justify-between bg-black bg-opacity-75 grow">
          <div
            className={`${navigatorStyles} justify-start ${
              !selectedIndex && "pointer-events-none"
            }`}
            onClick={handlePreviousImage}>
            {selectedIndex > 0 && (
              <img
                src="/assets/icons/arrow-left.svg"
                className={`${arrowStyles} ml-2`}
                onContextMenu={(e) => e.preventDefault()}
              />
            )}
          </div>

          <div
            className="flex items-center justify-center h-full sm:w-full"
            onClick={handleClickPhotoContainer}>
            <div
              className="flex items-center justify-center h-full py-2 max-h-[80vh] max-w-[80vw] select-none"
              ref={photoRef}>
              <OptimisedImage
                key={photo.url}
                src={photo.url}
                name={photo.name}
                quality={QUALITY_MID}
                priority
                showLoader
                objectFit="object-contain"
                sizes="100vw"
                withLens
              />
            </div>
          </div>

          <div
            className={`${navigatorStyles} justify-end ${
              selectedIndex === photos.length - 1 && "pointer-events-none"
            }`}
            onClick={handleNextImage}>
            {selectedIndex < photos.length - 1 && (
              <img
                src="/assets/icons/arrow-right.svg"
                className={`${arrowStyles} mr-2`}
                onContextMenu={(e) => e.preventDefault()}
              />
            )}
          </div>
        </div>

        {/** Bottom bar */}
        <div className={`${topAndBottomBorderStyles} relative`}>
          <div className="absolute top-1/2 -translate-y-full left-2">
            <ExpandedPhotoInfo photo={photo} />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-200 line-clamp-2 text-center select-all">
            <h1>{photo.description}</h1>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default PhotoCarousel;
