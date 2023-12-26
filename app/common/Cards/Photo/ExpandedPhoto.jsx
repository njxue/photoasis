import Modal from "@app/common/Modal/Modal";
import { ModalBody } from "@app/common/Modal/ModalBody";
import ExpandedPhotoInfo from "./ExpandedPhotoInfo";
import OptimisedImage from "../../OptimisedImage";
const ExpandedPhoto = ({ expandPhoto, setExpandPhoto, photo }) => {
  return (
    <Modal
      isOpen={expandPhoto}
      setOpen={setExpandPhoto}
      style={{ width: "auto", height: "auto", padding: "1px" }}
      closeOnClickOutside
      size="md">
      <ModalBody>
        <OptimisedImage src={photo.url} name={photo.name} />
        <div className="absolute top-0 right-0">
          <ExpandedPhotoInfo photo={photo} />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ExpandedPhoto;
