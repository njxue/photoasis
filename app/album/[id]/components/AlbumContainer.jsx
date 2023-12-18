"use client";
import { useState } from "react";
import PhotoCard from "../../../common/PhotoCard";
import AlbumHeader from "./AlbumHeader";
const AlbumContainer = ({ albumData }) => {
  const [minimalisticView, setMinimalisticView] = useState(false);
  const { photos } = albumData;

  return (
    <div className="h-full p-1">
      <div
        className="fixed right-5 bottom-5 w-[30px] cursor-pointer z-50 opacity-20 hover:opacity-70 hover:scale-110 transition-opacity ease-in-out duration-200"
        onClick={() => setMinimalisticView((prev) => !prev)}>
        <img
          src={`/assets/icons/${minimalisticView ? "unhide" : "hide"}.svg`}
        />
      </div>

      <AlbumHeader minimalisticView={minimalisticView} albumData={albumData} />

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

export default AlbumContainer;
