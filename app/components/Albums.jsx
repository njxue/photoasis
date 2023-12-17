"use client";
import { useState } from "react";
import AlbumCard from "./AlbumCard";

import Link from "next/link";

const Albums = ({ albums }) => {
  const [filteredAlbums, setFilteredAlbums] = useState(albums);

  function handleChange(e) {
    const searchTerm = e.target.value.toUpperCase().trim();
    setFilteredAlbums(
      albums.filter((album) =>
        album.name.toUpperCase().trim().includes(searchTerm)
      )
    );
  }
  return (
    <>
      <div>
        <div className="mb-3 flex flex-row items-center justify-between mt-2 flex-wrap">
          <div className="flex flex-row items-center justify-between gap-3">
            <p className="text-3xl ">Albums</p>
            <Link href="/album/new">
              <img src="/assets/icons/add-album.svg" width={30} />
            </Link>
          </div>
          <input
            type="search"
            onChange={handleChange}
            placeholder="Find an album..."
            className="input py-1 px-2 rounded"
          />
        </div>
        <hr className="mb-3" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {filteredAlbums?.map((album) => (
          <AlbumCard data={album} key={album.aid} />
        ))}
      </div>
    </>
  );
};
export default Albums;
