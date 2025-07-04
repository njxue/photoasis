"use client";
import { useState } from "react";
import MinimalisticViewToggle from "@app/(protected)/components/MinimalisticViewToggle";
import { SelectProvider } from "@app/(protected)/components/Select/SelectContext";
import AlbumBody from "./AlbumBody";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";
import { useAlbum } from "../AlbumContext";
const AlbumContainer = () => {
  const album = useAlbum();

  if (!album) {
    toast.error("Unable to fetch album. Please try again later", {
      toastId: "Error: Fetch album",
    });
    notFound();
  }

  const [minimalisticView, setMinimalisticView] = useState(false);

  return (
    <div className="h-full">
      <MinimalisticViewToggle
        minimalisticView={minimalisticView}
        setMinimalisticView={setMinimalisticView}
      />
      <SelectProvider>
        <AlbumBody minimalisticView={minimalisticView} key={album.photos} />
      </SelectProvider>
    </div>
  );
};

export default AlbumContainer;
