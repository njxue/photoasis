"use client";
import { useState } from "react";
import MinimalisticViewToggle from "@app/common/MinimalisticViewToggle";
import AlbumHeader from "./AlbumHeader/AlbumHeader";
import { SelectProvider } from "@app/common/Select/SelectContext";
import AlbumBody from "./AlbumBody";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";
const AlbumContainer = ({ albumData }) => {
  if (!albumData) {
    toast.error("Unable to fetch album. Please try again later", {
      toastId: "Error: Fetch album",
    });
    notFound();
  }
  const [minimalisticView, setMinimalisticView] = useState(false);

  return (
    <div className="h-full p-1">
      <MinimalisticViewToggle
        minimalisticView={minimalisticView}
        setMinimalisticView={setMinimalisticView}
      />
      <SelectProvider>
        {!minimalisticView && <AlbumHeader albumData={albumData} />}
        <AlbumBody
          photos={albumData.photos}
          minimalisticView={minimalisticView}
          key={albumData.photos}
        />
      </SelectProvider>
    </div>
  );
};

export default AlbumContainer;
