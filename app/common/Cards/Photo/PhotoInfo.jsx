const PhotoInfo = ({ photo }) => {
  return (
    <div className="flex flex-row justify-around items-center p-2 text-white">
      <div className="flex flex-row items-center gap-2 flex-wrap">
        <img src="/assets/icons/aperture-white.svg" width={20} />
        <div>{photo.aperture === "" ? "-" : photo.aperture}</div>
      </div>
      <div className="border-r border-gray-200 h-[20px] w-[1px]"></div>
      <div className="flex flex-row items-center gap-2 flex-wrap">
        <img src="/assets/icons/shutterspeed-white.svg" width={20} />
        <div>{photo.shutterspeed === "" ? "-" : photo.shutterspeed}</div>
      </div>
      <div className="border-r border-gray-200 h-[20px] w-[1px]"></div>
      <div className="flex flex-row items-center gap-2 flex-wrap justify-center">
        <img src="/assets/icons/iso-white.svg" width={20} />
        <div>{photo.iso === "" ? "-" : photo.iso}</div>
      </div>
    </div>
  );
};

export default PhotoInfo;
