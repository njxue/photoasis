"use client";
import updateAlbum from "@actions/updateAlbum";
import createAlbum from "@actions/createAlbum";
import formUploadPhotos from "@utils/formUploadPhotos";
import DroppableFileInput from "@app/common/ImageUpload/DroppableFileInput";
import SubmitButton from "@app/common/SubmitButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const NewAlbumForm = () => {
  const errorMessage = "Unable to create album. Please try again later";
  const { data: session } = useSession();
  const uid = session?.user.id;
  const router = useRouter();
  async function handleCreateAlbum(formdata) {
    try {
      const albumName = formdata.get("albumName");
      const albumRes = await createAlbum({
        albumName,
      });

      if (albumRes.status !== 200) {
        toast.error(errorMessage);
        return;
      }
      const aid = albumRes.data.aid;
      const fileInfos = await formUploadPhotos(aid, uid, formdata);
      const res = await updateAlbum({ aid, photos: fileInfos });
      if (res.status === 200) {
        router.push(`/album/${aid}`);
        toast.success(`Album "${albumName}" successfully created!`);
      } else {
        toast.error(errorMessage);
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
          <label htmlFor="albumName">Album Name: </label>
          <input
            className="w-full block border border-solid border-gray-600 rounded p-1"
            type="text"
            name="albumName"
            placeholder="Album Name"
            required
          />
        </div>
        <div className="grow max-h-[100%]">
          <DroppableFileInput name="photos" />
        </div>
      </div>
      <SubmitButton text="Create" />
    </form>
  );
};

export default NewAlbumForm;
