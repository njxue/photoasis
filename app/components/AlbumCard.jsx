import Image from "next/image";
import Link from "next/link";
import EditAlbum from "./EditAlbum";
const AlbumCard = ({ data }) => {
  let { uid, name, aid, thumbnail } = data;
  if (!thumbnail) {
    thumbnail = "/assets/images/placeholder.png";
  } else {
    thumbnail = `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${uid}/${aid}/${thumbnail?.name}`;
  }
  return (
    <div className="relative">
      <div className="card relative ">
        <Link href={`/album/${aid}`}>
          <Image
            src={thumbnail}
            width={0}
            height={0}
            alt={name}
            className="hover:opacity-50 transition-opacity ease-in-out duration-50 h-full w-full object-cover"
          />
        </Link>

        <div className="absolute bottom-2 px-5 text-white text-border text-xl font-bold text-start line-clamp-2">
          {name}
        </div>
      </div>
      <div className="absolute right-0 top-0 bg-black w-[15%] border border-solid border-gray-300 opacity-0 rounded p-1 cursor-pointer hover:opacity-50">
        <EditAlbum data={{ aid, name }} />
      </div>
    </div>
  );
};

export default AlbumCard;
