import FancyInput from "@app/common/FancyInput";
import MeteringInput from "./MeteringMode/MeteringModeInput";
import ExposureModeInput from "./ExposureMode/ExposureModeInput";
import { FORM_FIELDS } from "@utils/imageUploadUtils";

// fileData is mutable. It is only meant for form submission and should not be used as a state
function ExposureInputs({ fileData }) {
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
            defaultValue={fileData[FORM_FIELDS.APERTURE.name]}
            label={FORM_FIELDS.APERTURE.label}
            onChange={(v) => {
              fileData[FORM_FIELDS.APERTURE.name] = v;
            }}
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
            defaultValue={fileData[FORM_FIELDS.SHUTTER_SPEED.name]}
            name={FORM_FIELDS.SHUTTER_SPEED.name}
            onChange={(v) => {
              fileData[FORM_FIELDS.SHUTTER_SPEED.name] = v;
            }}
          />
        </div>
        <div className={rowStyle}>
          <label>
            <img src="/assets/icons/iso.svg" width={20} alt="iso" />
          </label>
          <FancyInput
            type="number"
            step={1}
            name={FORM_FIELDS.ISO.name}
            min={0}
            defaultValue={fileData[FORM_FIELDS.ISO.name]}
            label={FORM_FIELDS.ISO.label}
            onChange={(v) => {
              fileData[FORM_FIELDS.ISO.name] = v;
            }}
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
            defaultValue={fileData[FORM_FIELDS.FOCAL_LENGTH.name]}
            onChange={(v) => {
              fileData[FORM_FIELDS.FOCAL_LENGTH.name] = v;
            }}
          />
        </div>

        <MeteringInput fileData={fileData} />
        <ExposureModeInput fileData={fileData} />
      </div>
    </div>
  );
}

export default ExposureInputs;
