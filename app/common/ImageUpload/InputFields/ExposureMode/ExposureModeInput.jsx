import ExposureMode from "./ExposureMode";
import { useState } from "react";
import { EXPOSURE_MODES } from "@utils/helpers";
import { FORM_FIELDS } from "@utils/imageUploadUtils";
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
        name={FORM_FIELDS.EXPOSURE_MODE.name}
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

export default ExposureModeInput;
