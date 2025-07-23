"use client";

import createAlbum from "@actions/createAlbum";
import deleteAlbum from "@actions/deleteAlbum";
import DroppableFileInput from "@app/(protected)/components/ImageUpload/DroppableFileInput";
import SubmitButton from "@app/common/SubmitButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FancyInput from "@app/(protected)/components/FancyInput";
import { uploadPhotos } from "@utils/imageUploadUtils";
import { useImageUploadContext } from "@app/(protected)/components/ImageUpload/ImageUploadContext";
import useProgress from "@app/(protected)/components/Progress/useProgress";
import ProgressRing from "@app/(protected)/components/Progress/ProgressRing";
import { useState } from "react";
const NewAlbumForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const { data: session } = useSession();
  const uid = session?.user.id;
  const router = useRouter();

  const { files, hasFileError } = useImageUploadContext();
  const { incrementProgress, resetProgress, progressPercentage } = useProgress(
    files.length
  );

  const errorMessage = "Unable to create album. Please try again later";

  async function handleCreateAlbum(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const albumRes = await createAlbum({
        albumName,
      });

      if (!albumRes.ok) {
        toast.error(res.message);
        return;
      }
      const aid = albumRes.data.aid;

      // No photos
      if (files.length === 0) {
        router.push(`/album/${aid}`);
        toast.success(`Album "${albumName}" successfully created!`);
        return;
      }

      const res = await uploadPhotos(aid, uid, files, incrementProgress);
      if (res.status !== 200) {
        toast.error(res.message);
        // Rollback album creation
        await deleteAlbum(aid);
        return;
      }

      router.push(`/album/${aid}`);
      toast.success(`Album "${albumName}" successfully created!`);
    } catch (err) {
      console.log(err);
      toast.error(errorMessage);
    } finally {
      resetProgress();
      setIsLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-3 p-2 w-full h-full justify-between"
      onSubmit={handleCreateAlbum}>
      <div className="flex flex-col h-full gap-2">
        <FancyInput
          name="albumName"
          label="Album Name"
          onChange={(v) => setAlbumName(v)}
          required
        />

        <div className="grow max-h-full">
          <DroppableFileInput
            customDropzone={
              isLoading &&
              files.length > 0 && <ProgressRing progress={progressPercentage} />
            }
          />
        </div>
      </div>
      <SubmitButton
        text="Create"
        preventBrowserRefresh
        disabled={isLoading || hasFileError}
      />
    </form>
  );
};

export default NewAlbumForm;
