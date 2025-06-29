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
    <div
      className={`flex flex-row gap-2 opacity-50 hover:opacity-100 cursor-pointer ${
        isDownloading && "pointer-events-none"
      }`}
      onClick={handleDownload}>
      <div className="bg-black rounded flex flex-row items-center gap-2 p-1">
        <img src="/assets/icons/download.svg" className="w-4" />

        {isDownloading && (
          <div className="w-4 text-center">
            <LoadingSpinner />
          </div>
        )}
        <span className="text-gray-400 text-sm font-sans">Download</span>
      </div>
    </div>
  );
}
export default DownloadPhoto;
