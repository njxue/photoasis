import Image from "next/image";
import Link from "next/link";
import EditAlbum from "./EditAlbum";
const AlbumCard = ({ data }) => {
  const { uid, name, aid, thumbnail } = data;
  // TODO: handle empty thumbnail
  return (
    <div className="card relative hover:opacity-50 transition-opacity ease-in-out duration-50">
      <Link href={`/album/${aid}`}>
        <Image
          src={`${process.env.CLOUDFLARE_URL}/${uid}/${aid}/${thumbnail?.name}`}
          width={0}
          height={0}
          style={{ height: "80%", width: "100%", objectFit: "cover" }}
          alt={name}
        />
        <div className="px-5 py-3 h-[20%] text-start">{name}</div>
      </Link>
      <EditAlbum data={{ aid, name }} />
    </div>
  );
};

export default AlbumCard;
