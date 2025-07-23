import ExposureMode from "./ExposureMode";
import { useState } from "react";
import { EXPOSURE_MODES } from "@utils/helpers";
import { FORM_FIELDS } from "@utils/imageUploadUtils";
function ExposureModeInput({ fileData }) {
  const [exposureMode, setExposureMode] = useState(
    fileData[FORM_FIELDS.EXPOSURE_MODE.name]
  );

  function handleClick(mode) {
    if (exposureMode === mode) {
      setExposureMode(null);
      fileData[FORM_FIELDS.EXPOSURE_MODE.name] = null;
    } else {
      setExposureMode(mode);
      fileData[FORM_FIELDS.EXPOSURE_MODE.name] = mode;
    }
  }
  return (
    <fieldset name="exposureMode">
      <input
        type="text"
        name={FORM_FIELDS.EXPOSURE_MODE.name}
        className="hidden"
        defaultValue={exposureMode}
      />
      <div className="flex flex-col justify-center w-full text-center">
        <div className="flex flex-row justify-around">
          {EXPOSURE_MODES.map((mode) => (
            <ExposureMode
              key={mode.value}
              label={mode.label}
              icon={mode.icon}
              handleClick={() => handleClick(mode.value)}
              isSelected={exposureMode == mode.value}
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
}

export default ExposureModeInput;
