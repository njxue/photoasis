import MeteringMode from "./MeteringMode";
import { useState } from "react";
import { METERING_MODES } from "@utils/helpers";
import { FORM_FIELDS } from "@utils/imageUploadUtils";

function MeteringInput({ defaultValue }) {
  const [meteringMode, setMeteringMode] = useState(defaultValue);
  function handleClick(mode) {
    if (meteringMode === mode) {
      setMeteringMode(null);
    } else {
      setMeteringMode(mode);
    }
  }
  return (
    <>
      <input
        type="text"
        name={FORM_FIELDS.METERING_MODE.name}
        className="hidden"
        value={meteringMode}
      />
      <div className="flex flex-col justify-center w-full text-center">
        <div className="flex flex-row justify-around">
          {METERING_MODES.map((mode) => (
            <MeteringMode
              label={mode.label}
              value={mode.value}
              icon={`/assets/icons/${mode.icon}`}
              handleClick={() => handleClick(mode.value)}
              isSelected={meteringMode == mode.value}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MeteringInput;
