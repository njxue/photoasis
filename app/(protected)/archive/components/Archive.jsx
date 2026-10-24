"use client";

import { useState } from "react";
import AlbumCard from "@app/(protected)/components/Cards/Album/AlbumCard";
import InfiniteList from "@app/(protected)/components/InfiniteLIst/InfiniteList";
import useDebounce from "@app/common/hooks/useDebounce";
import SelectableItem from "@app/(protected)/components/Select/SelectableItem";
import { SelectProvider } from "@app/(protected)/components/Select/SelectContext";
import ArchiveSelect from "./ArchiveSelect";

const EAGER_LOAD_COUNT = 20;

const Archive = ({ albums = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const normalizedSearchTerm = debouncedSearchTerm.toUpperCase().trim();
  const filteredAlbums = albums.filter((album) =>
    album.name.toUpperCase().trim().includes(normalizedSearchTerm),
  );

  return (
    <SelectProvider>
      <header className="mb-8 border-b border-black/15 pb-5">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Your archive</p>
            <h1 className="page-title">Archive</h1>
          </div>
          <ArchiveSelect />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <search className="w-full sm:w-72">
            <input
              type="search"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search archived albums"
              className="minimal-input w-full"
            />
          </search>
        </div>
      </header>

      {albums.length === 0 && (
        <div className="empty-state">
          <p className="eyebrow">Nothing archived</p>
          <h2 className="mt-2 text-2xl font-semibold">Your archive is empty</h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-black/50">
            Archived albums will appear here.
          </p>
        </div>
      )}

      {albums.length > 0 && filteredAlbums.length === 0 && (
        <div className="empty-state">
          <p className="eyebrow">Search archive</p>
          <h2 className="mt-2 text-2xl font-semibold">
            No archived albums match your search term
          </h2>
        </div>
      )}

      <InfiniteList
        initialSize={10}
        className="album-grid"
        items={filteredAlbums}
        keyExtractor={(album) => album.aid}
        renderItem={(album, index) => (
          <SelectableItem item={album.aid} itemId={album.aid} key={album.aid}>
            <AlbumCard data={album} lazy={index >= EAGER_LOAD_COUNT} />
          </SelectableItem>
        )}
      />
    </SelectProvider>
  );
};

export default Archive;
