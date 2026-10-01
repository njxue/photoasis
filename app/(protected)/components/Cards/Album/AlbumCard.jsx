"use client";

import Link from "next/link";
import Photo from "../Photo";
import { useUserPreferences } from "@app/(protected)/UserPreferencesContext";

const AlbumCard = ({ data, lazy = true }) => {
  let { uid, name, aid, thumbnail } = data;
  if (thumbnail) {
    thumbnail = `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${uid}/${aid}/${thumbnail?.name}`;
  }
  const { userPreferences } = useUserPreferences();
  return (
    <article className="album-card group">
      <Link href={`/album/${aid}`} className="cursor-pointer">
        <div className="card relative overflow-hidden bg-[#e9e9e6]">
          <Photo
            src={thumbnail}
            name={name}
            objectFit={userPreferences.objectFit}
            blurhash={data.thumbnail?.blurhash}
            lazy={lazy}
            sizes="(max-width: 450px) 50px, (max-width: 640px) 64px, 125px"
          />
        </div>
        <div className="flex items-start justify-between gap-3 pt-3">
          <div>
            <p className="line-clamp-2 text-sm font-semibold leading-5">
              {name}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
              Album
            </p>
          </div>
          <span className="translate-x-0 text-lg font-light text-black/35 transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </Link>
    </article>
  );
};

export default AlbumCard;
