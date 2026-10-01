import Triangle from "./Triangle";

const PhotoInfo = ({ photo }) => {
  const iconStyle = "h-4 w-4 invert opacity-90 sm:h-5 sm:w-5";
  const itemStyle =
    "absolute z-10 flex min-w-0 flex-col items-center gap-1 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]";
  const valueStyle =
    "max-w-[90px] truncate text-[11px] font-bold leading-none sm:text-xs";

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute left-1/2 top-1/2 aspect-square w-[82%] max-w-[240px] -translate-x-1/2 -translate-y-1/2">
        <div className={`${itemStyle} left-1/2 top-0 -translate-x-1/2`}>
          <img
            src="/assets/icons/aperture.svg"
            className={iconStyle}
            alt=""
          />
          <span className={valueStyle}>{photo.aperture ?? "—"}</span>
        </div>

        <div className={`${itemStyle} bottom-0 left-0`}>
          <img
            src="/assets/icons/shutterspeed.svg"
            className={iconStyle}
            alt=""
          />
          <span className={valueStyle}>{photo.shutterspeed ?? "—"}</span>
        </div>

        <div className={`${itemStyle} bottom-0 right-0`}>
          <img src="/assets/icons/iso.svg" className={iconStyle} alt="" />
          <span className={valueStyle}>{photo.iso ?? "—"}</span>
        </div>
        <Triangle />
      </div>
    </div>
  );
};

export default PhotoInfo;
