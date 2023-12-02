import Image from "next/image";

const PhotoCard = ({ photo }) => {
  return (
    <div className="card w-[220px] h-[220px] cursor-pointer">
      <Image
        src={photo.url}
        width={0}
        height={0}
        style={{
          height: "80%",
          width: "100%",
          objectFit: "cover",
        }}
      />
      <div className="flex flex-row justify-around items-center p-2">
        <div className="flex flex-row items-center gap-2">
          <img src="/assets/icons/aperture.svg" width={20} />
          <span>{photo.aperture ?? "-"}</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img src="/assets/icons/shutterspeed.svg" width={20} />
          <span>{photo.shutterspeed ?? "-"}</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img src="/assets/icons/iso.svg" width={20} />
          <span>{photo.iso ?? "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
