"use client";

import Link from "next/link";
import Photo from "../Photo";
import { useUserPreferences } from "@app/UserPreferencesContext";

const AlbumCard = ({ data }) => {
  let { uid, name, aid, thumbnail } = data;
  if (thumbnail) {
    thumbnail = `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${uid}/${aid}/${thumbnail?.name}`;
  }
  const { userPreferences } = useUserPreferences();
  return (
    <>
      <Link href={`/album/${aid}`} className="cursor-pointer">
        <div className="card relative hover:opacity-50 transition-opacity ease-in-out duration-50">
          <Photo
            src={thumbnail}
            name={name}
            objectFit={userPreferences.objectFit}
            blurhash={data.thumbnail.blurhash}
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
