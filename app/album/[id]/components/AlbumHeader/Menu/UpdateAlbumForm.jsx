import updateAlbum from "@actions/updateAlbum";
import { useAlbum } from "@app/album/[id]/AlbumContext";
import { FORM_FIELDS } from "@utils/imageUploadUtils";
import { toast } from "react-toastify";

const UpdateAlbumForm = ({ setIsEditing }) => {
  const album = useAlbum();

  async function handleUpdateAlbum(formdata) {
    const albumName = formdata.get(FORM_FIELDS.ALBUM_NAME.name);
    const res = await updateAlbum({ aid: album.aid, albumName });
    if (res.ok) {
      setIsEditing(false);
      toast.success("Album successfully updated");
    } else {
      toast.error("Unable to update album. Please try again later");
    }
  }
  return (
    <form
      className="flex flex-col items-center grow gap-2 md:flex-row"
      action={handleUpdateAlbum}>
      <input
        type="text"
        name="albumName"
        defaultValue={album.name}
        className="px-2 py-1 rounded w-full text-3xl"
      />
      <div className="flex flex-row justify-center items-center gap-2">
        <button type="submit" className="h-full w-1/2">
          <img
            src="/assets/icons/tick.svg"
            className="h-[30px] cursor-pointer"
            alt="tick"
          />
        </button>
        <button className="h-full w-1/2">
          <img
            src="/assets/icons/cross.svg"
            alt="cross"
            className="h-[30px] cursor-pointer"
            onClick={() => setIsEditing(false)}
          />
        </button>
      </div>
    </form>
  );
};

export default UpdateAlbumForm;
