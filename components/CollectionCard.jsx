import Image from "next/image";

const CollectionCard = ({ data }) => {
  const { uid, name, photos, thumbnail } = data;

  return (
    <div className="card w-[250px] h-[250px]">
      <Image
        src={`${process.env.CLOUDFLARE_URL}/${uid}/thumbnail_${thumbnail?.name}`}
        width={0}
        height={0}
        style={{ height: "70%", width: "100%" }}
      />

      <div className="px-5 py-3">{name}</div>
    </div>
  );
};

export default CollectionCard;
