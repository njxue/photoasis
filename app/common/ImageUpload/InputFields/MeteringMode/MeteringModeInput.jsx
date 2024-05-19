import MeteringMode from "./MeteringMode";
import { useState } from "react";

function MeteringInput({ defaultValue}) {
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
        name="meteringMode"
        className="hidden"
        value={meteringMode}
      />
      <div className="flex flex-col justify-center w-full text-center">
        <div className="flex flex-row justify-around">
          {METERING_MODES.map((mode) => (
            <MeteringMode
              label={mode.label}
              value={mode.value}
              icon={mode.icon}
              handleClick={() => handleClick(mode.value)}
              isSelected={meteringMode == mode.value}
            />
          ))}
        </div>
      </div>
    </>
  );
}

const METERING_MODES = [
  {
    label: "Matrix",
    value: "Pattern",
    icon: "/assets/icons/matrix-metering.svg",
  },
  {
    label: "Partial",
    value: "Partial",
    icon: "/assets/icons/partial-metering.svg",
  },
  {
    label: "Spot",
    value: "Spot",
    icon: "/assets/icons/Spot-metering.svg",
  },
  {
    label: "Center Weighted",
    value: "CenterWeightedAverage",
    icon: "/assets/icons/cwa-metering.svg",
  },
];
export default MeteringInput;
