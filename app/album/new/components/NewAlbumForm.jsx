"use client";
import updateAlbum from "@actions/updateAlbum";
import createAlbum from "@actions/createAlbum";
import formUploadPhotos from "@utils/formUploadPhotos";
import DroppableFileInput from "@app/common/ImageUpload/DroppableFileInput";
import SubmitButton from "@app/common/SubmitButton";
import { useSession } from "next-auth/react";
const NewAlbumForm = () => {
  const { data: session } = useSession();
  const uid = session?.user.id;

  async function handleCreateAlbum(formdata) {
    try {
      const albumName = formdata.get("albumName");
      const albumRes = await createAlbum({
        albumName,
      });

      if (albumRes.status !== 200) {
        // Handle error
      }
      const aid = albumRes.data.aid;
      const fileInfos = await formUploadPhotos(aid, uid, formdata);
      await updateAlbum({ aid, photos: fileInfos });
    } catch (err) {
      console.log(err);
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
