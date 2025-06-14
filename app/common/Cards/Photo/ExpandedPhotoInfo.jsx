"use client";
import { parseDate, METERING_MODES, EXPOSURE_MODES } from "@utils/helpers";
import { useState } from "react";
import MetaDataItem from "./MetaDataItem";
import UpdatePhotoForm from "./UpdatePhotoForm";
const ExpandedPhotoInfo = ({ photo }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [anchorInfo, setAnchorInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    <div className="relative text-xs flex flex-col items-start w-full">
      <div className="mb-10 sm:mb-6">
        {isEditing ? (
          <UpdatePhotoForm
            photo={photo}
            onCancel={(e) => {
              setIsEditing(false);
            }}
            onUpdate={() => setIsEditing(false)}
          />
        ) : (
          <div
            className={`text-white max-h-[400px] max-w-[310px] overflow-auto  bg-black p-3 rounded opacity-0 pointer-events-none  ${
              (showInfo || anchorInfo) &&
              "opacity-90 transition-opacity ease-in duration-200 pointer-events-auto"
            }`}>
            <div className="flex flex-row justify-between mb-2">
              <div>
                <div className="flex flex-row justify-between">
                  {photo.date && (
                    <div className="col-span-2 text-sm">
                      {parseDate(photo.date)}
                    </div>
                  )}
                </div>
                {photo.description && (
                  <p className="col-span-2 text-xs mt-1">{photo.description}</p>
                )}
              </div>
              <img
                src="/assets/icons/pen-square.svg"
                className="invert w-5 h-fit opacity-30 hover:opacity-100 hover:cursor-pointer transition-opacity"
                onClick={(e) => {
                  setIsEditing(true);
                }}
              />
            </div>

            {DIVIDER}

            <div className="mt-3 grid grid-cols-2 gap-2">
              <MetaDataItem
                label="Aperture"
                value={photo.aperture}
                icon="aperture.svg"
                invertIcon
              />
              <MetaDataItem
                label="Focal Length"
                value={photo.focalLength}
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
              <MetaDataItem
                label="ISO"
                value={photo.iso}
                icon="iso.svg"
                invertIcon
              />
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
        )}
      </div>

      <img
        src="/assets/icons/info-white.svg"
        alt="info"
        className="absolute bottom-0 translate-y-1/2 w-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        onMouseOver={() => {
          setShowInfo(true);
        }}
        onMouseOut={() => {
          setShowInfo(false);
        }}
        onClick={handleClick}
      />
    </div>
  );
};

export default ExpandedPhotoInfo;
