"use client";
import { useState } from "react";
import ExposureInputs from "./InputFields/ExposureInputs";
import BuildInputs from "./InputFields/BuildInputs";
const PhotoSettingsInputs = ({ photo }) => {
  const EXPOSURE_TAB = "Exposure";
  const BUILD_TAB = "Build";
  const [tab, setTab] = useState(EXPOSURE_TAB);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="text-xs px-1">
        <div hidden={tab !== EXPOSURE_TAB}>
          <ExposureInputs photo={photo} />
        </div>
        <div hidden={tab !== BUILD_TAB}>
          <BuildInputs photo={photo} />
        </div>
      </div>
      <div className="flex flex-row mt-2 items-center justify-between text-[10px]">
        <div className="flex flex-row gap-2">
          <img
            src="/assets/icons/sun.svg"
            width={20}
            onClick={() => setTab(EXPOSURE_TAB)}
            className={`${tab !== EXPOSURE_TAB && "opacity-20"} cursor-pointer`}
          />
          <img
            src="/assets/icons/camera.svg"
            width={20}
            onClick={() => setTab(BUILD_TAB)}
            className={`${tab !== BUILD_TAB && "opacity-20"} cursor-pointer`}
          />
        </div>
        <div className="flex justify-end items-center basis-2/3 text-wrap">
          <p className="">{photo.name}</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoSettingsInputs;
