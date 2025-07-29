"use client";

import PhotoCard from "@app/(protected)/components/Cards/Photo/PhotoCard";

import { notFound } from "next/navigation";
import { NUM_IMAGES_ABOVE_FOLD } from "@app/configs/imageConfigs";
import { toast } from "react-toastify";
import SelectTrigger from "@app/(protected)/components/Select/SelectTrigger";
import { useSelect } from "@app/(protected)/components/Select/SelectContext";
import SelectableItem from "@app/(protected)/components/Select/SelectableItem";
import CancelSelectButton from "@app/(protected)/components/Select/CancelSelectButton";
import updateArchivedStatus from "@actions/updateArchiveStatus";

const ArchivedContainer = ({ photos }) => {
  if (!photos) {
    toast.error("Unable to fetch photos. Please try again later", {
      toastId: "Error: Fetch archived",
    });
    notFound();
  }

  const { isSelecting, numSelected, selectedItems, endSelect } = useSelect();

  const handleUnarchivePhotos = async () => {
    const res = await updateArchivedStatus(
      selectedItems.map((i) => i.pid),
      false
    );

    if (res.ok) {
      toast.success("Photo(s) removed from archive");
      endSelect();
    } else {
      toast.error(
        "Unable to remove selected photo(s) from archive. Please try again later"
      );
    }
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <header className="page-heading grow">
          <h1>Archived</h1>
        </header>
        <div>
          {!isSelecting ? (
            <SelectTrigger />
          ) : (
            <div className="flex items-center gap-2">
              <button
                className="btn bg-neutral-700 text-white font-bold"
                disabled={!numSelected}
                onClick={handleUnarchivePhotos}>
                <div className="invert">
                  <img
                    src="/assets/icons/archive-up.svg"
                    alt="unarchive"
                    width={20}
                  />
                </div>
                Unarchive ({numSelected})
              </button>
              <CancelSelectButton />
            </div>
          )}
        </div>
      </div>

      <hr className="mb-3" />
      <div className="photo-grid">
        {photos &&
          photos.map((photo, idx) => (
            <SelectableItem itemId={photo.pid} item={photo}>
              <PhotoCard
                key={photo.pid}
                photo={photo}
                lazy={idx >= NUM_IMAGES_ABOVE_FOLD}
              />
            </SelectableItem>
          ))}
      </div>
    </div>
  );
};

export default ArchivedContainer;
