import { b2GetDownloadUrl } from "@actions/b2";
import LoadingSpinner from "@app/common/LoadingSpinner";
import { useState } from "react";
import { toast } from "react-toastify";

function DownloadPhoto({ photo }) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    setIsDownloading(true);
    const toastId = toast.loading(`Downloading ${photo.name}`);

    try {
      const downloadUrl = await b2GetDownloadUrl(
        photo.uid,
        photo.aid,
        photo.name
      );
      window.location.href = downloadUrl;
      toast.update(toastId, {
        render: `${photo.name} downloaded`,
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: `Failed to download ${photo.name}`,
        type: toast.TYPE.ERROR,
        autoClose: 3000,
        isLoading: false,
      });
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <button
      type="button"
      className={`download flex min-h-11 items-center rounded-md bg-white/5 px-3 py-2 opacity-85 transition hover:bg-white/10 hover:opacity-100 active:scale-[0.98] sm:min-h-10 ${
        isDownloading && "pointer-events-none"
      }`}
      onClick={handleDownload}>
      <div className="flex flex-row items-center gap-2">
        <img src="/assets/icons/download.svg" alt="" className="h-4 w-4" />

        {isDownloading && (
          <div className="h-4 w-4 text-center">
            <LoadingSpinner />
          </div>
        )}
        <span className="font-sans text-sm text-gray-300">Download</span>
      </div>
    </button>
  );
}
export default DownloadPhoto;
