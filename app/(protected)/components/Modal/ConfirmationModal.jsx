"use client";
import Modal from "@app/(protected)/components/Modal/Modal";
import { ModalBody } from "@app/(protected)/components/Modal/ModalBody";
import SubmitButton from "@app/common/SubmitButton";
import CancelButton from "../CancelButton";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  prompt,
}) => {
  function handleConfirm() {
    onClose();
    onConfirm && onConfirm();
  }

  function handleCancel() {
    onClose();
    onCancel && onCancel();
  }

  return (
    <Modal
      isOpen={isOpen}
      setOpen={(isOpen) => {
        if (!isOpen) onClose();
      }}>
      <ModalBody>
        <div className="text-xl mb-2">{prompt}</div>
        <form className="w-full" action={handleConfirm}>
          <div className="flex flex-row gap-1 w-full mt-1">
            <CancelButton onCancel={handleCancel} />
            <SubmitButton text="Yes" />
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};
export default ConfirmationModal;
