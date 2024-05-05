"use client";
import { useState } from "react";
import PhotoCard from "../../../common/Cards/Photo/PhotoCard";
import DeleteAlbumForm from "./Menu/DeleteAlbumForm";
import AlbumMenu from "./Menu/AlbumMenu";
import UpdateAlbumForm from "./Menu/UpdateAlbumForm";
import AddPhotosForm from "./Menu/AddPhotosForm";
import deletePhotos from "@actions/deletePhotos";
import ConfirmationModal from "@app/common/ConfirmationModal";
import MinimalisticViewToggle from "@app/common/MinimalisticViewToggle";
import SelectableItem from "@app/common/Select/SelectableItem";
import SelectControls from "@app/common/Select/SelectControls";
import { useSelect } from "@utils/customHooks";

const AlbumContainer = ({ albumData }) => {
  const [minimalisticView, setMinimalisticView] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeletingAlbum, setIsDeletingAlbum] = useState(false);
  const [isDeletingPhotos, setIsDeletingPhotos] = useState(false);
  const [isAddingPhotos, setIsAddingPhotos] = useState(false);

  const {
    isSelecting,
    endSelect,
    beginSelect,
    selectItem,
    selectedItems,
    numSelected,
    isSelected,
  } = useSelect();

  const { photos, aid } = albumData;

  async function handleDeletePhotos() {
    const res = await deletePhotos({
      aid,
      pids: selectedItems,
    });
    if (res.status === 204) {
      setIsDeletingPhotos(false);
      endSelect();
    }
  }

  return (
    <div className="h-full p-1">
      <MinimalisticViewToggle
        minimalisticView={minimalisticView}
        setMinimalisticView={setMinimalisticView}
      />
      {/** ===================================================== Header ===================================================== */}
      {!minimalisticView && (
        <div className="p-1 mb-3 mt-2 font-light">
          {isEditing ? (
            <UpdateAlbumForm
              onCancel={() => setIsEditing(false)}
              onSuccess={() => setIsEditing(false)}
              albumData={albumData}
            />
          ) : (
            <div className="flex flex-row flex-wrap justify-between gap-2 items-center grow max-w-[100%]">
              <p className="line-clamp-2 text-2xl md:text-3xl basis-1/2 grow ">
                {albumData.name}
              </p>
              <div className="flex flex-row justify-end grow gap-2 ">
                <SelectControls
                  isSelecting={isSelecting}
                  beginSelect={beginSelect}
                  endSelect={endSelect}
                  numSelected={numSelected}
                  handleSubmit={handleDeletePhotos}
                  prompt={`Are you sure you want to delete ${numSelected} photos?`}
                />

                <AlbumMenu
                  setIsDeleting={setIsDeletingAlbum}
                  setIsEditing={setIsEditing}
                  setIsAddingPhotos={setIsAddingPhotos}
                />
              </div>
            </div>
          )}

          <hr className="mb-3" />
          <DeleteAlbumForm
            albumData={albumData}
            isDeletingAlbum={isDeletingAlbum}
            setIsDeletingAlbum={setIsDeletingAlbum}
          />
          <AddPhotosForm
            albumData={albumData}
            show={isAddingPhotos}
            setShow={setIsAddingPhotos}
          />
          <ConfirmationModal
            isOpen={isDeletingPhotos}
            setIsOpen={setIsDeletingPhotos}
            prompt={`Are you sure you want to delete ${numSelected} photos?`}
            onConfirm={handleDeletePhotos}
          />
        </div>
      )}
      {/** ===================================================== Body ===================================================== */}
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
