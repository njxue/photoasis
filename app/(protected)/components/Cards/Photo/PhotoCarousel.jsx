import { useEffect, useCallback, useState, useRef } from "react";
import Modal from "@app/(protected)/components/Modal/Modal";
import DownloadPhoto from "./DownloadPhoto";
import ExpandedPhotoInfo from "./ExpandedPhotoInfo";
import CustomImage from "@app/common/Image/CustomImage";

const PhotoCarousel = ({
  photos,
  defaultIndex,
  onClose,
  hasMore = false,
  loadNextPage,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex ?? 0);
  const photoRef = useRef();

  const photo = photos[selectedIndex];

  const arrowStyles =
    "h-5 w-5 invert sm:h-6 sm:w-6";
  const navigatorStyles =
    "mx-2 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black/55 shadow-lg transition hover:bg-black/75 active:scale-95 disabled:invisible sm:mx-4 sm:h-12 sm:w-12";
  const topAndBottomBorderStyles =
    "flex h-14 w-full shrink-0 flex-row items-center justify-between bg-black px-3 sm:h-16 sm:px-4";

  const handleNextImage = useCallback(async () => {
    if (selectedIndex < photos.length - 1) {
      setSelectedIndex((prev) => prev + 1);
      return;
    }

    if (!hasMore || !loadNextPage) return;

    const loaded = await loadNextPage();
    if (loaded) {
      setSelectedIndex((prev) => prev + 1);
    }
  }, [hasMore, loadNextPage, photos.length, selectedIndex]);

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
          void handleNextImage();
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
    <Modal
      isOpen={true}
      className="!bg-transparent backdrop:!bg-transparent">
      <section className="carousel flex h-[100dvh] w-screen flex-col">
        {/** Top bar */}
        <div className={topAndBottomBorderStyles}>
          <div className="flex flex-row gap-1 items-center">
            <DownloadPhoto photo={photo} />
          </div>
          <button
            type="button"
            aria-label="Close carousel"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 p-3 opacity-80 transition hover:bg-white/10 hover:opacity-100 active:scale-95 sm:h-10 sm:w-10 sm:p-2.5"
            onClick={onClose}>
            <img
              src="/assets/icons/cross.svg"
              alt=""
              className="h-full w-full invert"
            />
          </button>
        </div>

        {/** Photo */}
        <div className="flex min-h-0 grow items-center bg-black/80 backdrop-blur-[1px]">
          <button
            type="button"
            aria-label="Previous photo"
            disabled={selectedIndex === 0}
            className={navigatorStyles}
            onClick={handlePreviousImage}>
            <img
              src="/assets/icons/arrow-left.svg"
              alt=""
              className={arrowStyles}
              onContextMenu={(e) => e.preventDefault()}
            />
          </button>

          <div
            className="flex h-full min-w-0 flex-1 items-center justify-center"
            onClick={handleClickPhotoContainer}>
            <div
              className="flex h-full w-full min-w-0 select-none items-center justify-center py-2 sm:py-3"
              ref={photoRef}>
              <CustomImage
                key={photo.url}
                src={photo.url}
                name={photo.name}
                unoptimized
                priority
                showLoader
                objectFit="object-contain"
                withLens
              />
            </div>
          </div>

          <button
            type="button"
            aria-label="Next photo"
            disabled={
              selectedIndex === photos.length - 1 &&
              (!hasMore || !loadNextPage)
            }
            className={navigatorStyles}
            onClick={handleNextImage}>
            <img
              src="/assets/icons/arrow-right.svg"
              alt=""
              className={arrowStyles}
              onContextMenu={(e) => e.preventDefault()}
            />
          </button>
        </div>

        {/** Bottom bar */}
        <div className={`${topAndBottomBorderStyles} relative`}>
          <div className="absolute left-3 top-1/2 -translate-y-full sm:left-4">
            <ExpandedPhotoInfo photo={photo} />
          </div>

          <div className="absolute left-1/2 max-w-[52vw] -translate-x-1/2 select-all text-center text-[11px] text-gray-200 line-clamp-2 sm:max-w-[60vw] sm:text-xs">
            <h1>{photo.description}</h1>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default PhotoCarousel;
