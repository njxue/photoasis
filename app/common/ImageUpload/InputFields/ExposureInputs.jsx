import FancyInput from "@app/common/FancyInput";
import MeteringInput from "./MeteringMode/MeteringModeInput";
import ExposureModeInput from "./ExposureMode/ExposureModeInput";
import { FORM_FIELDS } from "@utils/imageUploadUtils";

function ExposureInputs({ photo }) {
  const rowStyle = "flex flex-rows items-center justify-around gap-2";
  const colStyle = "w-1/2 flex flex-col gap-2";

  return (
    <div className="flex flex-row gap-3">
      <div className={colStyle}>
        <div className={rowStyle}>
          <label>
            <img src="/assets/icons/aperture.svg" width={20} alt="aperture" />
          </label>
          <FancyInput
            type="number"
            name={FORM_FIELDS.APERTURE.name}
            step={0.1}
            min={0}
            defaultValue={photo.aperture}
            label={FORM_FIELDS.APERTURE.label}
          />
        </div>
        <div className={rowStyle}>
          <label>
            <img
              src="/assets/icons/shutterspeed.svg"
              width={20}
              alt="shutterspeed"
            />
          </label>
          <FancyInput
            type="text"
            label={FORM_FIELDS.SHUTTER_SPEED.label}
            defaultValue={photo.shutterspeed}
            name={FORM_FIELDS.SHUTTER_SPEED.name}
          />
        </div>
        <div className={rowStyle}>
          <label>
            <img src="/assets/icons/iso.svg" width={20} alt="iso" />
          </label>
          <FancyInput
            type="number"
            name={FORM_FIELDS.ISO.name}
            min={0}
            defaultValue={photo.iso}
            label={FORM_FIELDS.ISO.label}
          />
        </div>
      </div>

      <div className={colStyle}>
        <div className={rowStyle}>
          <label>
            <img
              src="/assets/icons/focal-length.svg"
              width={20}
              alt="focalLength"
            />
          </label>
          <FancyInput
            type="number"
            name={FORM_FIELDS.FOCAL_LENGTH.name}
            min={0}
            label={FORM_FIELDS.FOCAL_LENGTH.label}
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
