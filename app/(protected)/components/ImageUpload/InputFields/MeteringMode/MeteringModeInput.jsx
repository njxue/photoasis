import MeteringMode from "./MeteringMode";
import { useState } from "react";
import { METERING_MODES } from "@utils/helpers";
import { FORM_FIELDS } from "@utils/imageUploadUtils";

function MeteringInput({ fileData }) {
  const [meteringMode, setMeteringMode] = useState(
    fileData[FORM_FIELDS.METERING_MODE.name]
  );

  function handleClick(mode) {
    if (meteringMode === mode) {
      setMeteringMode(null);
      fileData[FORM_FIELDS.METERING_MODE.name] = null;
    } else {
      setMeteringMode(mode);
      fileData[FORM_FIELDS.METERING_MODE.name] = mode;
    }
  }
  return (
    <fieldset name="meteringMode">
      <input
        type="text"
        name={FORM_FIELDS.METERING_MODE.name}
        className="hidden"
        defaultValue={meteringMode}
      />
      <div className="flex flex-col justify-center w-full text-center">
        <div className="flex flex-row justify-around">
          {METERING_MODES.map((mode) => (
            <MeteringMode
              key={mode.value}
              label={mode.label}
              value={mode.value}
              icon={`/assets/icons/${mode.icon}`}
              handleClick={() => handleClick(mode.value)}
              isSelected={meteringMode == mode.value}
            />
          ))}
        </div>
      </div>
    </fieldset>
  );
}

export default MeteringInput;
