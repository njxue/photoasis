import Modal from "@app/common/Modal/Modal";
import ExpandedPhotoInfo from "./ExpandedPhotoInfo";
import OptimisedImage from "../../Image/OptimisedImage";
import DownloadPhoto from "./DownloadPhoto";
import { QUALITY_MAX } from "@app/common/Image/constants";
const ExpandedPhoto = ({ expandPhoto, setExpandPhoto, photo }) => {
  return (
    <Modal isOpen={expandPhoto} setOpen={setExpandPhoto} closeOnClickOutside>
      <OptimisedImage
        src={photo.url}
        name={photo.name}
        quality={QUALITY_MAX}
        priority
      />
      <div className="absolute top-0 right-0">
        <ExpandedPhotoInfo photo={photo} />
      </div>
      <div className="absolute top-0 left-0">
        <DownloadPhoto photo={photo} />
      </div>
    </Modal>
  );
};

export default ExpandedPhoto;
