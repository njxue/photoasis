const PhotoInfo = ({ photo }) => {
  const width = 15;
  const itemStyle =
    "flex flex-row justify-center items-center gap-2 flex-wrap basis-4/12";
  return (
    <div className="flex flex-row justify-around items-center p-2 text-white text-xs">
      <div className={itemStyle}>
        <img src="/assets/icons/aperture-white.svg" width={width} />
        <div>{photo.aperture === "" ? "-" : photo.aperture}</div>
      </div>
      <div className={itemStyle}>
        <img src="/assets/icons/shutterspeed-white.svg" width={width} />
        <div>{photo.shutterspeed === "" ? "-" : photo.shutterspeed}</div>
      </div>
      <div className={itemStyle}>
        <img src="/assets/icons/iso-white.svg" width={width} />
        <div>{photo.iso === "" ? "-" : photo.iso}</div>
      </div>
    </div>
  );
};

export default PhotoInfo;
