import FancyInput from "@app/common/FancyInput";
import { FORM_FIELDS } from "@utils/imageUploadUtils";

function BuildInputs({ photo }) {
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
              defaultValue={photo.lensModel}
              label={FORM_FIELDS.LENS_MODEL.label}
            />
          </div>
          <div className={rowStyle}>
            <label>
              <img src="/assets/icons/camera.svg" width={20} alt="camera" />
            </label>
            <FancyInput
              type="text"
              name={FORM_FIELDS.CAMERA_MODEL.name}
              defaultValue={photo.cameraModel}
              label={FORM_FIELDS.CAMERA_MODEL.label}
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
              defaultValue={photo.editingSoftware}
              label={FORM_FIELDS.EDITING_SOFTWARE.label}
            />
          </div>
          <div className={rowStyle}>
            <label>
              <img src="/assets/icons/calendar.svg" width={20} alt="calendar" />
            </label>
            <FancyInput
              type="date"
              name={FORM_FIELDS.DATE.name}
              defaultValue={photo.date}
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
        />
      </div>
    </div>
  );
}

export default BuildInputs;
