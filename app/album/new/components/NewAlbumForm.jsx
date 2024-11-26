"use client";
import updateAlbum from "@actions/updateAlbum";
import createAlbum from "@actions/createAlbum";
import deleteAlbum from "@actions/deleteAlbum";
import formUploadPhotos from "@utils/formUploadPhotos";
import DroppableFileInput from "@app/common/ImageUpload/DroppableFileInput";
import SubmitButton from "@app/common/SubmitButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FancyInput from "@app/common/FancyInput";
import { formatFormData } from "@utils/formatFormData";
import { useImageUploadContext } from "@app/common/ImageUpload/ImageUploadContext";
const NewAlbumForm = () => {
  const errorMessage = "Unable to create album. Please try again later";
  const { data: session } = useSession();
  const uid = session?.user.id;
  const router = useRouter();

  const { filesForUpload } = useImageUploadContext();

  async function handleCreateAlbum(formdata) {
    try {
      const formattedFormData = formatFormData(formdata, filesForUpload);
      const albumName = formattedFormData.get("albumName");
      const albumRes = await createAlbum({
        albumName,
      });

      if (!albumRes.ok) {
        toast.error(res.message);
        return;
      }
      const aid = albumRes.data.aid;

      // No photos
      if (formattedFormData.getAll("photos")[0].name === "") {
        router.push(`/album/${aid}`);
        toast.success(`Album "${albumName}" successfully created!`);
        return;
      }

      const b2UploadRes = await formUploadPhotos(aid, uid, formattedFormData);
      if (b2UploadRes.status !== 200) {
        toast.error(b2UploadRes.message);
        // Rollback album creation
        await deleteAlbum(aid);
        return;
      }

      const fileInfos = b2UploadRes.data;
      const res = await updateAlbum({ aid, photos: fileInfos });
      if (res.ok) {
        router.push(`/album/${aid}`);
        toast.success(`Album "${albumName}" successfully created!`);
      } else {
        toast.error(errorMessage);
        await deleteAlbum(aid);
      }
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
          <DroppableFileInput name="photos" />
        </div>
      </div>
      <SubmitButton text="Create" preventBrowserRefresh />
    </form>
  );
};

export default NewAlbumForm;
