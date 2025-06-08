import { useState } from "react";
import ExpandedPhoto from "./ExpandedPhoto";
import Modal from "@app/common/Modal/Modal";

const PhotoCarousel = ({ photos, defaultIndex, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex ?? 0);

  const photo = photos[selectedIndex];

  const sideWidths = "w-[20px] sm:w-[30px]";
  const arrowStyles = `opacity-30 cursor-pointer hover:opacity-75 transition-opacity ${sideWidths}`;

  const renderLeftArrow = () =>
    selectedIndex > 0 ? (
      <img
        src="/assets/icons/arrow-left.svg"
        className={arrowStyles}
        onContextMenu={(e) => e.preventDefault()}
        onClick={() => {
          setSelectedIndex((prev) => prev - 1);
        }}
      />
    ) : (
      <div className={sideWidths}></div>
    );

  const renderRightArrow = () =>
    selectedIndex < photos.length - 1 ? (
      <img
        src="/assets/icons/arrow-right.svg"
        className={arrowStyles}
        onContextMenu={(e) => e.preventDefault()}
        onClick={() => {
          setSelectedIndex((prev) => prev + 1);
        }}
      />
    ) : (
      <div className={sideWidths}></div>
    );

  return (
    <Modal isOpen={true} className="bg-transparent">
      <div className="flex flex-row items-center justify-center gap-3 w-[85vw]">
        <div className="max-xs:hidden">{renderLeftArrow()}</div>
        <ExpandedPhoto photo={photo} onClose={onClose} priority />
        <div className="max-xs:hidden">{renderRightArrow()}</div>
      </div>
      <div className="mt-3 w-full flex flex-row justify-between items-center gap-3 ">
        <div className="xs:hidden">{renderLeftArrow()}</div>
        <div className="text-xs text-gray-800 line-clamp-1 text-center flex-1">
          {photo.description}
        </div>
        <div className="xs:hidden">{renderRightArrow()}</div>
      </div>
    </Modal>
  );
};

export default PhotoCarousel;
