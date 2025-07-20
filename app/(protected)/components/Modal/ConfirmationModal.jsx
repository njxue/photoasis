"use client";
import Modal from "@app/(protected)/components/Modal/Modal";
import { ModalBody } from "@app/(protected)/components/Modal/ModalBody";
import SubmitButton from "@app/common/SubmitButton";
import CancelButton from "../CancelButton";

const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  onCancel,
  onConfirm,
  prompt,
}) => {
  function handleConfirm() {
    setIsOpen(false);
    onConfirm && onConfirm();
  }

  function handleCancel() {
    setIsOpen(false);
    onCancel && onCancel();
  }

  return (
    <Modal isOpen={isOpen} setOpen={setIsOpen}>
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
