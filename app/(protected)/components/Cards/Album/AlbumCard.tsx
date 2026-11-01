"use client";

import type { Ref } from "react";
import Link from "next/link";
import CustomImage from "@app/common/Image/CustomImage";
import { useUserPreferences } from "@app/(protected)/UserPreferencesContext";
import { buildPhotoUrl } from "@utils/imageUrls";
import { getAlbumRoute } from "@utils/pageRoutes";
import type { AlbumWithThumbnail } from "@/types/albums";

const ALBUM_GRID_SIZES =
  "(min-width: 1536px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33.333vw, 50vw";

interface AlbumCardProps {
  data: AlbumWithThumbnail;
  lazy?: boolean;
  dragHandleRef?: Ref<HTMLAnchorElement>;
}

const AlbumCard = ({ data, dragHandleRef, lazy = true }: AlbumCardProps) => {
  const { uid, name, slug, aid, thumbnail } = data;
  const thumbnailUrl = thumbnail
    ? buildPhotoUrl({ uid, aid, name: thumbnail.name })
    : undefined;
  const { userPreferences } = useUserPreferences();

  // Let the Link receive the handleRef, otherwise
  // both the div in SortableItem and the Link will receive focus
  return (
    <article className="album-card group">
      <Link
        ref={dragHandleRef}
        href={getAlbumRoute(uid, slug)}
        className="block cursor-pointer">
        <div className="card relative overflow-hidden bg-[#e9e9e6]">
          <CustomImage
            preview
            fill
            src={thumbnailUrl}
            name={name}
            objectFit={userPreferences.objectFit}
            blurhash={data.thumbnail?.blurhash}
            lazy={lazy}
            sizes={ALBUM_GRID_SIZES}
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
