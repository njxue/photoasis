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
    <div className="p-2 flex flex-row gap-2 opacity-50 hover:opacity-100">
      <div className="bg-black rounded flex flex-row items-center gap-2 p-1">
        <button
          className="aspect-square w-4 opacity-80 disabled:opacity-50"
          onClick={handleDownload}
          disabled={isDownloading}>
          <img src="/assets/icons/download.svg" />
        </button>
        {isDownloading && (
          <div className="w-4 text-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
}
export default DownloadPhoto;
