"use client";
import { useState } from "react";
import PhotoCard from "../../../common/PhotoCard";
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
        <div>
          <div className="flex flex-row items-center gap-3 mb-3 mt-2 text-3xl font-light">
            <p className="line-clamp-1">{albumData.name}</p>
            <AddPhotos aid={aid}/>
          </div>
          <hr className="mb-3" />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
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
