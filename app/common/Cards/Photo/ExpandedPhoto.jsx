import Modal from "@app/common/Modal/Modal";
import ExpandedPhotoInfo from "./ExpandedPhotoInfo";
import OptimisedImage from "../../Image/OptimisedImage";
import DownloadPhoto from "./DownloadPhoto";
import { QUALITY_MAX, QUALITY_MID } from "@app/common/Image/constants";
import { useState } from "react";
const ExpandedPhoto = ({ expandPhoto, setExpandPhoto, photo }) => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <Modal
      isOpen={expandPhoto}
      setOpen={setExpandPhoto}
      closeOnClickOutside
      className="bg-transparent">
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
          <div className="absolute top-0 right-0">
            <ExpandedPhotoInfo photo={photo} />
          </div>
          <div className="absolute top-0 left-0">
            <DownloadPhoto photo={photo} />
          </div>
        </>
      )}
    </Modal>
  );
};

export default ExpandedPhoto;
