const PhotoInfo = ({ photo }) => {
  // Display '-' for missing values (hence, use '?' and not '??')
  const width = 12;
  const itemStyle =
    "flex flex-col justify-center items-start gap-1 w-1/3 xs:flex-row";
  return (
    <div className="flex flex-row justify-around items-start max-h-[30px] overflow-hidden p-2 gap-1 text-white text-[10px]">
      <div className={itemStyle}>
        <img
          src="/assets/icons/aperture.svg"
          width={width}
          className="invert"
          alt="aperture"
        />
        <div>{photo.aperture ? photo.aperture : "-"}</div>
      </div>
      <div className={itemStyle}>
        <img
          src="/assets/icons/shutterspeed.svg"
          width={width}
          className="invert"
          alt="shutterspeed"
        />
        <div className="overflow-hidden">
          {photo.shutterspeed ? photo.shutterspeed : "-"}
        </div>
      </div>
      <div className={itemStyle}>
        <img
          src="/assets/icons/iso.svg"
          width={width}
          className="invert"
          alt="iso"
        />
        <div>{photo.iso ? photo.iso : "-"}</div>
      </div>
    </div>
  );
};

export default PhotoInfo;
