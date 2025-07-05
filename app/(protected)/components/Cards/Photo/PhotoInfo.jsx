import Triangle from "./Triangle";

const PhotoInfo = ({ photo }) => {
  const width = 20;
  const itemStyle =
    "flex flex-col justify-center items-center gap-1 text-xs truncate invert font-semibold";

  return (
    <div className="grid grid-cols-2 grid-rows-2 auto-cols-fr h-full overflow-hidden px-2">
      <div className={`${itemStyle} col-span-2`}>
        <img src="/assets/icons/aperture.svg" width={width} alt="aperture" />
        <div>{photo.aperture ?? "-"}</div>
      </div>

      <div className={`${itemStyle} col-span-1`}>
        <img
          src="/assets/icons/shutterspeed.svg"
          width={width}
          alt="shutterspeed"
        />
        <div className="overflow-hidden">{photo.shutterspeed ?? "-"}</div>
      </div>

      <div className={`${itemStyle} col-span-1`}>
        <img src="/assets/icons/iso.svg" width={width} alt="iso" />
        <div>{photo.iso ?? "-"}</div>
      </div>
      <Triangle />
    </div>
  );
};

export default PhotoInfo;
