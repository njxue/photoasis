import CancelSelectButton from "@app/common/Select/CancelSelectButton";
import { useSelect } from "@app/common/Select/SelectContext";
import updateAlbum from "@actions/updateAlbum";
import OptimisedImage from "@app/common/Image/OptimisedImage";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ChangeThumbnailSelectControls({ albumData }) {
  const { isSelecting, numSelected, selectedItems, endSelect } = useSelect();
  const [isLoading, setIsLoading] = useState(false);

  async function handleChangeThumbail() {
    if (selectedItems.length === 0) {
      return;
    }

    const selectedPhotoPid = selectedItems[0];

    try {
      setIsLoading(true);
      const toastId = toast.loading("Updating thumbnail");
      const res = await updateAlbum({
        aid: albumData.aid,
        thumbnailPid: selectedPhotoPid,
      });

      const photoUrl = albumData.photos.find(
        (photo) => photo.pid === selectedPhotoPid
      )?.url;

      if (res.ok) {
        const updateToast = () => {
          toast.dismiss(toastId);
          // New toast instead of update + delay for smoother effect
          setTimeout(() => {
            toast.success(
              <div>
                <div className="flex justify-center w-full">
                  <div className="w-32 h-32 xs:w-60 xs:h-60">
                    <OptimisedImage src={photoUrl} showLoader />
                  </div>
                </div>
                <p className="mt-2">Thumbnail updated 😎</p>
              </div>,
              { icon: false }
            );
          }, 300);

          endSelect();
          setIsLoading(false);
        };

        // Add artificial delay for smoother transition
        setTimeout(updateToast, 500);
      } else {
        setIsLoading(false);
        toast.error("Unable to updated thumbnail. Please try again later");
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error("Unable to updated thumbnail. Please try again later");
    }
  }
  return (
    isSelecting && (
      <div className="flex flex-row justify-center items-center gap-1">
        <button
          disabled={!numSelected || isLoading}
          className="btn-gray font-bold"
          onClick={handleChangeThumbail}>
          Set as thumbnail
        </button>
        <CancelSelectButton />
      </div>
    )
  );
}
