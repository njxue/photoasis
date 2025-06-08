import ExpandedPhotoInfo from "./ExpandedPhotoInfo";
import OptimisedImage from "../../Image/OptimisedImage";
import DownloadPhoto from "./DownloadPhoto";
import { QUALITY_MID } from "@app/common/Image/constants";
import { useState } from "react";
const ExpandedPhoto = ({ photo, onClose }) => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className="relative">
      <OptimisedImage
        src={photo.url}
        name={photo.name}
        quality={QUALITY_MID}
        priority
        sizes="100vw"
        showLoader
        onLoad={() => setShowButtons(true)}
      />
      {showButtons && (
        <>
          <div className="absolute top-0 left-0">
            <ExpandedPhotoInfo photo={photo} priority />
          </div>
          <div className="absolute top-0 right-0 p-2">
            <img
              src="/assets/icons/cross-square.svg"
              className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity w-6"
              onClick={onClose}
            />
          </div>
          <div className="absolute bottom-0 left-0">
            <DownloadPhoto photo={photo} />
          </div>
        </>
      )}
    </div>
  );
};

export default ExpandedPhoto;
