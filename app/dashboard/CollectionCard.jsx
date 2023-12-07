import Image from "next/image";
import Link from "next/link";
import EditButton from "./EditButton";
const CollectionCard = ({ data }) => {
  const { uid, name, cid, thumbnail } = data;
  return (
    <div className="card min-w-[150px] min-h-[150px] h-full cursor-pointer relative">
      <Link href={`/collection/${cid}`}>
        <Image
          src={`${process.env.CLOUDFLARE_URL}/${uid}/${cid}/${thumbnail?.name}`}
          width={0}
          height={0}
          style={{ height: "75%", width: "100%" }}
          alt={name}
        />
        <div className="px-5 py-3">{name}</div>
      </Link>
      <EditButton data={{ cid, name }} />
    </div>
  );
};

export default CollectionCard;
