"use client";
import FancyInput from "../FancyInput";
import MeteringInput from "./InputFields/MeteringMode/MeteringModeInput";
import { useState } from "react";
const PhotoSettingsInputs = ({ photo }) => {
  const rowStyle = "flex flex-rows items-center justify-around gap-2";
  const [meteringMode, setMeteringMode] = useState(photo.meteringMode);

  return (
    <div className="text-xs px-1">
      <p className="mb-2 line-clamp-1 text-sm text-start">{photo.name}</p>
      <div className="flex flex-row gap-1">
        <div className="w-1/2 flex flex-col gap-2">
          <div className={rowStyle}>
            <label>
              <img src="/assets/icons/aperture-black.svg" width={20} />
            </label>
            <FancyInput
              type="number"
              name="aperture"
              step={0.1}
              min={0}
              defaultValue={photo.aperture}
              label="Aperture"
            />
          </div>
          <div className={rowStyle}>
            <label>
              <img src="/assets/icons/shutterspeed-black.svg" width={20} />
            </label>
            <FancyInput
              type="text"
              label="Shutter Speed"
              defaultValue={photo.shutterspeed}
              name="shutterspeed"
            />
          </div>
          <div className={rowStyle}>
            <label>
              <img src="/assets/icons/iso-black.svg" width={20} />
            </label>
            <FancyInput
              type="number"
              name="iso"
              min={0}
              defaultValue={photo.iso}
              label="ISO"
            />
          </div>

          {/** <div className={rowStyle}>
            <label>
              <img src="/assets/icons/calendar.svg" width={20} />
            </label>
            <input
              className="input w-full"
              type="date"
              name="date"
              defaultValue={photo.date}
            />
          </div>*/}
        </div>

        <div className="w-1/2 flex flex-col gap-2">
          <div className={rowStyle}>
            <label>
              <img src="/assets/icons/focal-length.svg" width={20} />
            </label>
            <FancyInput
              type="number"
              name="focalLength"
              min={0}
              label="Focal Length"
              defaultValue={photo.focalLength}
            />
          </div>

          <MeteringInput
            meteringMode={meteringMode}
            setMeteringMode={setMeteringMode}
          />

          <div className={rowStyle}>
            <label>
              <img src="/assets/icons/shutterspeed-black.svg" width={20} />
            </label>
            <FancyInput
              type="text"
              name="exposureMode"
              defaultValue={photo.exposureMode}
              label="Exposure Mode"
            />
          </div>
          {/** <div className={rowStyle}>
            <label>
              <img src="/assets/icons/iso-black.svg" width={20} />
            </label>
            <FancyInput
              type="text"
              name="software"
              defaultValue={photo.editingSoftware}
              label="Editing Software"
            />
          </div>*/}
          {/** <div className={rowStyle}>
            <label>
              <img src="/assets/icons/pen-square.svg" width={20} />
            </label>
            <FancyInput
              type="text"
              name="cameraModel"
              defaultValue={photo.cameraModel}
              label="Camera Model"
            />
          </div>*/}

          {/** <div className={rowStyle}>
            <label>
              <img src="/assets/icons/calendar.svg" width={20} />
            </label>
            <FancyInput
              type="text"
              name="lensModel"
              defaultValue={photo.lensModel}
              label="Lens Model"
            />
          </div>*/}
        </div>
      </div>
      {/** <FancyInput type="textarea" name="description" label="Description" />*/}
    </div>
  );
};

export default PhotoSettingsInputs;
