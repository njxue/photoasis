const PhotoInfo = ({ photo }) => {
  const width = 12;
  const itemStyle =
    "flex flex-col justify-center items-center gap-1 basis-4/12 xs:flex-row";
  return (
    <div className="flex flex-row justify-around items-center p-2 gap-1 text-white text-[10px]">
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
