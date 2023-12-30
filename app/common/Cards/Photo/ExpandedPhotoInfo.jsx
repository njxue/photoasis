"use client";
import { parseDate } from "@utils/helpers";
import { useState } from "react";
const ExpandedPhotoInfo = ({ photo }) => {
  const iconsWidth = 16;
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="flex flex-col items-end p-2 max-w-[250px]">
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
        <div className="flex flex-col items-start bg-black text-white p-3 opacity-70 rounded text-sm max-w-full">
          {/* <div>{photo.name}</div> */}
          <p className="mb-1 text-ellipsis overflow-hidden max-w-full">
            {photo.description}
          </p>
          <p>{parseDate(photo.date)}</p>
          <hr className="border border-solid border-gray-800 w-full my-2" />
          <div className="flex flex-col justify-start items-start text-xs gap-1">
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <img src="/assets/icons/aperture-white.svg" width={iconsWidth} />
              <div>{photo.aperture === "" ? "-" : photo.aperture}</div>
            </div>
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <img
                src="/assets/icons/shutterspeed-white.svg"
                width={iconsWidth}
              />
              <div>{photo.shutterspeed === "" ? "-" : photo.shutterspeed}</div>
            </div>
            <div className="flex flex-row items-center gap-2 flex-wrap justify-center">
              <img src="/assets/icons/iso-white.svg" width={iconsWidth} />
              <div>
                <div>{photo.iso === "" ? "-" : photo.iso}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandedPhotoInfo;
