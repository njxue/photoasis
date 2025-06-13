import { useState } from "react";
import ExpandedPhoto from "./ExpandedPhoto";
import Modal from "@app/common/Modal/Modal";
import DownloadPhoto from "./DownloadPhoto";

const PhotoCarousel = ({ photos, defaultIndex, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex ?? 0);

  const photo = photos[selectedIndex];

  const arrowStyles =
    "max-sm:hidden cursor-pointer transition-opacity w-[20px] sm:w-[30px] opacity-50 hover:opacity-100";
  const navigatorStyles =
    "max-sm:grow sm:w-[42px] flex cursor-pointer h-full hover:bg-black hover:opacity-50 items-center transition-all duration-50";
  const topAndBottomBorderStyles =
    "flex flex-row justify-between items-center w-full bg-black opacity-90 h-[36px] px-2";

  return (
    <Modal isOpen={true} className="bg-transparent">
      <div className="flex flex-col w-screen h-screen">
        {/** Top bar */}
        <div className={topAndBottomBorderStyles}>
          <div className="flex flex-row gap-1 items-center">
            <DownloadPhoto photo={photo} />
          </div>
          <img
            src="/assets/icons/cross.svg"
            className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity w-6 invert"
            onClick={onClose}
          />
        </div>

        {/** Photo */}
        <div className="flex items-center justify-between bg-black bg-opacity-75 grow min-h-0">
          <div
            className={`${navigatorStyles} justify-start ${
              !selectedIndex && "pointer-events-none"
            }`}
            onClick={() => {
              setSelectedIndex((prev) => prev - 1);
            }}>
            {selectedIndex > 0 && (
              <img
                src="/assets/icons/arrow-left.svg"
                className={`${arrowStyles} ml-2`}
                onContextMenu={(e) => e.preventDefault()}
              />
            )}
          </div>
          <div className="flex items-center justify-center h-[calc(100vh-90px)]">
            <ExpandedPhoto photo={photo} />
          </div>
          <div
            className={`${navigatorStyles} justify-end ${
              selectedIndex === photos.length - 1 && "pointer-events-none"
            }`}
            onClick={() => {
              setSelectedIndex((prev) => prev + 1);
            }}>
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
        <div className={topAndBottomBorderStyles}>
          <div className="text-xs text-gray-200 line-clamp-1 text-center flex-1">
            {photo.description}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PhotoCarousel;
