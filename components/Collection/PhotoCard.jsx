import Image from "next/image";
const PhotoCard = ({ photo }) => {
  return (
    <div className="card w-[250px] h-[250px] cursor-pointer">
      <Image
        src={photo.url}
        width={0}
        height={0}
        style={{ height: "70%", width: "100%" }}
        objectFit="contain"
      />
    </div>
  );
};

export default PhotoCard;
