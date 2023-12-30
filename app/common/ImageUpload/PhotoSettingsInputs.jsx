const PhotoSettingsInputs = ({ photo }) => {
  const rowStyle = "flex flex-rows items-center justify-between gap-2";
  const inputStyle =
    "border border-solid border-gray-600 rounded p-1 grow md:max-w-[80%]";

  return (
    <div className="text-xs flex flex-col gap-1 px-1">
      <p className="mb-2 line text-sm text-start">{photo.name}</p>
      <div className={rowStyle}>
        <label>
          <img src="/assets/icons/aperture-black.svg" width={20} />
        </label>
        <input
          className={inputStyle}
          type="number"
          name="aperture"
          step={0.1}
          min={0}
          defaultValue={photo.aperture}
          placeholder="Aperture"
        />
      </div>
      <div className={rowStyle}>
        <label>
          <img src="/assets/icons/shutterspeed-black.svg" width={20} />
        </label>
        <input
          className={inputStyle}
          type="text"
          name="shutterspeed"
          defaultValue={photo.shutterspeed}
          placeholder="Shutter Speed"
        />
      </div>
      <div className={rowStyle}>
        <label>
          <img src="/assets/icons/iso-black.svg" width={20} />
        </label>
        <input
          className={inputStyle}
          type="number"
          name="iso"
          min={0}
          defaultValue={photo.iso}
          placeholder="ISO"
        />
      </div>
      <div className={rowStyle}>
        <label>
          <img src="/assets/icons/pen-square.svg" width={20} />
        </label>
        <textarea
          className={inputStyle}
          name="description"
          placeholder="Description"
        />
      </div>
      <div className={rowStyle}>
        <label>
          <img src="/assets/icons/calendar.svg" width={20} />
        </label>
        <input
          className={inputStyle}
          type="date"
          name="date"
          defaultValue={photo.date}
        />
      </div>
    </div>
  );
};

export default PhotoSettingsInputs;
