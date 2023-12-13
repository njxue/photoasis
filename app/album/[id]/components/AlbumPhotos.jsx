"use client";
import { useState } from "react";
import PhotoCard from "./PhotoCard";
import AddPhotos from "./AddPhotos";
const AlbumPhotos = ({ albumData }) => {
  const [minimalisticView, setMinimalisticView] = useState(false);
  const { photos, aid } = albumData;
  return (
    <div className="h-full p-1">
      <div
        className="fixed right-5 bottom-5 w-[30px] cursor-pointer z-50 opacity-20 hover:opacity-70 hover:scale-110 transition-opacity ease-in-out duration-200"
        onClick={() => setMinimalisticView((prev) => !prev)}>
        <img
          src={`/assets/icons/${minimalisticView ? "unhide" : "hide"}.svg`}
        />
      </div>

      {!minimalisticView && (
        <div className="flex flex-row text-5xl font-light items-center gap-16 mb-7 mt-2">
          <hr className="grow border border-solid border-gray-300" />
          {albumData.name}
          <hr className="grow border border-solid border-gray-300" />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {!minimalisticView && <AddPhotos aid={aid} />}
        {photos.map((photo) => (
          <PhotoCard
            photo={photo}
            key={photo.pid}
            minimalisticView={minimalisticView}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumPhotos;
