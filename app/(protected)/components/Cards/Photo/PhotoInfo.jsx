import Triangle from "./Triangle";

const PhotoInfo = ({ photo }) => {
  // Display '-' for missing values (hence, use '?' and not '??')
  const width = 20;
  const itemStyle =
    "flex flex-col justify-center items-center gap-1 text-white text-xs truncate";

  return (
    <div className="grid gid-cols-2 grid-rows-2 auto-cols-fr h-full overflow-hidden px-2">
      <div className={`${itemStyle} col-span-2`}>
        <img
          src="/assets/icons/aperture.svg"
          width={width}
          className="invert"
          alt="aperture"
        />
        <div>{photo.aperture ? photo.aperture : "-"}</div>
      </div>

      <div className={`${itemStyle} col-span-1`}>
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

      <div className={`${itemStyle} col-span-1`}>
        <img
          src="/assets/icons/iso.svg"
          width={width}
          className="invert"
          alt="iso"
        />
        <div>{photo.iso ? photo.iso : "-"}</div>
      </div>
      <Triangle />
    </div>
  );
};

export default PhotoInfo;
