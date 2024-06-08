"use client";
import { parseDate, METERING_MODES, EXPOSURE_MODES } from "@utils/helpers";
import { useState } from "react";
import MetaDataItem from "./MetaDataItem";
const ExpandedPhotoInfo = ({ photo }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [anchorInfo, setAnchorInfo] = useState(false);
  const meteringMode = METERING_MODES.find(
    (mode) => mode.value === photo.meteringMode
  );
  const exposureMode = EXPOSURE_MODES.find(
    (mode) => mode.value === photo.exposureMode
  );

  function handleClick() {
    // Remain open if clicked
    setAnchorInfo((prev) => !prev);
    if (!anchorInfo) {
      setShowInfo(false);
    }
  }

  const DIVIDER = (
    <div className="col-span-2 bg-gray-500 h-[1px] w-full my-1"></div>
  );
  return (
    <div className="flex flex-col items-end p-2 text-xs text-white">
      <img
        src="/assets/icons/info.svg"
        alt="info"
        className="block w-7 opacity-50 p-1 hover:opacity-100 cursor-pointer"
        onMouseOver={() => {
          setShowInfo(true);
        }}
        onMouseOut={() => {
          setShowInfo(false);
        }}
        onClick={handleClick}
      />

      <div
        className={`max-h-[400px] max-w-[310px] overflow-auto grid grid-cols-2 gap-2 bg-black p-3 rounded opacity-0 ${
          (showInfo || anchorInfo) &&
          "opacity-90 transition-opacity ease-in duration-200"
        }`}>
        {photo.date && (
          <div className="col-span-2 text-sm">{parseDate(photo.date)}</div>
        )}
        {photo.description && (
          <div className="col-span-2">
            <MetaDataItem label="Description" value={photo.description} />
          </div>
        )}

        {DIVIDER}

        <MetaDataItem
          label="Aperture"
          value={photo.aperture}
          icon="aperture.svg"
          invertIcon
        />
        <MetaDataItem
          label="Focal Length"
          value={photo.aperture}
          icon="focal-length.svg"
          invertIcon
        />
        <MetaDataItem
          label="Shutter Speed"
          value={photo.shutterspeed}
          icon="shutterspeed.svg"
          invertIcon
        />
        <div className="flex flex-row items-center gap-2">
          {meteringMode && (
            <img
              src={`/assets/icons/${meteringMode.icon}`}
              width={16}
              alt={meteringMode.label}
              className="invert"
            />
          )}
          <p>{meteringMode?.label ?? "Metering: -"}</p>
        </div>
        <MetaDataItem label="ISO" value={photo.iso} icon="iso.svg" invertIcon />
        <div className="flex flex-row gap-2 items-center">
          {exposureMode && exposureMode.icon}
          <p>{exposureMode?.label ?? "Exp. Mode: -"}</p>
        </div>

        {DIVIDER}

        <div className="col-span-2">
          <MetaDataItem
            label="Lens Model"
            value={photo.lensModel}
            icon="lens.svg"
            invertIcon
          />
        </div>
        <div className="col-span-2">
          <MetaDataItem
            label="Camera Model"
            value={photo.cameraModel}
            icon="camera.svg"
            invertIcon
          />
        </div>
        <div className="col-span-2">
          <MetaDataItem
            label="Editing Software"
            value={photo.editingSoftware}
            icon="lightroom.svg"
            invertIcon
          />
        </div>
      </div>
    </div>
  );
};

export default ExpandedPhotoInfo;
