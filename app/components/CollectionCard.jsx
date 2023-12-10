"use client";
import Image from "next/image";
import Link from "next/link";
import EditCollection from "./EditCollection";
const CollectionCard = ({ data }) => {
  const { uid, name, cid, thumbnail } = data;
  return (
    <div className="card relative">
      <Link href={`/collection/${cid}`}>
        <Image
          src={`${process.env.CLOUDFLARE_URL}/${uid}/${cid}/${thumbnail?.name}`}
          width={0}
          height={0}
          style={{ height: "80%", width: "100%", objectFit: "cover" }}
          alt={name}
        />
        <div className="px-5 py-3 h-[20%] text-start">{name}</div>
      </Link>
      <EditCollection data={{ cid, name }} />
    </div>
  );
};

export default CollectionCard;
