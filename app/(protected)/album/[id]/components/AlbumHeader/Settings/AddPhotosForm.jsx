"use client";
import Modal from "@app/(protected)/components/Modal/Modal";
import { ModalBody } from "@app/(protected)/components/Modal/ModalBody";
import SubmitButton from "@app/common/SubmitButton";
import { useSession } from "next-auth/react";
import { uploadPhotos } from "@utils/imageUploadUtils";
import DroppableFileInput from "@app/(protected)/components/ImageUpload/DroppableFileInput";
import { toast } from "react-toastify";
import CancelButton from "@app/(protected)/components/CancelButton";
import { useImageUploadContext } from "@app/(protected)/components/ImageUpload/ImageUploadContext";
import { useState } from "react";
import useProgress from "@app/(protected)/components/Progress/useProgress";
import ProgressRing from "@app/(protected)/components/Progress/ProgressRing";
import { useAlbum } from "../../../AlbumContext";

const AddPhotosForm = ({ show, setShow }) => {
  const [isLoading, setIsLoading] = useState(false);
  const album = useAlbum();
  const { resetFiles, files, hasFileError } = useImageUploadContext();
  const { data: session } = useSession();
  const { incrementProgress, resetProgress, progressPercentage } = useProgress(
    files.length
  );

  const errorMessage = "Unable to add photo(s). Please try again later";

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await uploadPhotos(
        album.aid,
        session?.user.id,
        files,
        incrementProgress
      );

      if (res.status !== 200) {
        toast.error(res.message);
        return;
      }

      toast.success("New photo(s) added!");
      resetFiles();
      setShow(false);
    } catch (err) {
      console.error(err);
      toast.error(errorMessage);
    } finally {
      resetProgress();
      setIsLoading(false);
    }
  }
  return (
    <Modal isOpen={show} setOpen={setShow}>
      <ModalBody>
        <div className="h-[90vh] w-[80vw]">
          <form
            className="flex flex-col gap-3 p-2 w-full h-full justify-between"
            onSubmit={handleSubmit}
            noValidate>
            <DroppableFileInput
              customDropzone={
                isLoading && <ProgressRing progress={progressPercentage} />
              }
              required
            />
            <div className="flex flex-row gap-2">
              <CancelButton
                onCancel={() => setShow(false)}
                disabled={isLoading}
              />
              <SubmitButton
                text="Add Photos"
                preventBrowserRefresh
                disabled={files.length === 0 || isLoading || hasFileError}
              />
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddPhotosForm;
