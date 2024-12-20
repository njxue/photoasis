"use client";
import { QUALITY_LOW, QUALITY_MID } from "@app/common/Image/constants";
import OptimisedImage from "@app/common/Image/OptimisedImage";
import Link from "next/link";

const AlbumCard = ({ data }) => {
  let { uid, name, aid, thumbnail } = data;
  if (!thumbnail) {
    thumbnail = "/assets/images/placeholder.png";
  } else {
    thumbnail = `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${uid}/${aid}/${thumbnail?.name}`;
  }

  return (
    <>
      <Link href={`/album/${aid}`} className="cursor-pointer">
        <div className="card relative">
          <OptimisedImage
            src={thumbnail}
            name={name}
            quality={QUALITY_MID}
            hover
          />
          <div className="absolute bottom-2 px-[0.5em] text-white text-border font-bold text-start line-clamp-2 text-sm xs:text-lg sm:text-xl  sm:px-5">
            {name}
          </div>
        </div>
      </Link>
    </>
  );
};

export default AlbumCard;
