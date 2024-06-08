import FancyInput from "@app/common/FancyInput";

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
              name="lensModel"
              defaultValue={photo.lensModel}
              label="Lens Model"
            />
          </div>
          <div className={rowStyle}>
            <label>
              <img src="/assets/icons/camera.svg" width={20} alt="camera" />
            </label>
            <FancyInput
              type="text"
              name="cameraModel"
              defaultValue={photo.cameraModel}
              label="Camera Model"
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
              name="editingSoftware"
              defaultValue={photo.editingSoftware}
              label="Editing Software"
            />
          </div>
          <div className={rowStyle}>
            <label>
              <img src="/assets/icons/calendar.svg" width={20} alt="calendar" />
            </label>
            <FancyInput type="date" name="date" defaultValue={photo.date} />
          </div>
        </div>
      </div>
      <div className={rowStyle}>
        <label>
          <img src="/assets/icons/pen-square.svg" width={20} alt="pen" />
        </label>
        <FancyInput type="textarea" name="description" label="Description" />
      </div>
    </div>
  );
}

export default BuildInputs;
