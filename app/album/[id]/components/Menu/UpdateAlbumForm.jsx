import updateAlbum from "@actions/updateAlbum";
import { toast } from "react-toastify";

const UpdateAlbumForm = ({ albumData, onCancel, onSuccess }) => {
  const { aid } = albumData;
  async function handleUpdateAlbum(formdata) {
    const albumName = formdata.get("albumName");
    const res = await updateAlbum({ aid, albumName });
    if (res.status === 200) {
      onSuccess && onSuccess();
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
        defaultValue={albumData.name}
        className="px-2 py-1 rounded w-full text-3xl"
      />
      <div className="flex flex-row justify-center items-center gap-2">
        <button type="submit" className="h-full w-1/2">
          <img
            src="/assets/icons/tick.svg"
            className="h-[30px] cursor-pointer"
          />
        </button>
        <button className="h-full w-1/2">
          <img
            src="/assets/icons/cross.svg"
            className="h-[30px] cursor-pointer"
            onClick={onCancel}
          />
        </button>
      </div>
    </form>
  );
};

export default UpdateAlbumForm;
