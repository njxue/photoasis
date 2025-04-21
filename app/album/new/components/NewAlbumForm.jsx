"use client";

import createAlbum from "@actions/createAlbum";
import deleteAlbum from "@actions/deleteAlbum";
import DroppableFileInput from "@app/common/ImageUpload/DroppableFileInput";
import SubmitButton from "@app/common/SubmitButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FancyInput from "@app/common/FancyInput";
import { FORM_FIELDS, uploadPhotos } from "@utils/imageUploadUtils";
import { useImageUploadContext } from "@app/common/ImageUpload/ImageUploadContext";
const NewAlbumForm = () => {
  const errorMessage = "Unable to create album. Please try again later";
  const { data: session } = useSession();
  const uid = session?.user.id;
  const router = useRouter();

  const { files } = useImageUploadContext();

  async function handleCreateAlbum(formdata) {
    try {
      const albumName = formdata.get(FORM_FIELDS.ALBUM_NAME.name);
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

      const res = await uploadPhotos(aid, uid, files);
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
    }
  }

  return (
    <form
      className="flex flex-col gap-3 p-2 w-full h-full justify-between"
      action={handleCreateAlbum}>
      <div className="flex flex-col h-full gap-2">
        <div>
          <FancyInput name="albumName" label="Album Name" required />
        </div>
        <div className="grow max-h-[100%]">
          <DroppableFileInput />
        </div>
      </div>
      <SubmitButton text="Create" preventBrowserRefresh />
    </form>
  );
};

export default NewAlbumForm;
