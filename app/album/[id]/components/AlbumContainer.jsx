"use client";
import { useState } from "react";
import PhotoCard from "../../../common/Cards/Photo/PhotoCard";
import MinimalisticViewToggle from "@app/common/MinimalisticViewToggle";
import SelectableItem from "@app/common/Select/SelectableItem";
import AlbumHeader from "./AlbumHeader/AlbumHeader";
import { SelectProvider } from "@app/common/Select/SelectContext";
import AlbumBody from "./AlbumBody";

const AlbumContainer = ({ albumData }) => {
  const [minimalisticView, setMinimalisticView] = useState(false);

  const { photos } = albumData;

  return (
    <div className="h-full p-1">
      <MinimalisticViewToggle
        minimalisticView={minimalisticView}
        setMinimalisticView={setMinimalisticView}
      />
      <SelectProvider>
        {!minimalisticView && <AlbumHeader albumData={albumData} />}
        <AlbumBody photos={photos} minimalisticView={minimalisticView} />
      </SelectProvider>
    </div>
  );
};

export default AlbumContainer;
