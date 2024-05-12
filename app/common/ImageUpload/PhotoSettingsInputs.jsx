import FancyInput from "../FancyInput";

const PhotoSettingsInputs = ({ photo }) => {
  const rowStyle = "flex flex-rows items-center justify-around gap-2";

  return (
    <div className="text-xs flex flex-col gap-2 px-1">
      <p className="mb-2 line-clamp-1 text-sm text-start">{photo.name}</p>
      <div className={rowStyle}>
        <label>
          <img src="/assets/icons/aperture-black.svg" width={20} />
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
          <img src="/assets/icons/shutterspeed-black.svg" width={20} />
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
          <img src="/assets/icons/iso-black.svg" width={20} />
        </label>
        <FancyInput
          type="number"
          name="iso"
          min={0}
          defaultValue={photo.iso}
          label="ISO"
        />
      </div>
      <div className={rowStyle}>
        <label>
          <img src="/assets/icons/pen-square.svg" width={20} />
        </label>
        <FancyInput type="textarea" name="description" label="Description" />
      </div>
      <div className={rowStyle}>
        <label>
          <img src="/assets/icons/calendar.svg" width={20} />
        </label>
        <input
          className="input w-full"
          type="date"
          name="date"
          defaultValue={photo.date}
        />
      </div>
    </div>
  );
};

export default PhotoSettingsInputs;
