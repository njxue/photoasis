import FancyInput from "@app/common/FancyInput";
import { FORM_FIELDS } from "@utils/imageUploadUtils";

function BuildInputs({ fileData }) {
  const rowStyle = "flex flex-rows items-center justify-around gap-2";
  const colStyle = "w-1/2 flex flex-col gap-2";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-3">
        <div className={colStyle}>
          <div className={rowStyle}>
            <label>
              <img src="/assets/icons/lens.svg" width={20} alt="lens" />
            </label>
            <FancyInput
              type="text"
              name={FORM_FIELDS.LENS_MODEL.name}
              defaultValue={fileData[FORM_FIELDS.LENS_MODEL.name]}
              label={FORM_FIELDS.LENS_MODEL.label}
              onChange={(v) => {
                fileData[FORM_FIELDS.LENS_MODEL.name] = v;
              }}
            />
          </div>
          <div className={rowStyle}>
            <label>
              <img src="/assets/icons/camera.svg" width={20} alt="camera" />
            </label>
            <FancyInput
              type="text"
              name={FORM_FIELDS.CAMERA_MODEL.name}
              defaultValue={fileData[FORM_FIELDS.CAMERA_MODEL.name]}
              label={FORM_FIELDS.CAMERA_MODEL.label}
              onChange={(v) => {
                fileData[FORM_FIELDS.CAMERA_MODEL.name] = v;
              }}
            />
          </div>
        </div>
        <div className={colStyle}>
          <div className={rowStyle}>
            <label>
              <img
                src="/assets/icons/lightroom.svg"
                width={20}
                alt="lightroom"
              />
            </label>
            <FancyInput
              type="text"
              name={FORM_FIELDS.EDITING_SOFTWARE.name}
              defaultValue={fileData[FORM_FIELDS.EDITING_SOFTWARE.name]}
              label={FORM_FIELDS.EDITING_SOFTWARE.label}
              onChange={(v) => {
                fileData[FORM_FIELDS.EDITING_SOFTWARE.name] = v;
              }}
            />
          </div>
          <div className={rowStyle}>
            <label>
              <img src="/assets/icons/calendar.svg" width={20} alt="calendar" />
            </label>
            <FancyInput
              type="date"
              name={FORM_FIELDS.DATE.name}
              defaultValue={fileData[FORM_FIELDS.DATE.name]}
              onChange={(v) => {
                fileData[FORM_FIELDS.DATE.name] = v;
              }}
            />
          </div>
        </div>
      </div>
      <div className={rowStyle}>
        <label>
          <img src="/assets/icons/pen-square.svg" width={20} alt="pen" />
        </label>
        <FancyInput
          type="textarea"
          name={FORM_FIELDS.DESCRIPTION.name}
          label={FORM_FIELDS.DESCRIPTION.label}
          defaultValue={fileData[FORM_FIELDS.DESCRIPTION.name]}
          onChange={(v) => {
            fileData[FORM_FIELDS.DESCRIPTION.name] = v;
          }}
        />
      </div>
    </div>
  );
}

export default BuildInputs;
