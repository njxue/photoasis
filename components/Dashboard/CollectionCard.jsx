import Image from "next/image";
import Link from "next/link";
const CollectionCard = ({ data }) => {
  const { uid, name, cid, thumbnail } = data;
  return (
    <Link href={`/collection/${cid}`}>
      <div className="card w-[250px] h-[250px] cursor-pointer">
        <Image
          src={`${process.env.CLOUDFLARE_URL}/${uid}/thumbnail_${thumbnail?.name}`}
          width={0}
          height={0}
          style={{ height: "70%", width: "100%" }}
        />

        <div className="px-5 py-3">{name}</div>
      </div>
    </Link>
  );
};

export default CollectionCard;