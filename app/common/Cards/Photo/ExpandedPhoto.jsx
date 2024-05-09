import Modal from "@app/common/Modal/Modal";
import ExpandedPhotoInfo from "./ExpandedPhotoInfo";
import OptimisedImage from "../../OptimisedImage";
const ExpandedPhoto = ({ expandPhoto, setExpandPhoto, photo }) => {
  return (
    <Modal isOpen={expandPhoto} setOpen={setExpandPhoto} closeOnClickOutside>
      <OptimisedImage src={photo.url} name={photo.name} />
      <div className="absolute top-0 right-0">
        <ExpandedPhotoInfo photo={photo} />
      </div>
    </Modal>
  );
};

export default ExpandedPhoto;
