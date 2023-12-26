"use client";
import { useState } from "react";
const ExpandedPhotoInfo = ({ photo }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="flex flex-col items-end p-2">
      <img
        src="/assets/icons/info.svg"
        className="block w-7 opacity-50 p-1 hover:opacity-100 cursor-pointer"
        onMouseOver={() => {
          setShowInfo(true);
        }}
        onMouseOut={() => {
          setShowInfo(false);
        }}
      />
      {showInfo && (
        <div className="flex flex-col items-start bg-black text-white p-3 opacity-70 rounded">
          <div className="mb-2">{photo.name}</div>
          <div className="flex flex-row items-center gap-2 flex-wrap">
            <img src="/assets/icons/aperture-white.svg" width={20} />
            <div>{photo.aperture === "" ? "-" : photo.aperture}</div>
          </div>
          <div className="flex flex-row items-center gap-2 flex-wrap">
            <img src="/assets/icons/shutterspeed-white.svg" width={20} />
            <div>{photo.shutterspeed === "" ? "-" : photo.shutterspeed}</div>
          </div>
          <div className="flex flex-row items-center gap-2 flex-wrap justify-center">
            <img src="/assets/icons/iso-white.svg" width={20} />
            <div>
              <div>{photo.iso === "" ? "-" : photo.iso}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandedPhotoInfo;
