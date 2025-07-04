import updateAlbum from "@actions/updateAlbum";
import { useAlbum } from "../../../AlbumContext";
import { FORM_FIELDS } from "@utils/imageUploadUtils";
import { toast } from "react-toastify";

const UpdateAlbumForm = ({ onClose = () => {} }) => {
  const album = useAlbum();

  async function handleUpdateAlbum(formdata) {
    const albumName = formdata.get(FORM_FIELDS.ALBUM_NAME.name);
    const res = await updateAlbum({ aid: album.aid, albumName });
    if (res.ok) {
      onClose();
      // toast.success("Album successfully updated");
    } else {
      toast.error("Unable to update album. Please try again later");
    }
  }
  return (
    <form
      className="relative flex items-center grow gap-2 md:flex-row mr-2"
      action={handleUpdateAlbum}>
      <input
        type="text"
        name="albumName"
        defaultValue={album.name}
        className="py-1 pl-2 pr-[80px] rounded w-full text-xl md:text-3xl bg-transparent focus:bg-black/70 focus:ring-2 focus:ring-white transition"
      />
      <div className="absolute right-2 flex flex-row justify-center items-center gap-2">
        <button type="submit" className="h-full w-1/2">
          <img
            src="/assets/icons/tick-white.svg"
            className="h-[30px] cursor-pointer"
            alt="tick"
          />
        </button>
        <button className="h-full w-1/2">
          <img
            src="/assets/icons/cross-white.svg"
            alt="cross"
            className="h-[25px] cursor-pointer"
            onClick={onClose}
          />
        </button>
      </div>
    </form>
  );
};

export default UpdateAlbumForm;
