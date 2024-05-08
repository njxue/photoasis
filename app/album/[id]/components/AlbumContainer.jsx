"use client";
import { useState } from "react";
import PhotoCard from "../../../common/Cards/Photo/PhotoCard";
import MinimalisticViewToggle from "@app/common/MinimalisticViewToggle";
import SelectableItem from "@app/common/Select/SelectableItem";
import { useSelect } from "@utils/customHooks";
import AlbumHeader from "./AlbumHeader/AlbumHeader";

const AlbumContainer = ({ albumData }) => {
  const [minimalisticView, setMinimalisticView] = useState(false);
  const {
    isSelecting,
    endSelect,
    beginSelect,
    selectItem,
    selectedItems,
    isSelected,
  } = useSelect();

  const { photos } = albumData;

  return (
    <div className="h-full p-1">
      <MinimalisticViewToggle
        minimalisticView={minimalisticView}
        setMinimalisticView={setMinimalisticView}
      />
      {!minimalisticView && (
        <AlbumHeader
          albumData={albumData}
          beginSelect={beginSelect}
          endSelect={endSelect}
          isSelecting={isSelecting}
          selectedItems={selectedItems}
        />
      )}
      <div className="photo-grid">
        {photos.map((photo) => (
          <SelectableItem
            selected={isSelected(photo.pid)}
            isSelecting={isSelecting}
            handleSelect={() => selectItem(photo.pid)}
            key={photo.pid}>
            <PhotoCard
              photo={photo}
              key={photo.pid}
              minimalisticView={minimalisticView}
              disablePointer={isSelecting}
            />
          </SelectableItem>
        ))}
      </div>
    </div>
  );
};

export default AlbumContainer;
