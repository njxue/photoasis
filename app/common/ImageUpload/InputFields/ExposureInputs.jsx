import FancyInput from "@app/common/FancyInput";
import MeteringInput from "./MeteringMode/MeteringModeInput";
import ExposureModeInput from "./ExposureMode/ExposureModeInput";

function ExposureInputs({ photo }) {
  const rowStyle = "flex flex-rows items-center justify-around gap-2";
  const colStyle = "w-1/2 flex flex-col gap-2";

  return (
    <div className="flex flex-row gap-3">
      <div className={colStyle}>
        <div className={rowStyle}>
          <label>
            <img src="/assets/icons/aperture.svg" width={20} />
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
            <img src="/assets/icons/shutterspeed.svg" width={20} />
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
            <img src="/assets/icons/iso.svg" width={20} />
          </label>
          <FancyInput
            type="number"
            name="iso"
            min={0}
            defaultValue={photo.iso}
            label="ISO"
          />
        </div>
      </div>

      <div className={colStyle}>
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

        <MeteringInput defaultValue={photo.meteringMode} />
        <ExposureModeInput defaultValue={photo.exposureMode} />
      </div>
    </div>
  );
}

export default ExposureInputs;
