import ExposureMode from "./ExposureMode";
import { useState } from "react";
function ExposureModeInput({ defaultValue }) {
  const [exposureMode, setExposureMode] = useState(defaultValue);
  function handleClick(mode) {
    if (exposureMode === mode) {
      setExposureMode(null);
    } else {
      setExposureMode(mode);
    }
  }
  return (
    <>
      <input
        type="text"
        name="exposureMode"
        className="hidden"
        value={exposureMode}
      />
      <div className="flex flex-col justify-center w-full text-center">
        <div className="flex flex-row justify-around">
          {EXPOSURE_MODES.map((mode) => (
            <ExposureMode
              label={mode.label}
              icon={mode.icon}
              handleClick={() => handleClick(mode.value)}
              isSelected={exposureMode == mode.value}
            />
          ))}
        </div>
      </div>
    </>
  );
}

const EXPOSURE_MODES = [
  {
    label: "Program",
    value: "Normal program",
    icon: "P",
  },
  {
    label: "Aperture Priority",
    value: "Aperture priority",
    icon: "A/Av",
  },
  {
    label: "Shutter Priority",
    value: "Shutter priority",
    icon: "S/Tv",
  },
  {
    label: "Manual",
    value: "Manual",
    icon: "M",
  },
  {
    label: "Auto",
    value: "FullAuto",
    icon: "Auto",
  },
];
export default ExposureModeInput;
