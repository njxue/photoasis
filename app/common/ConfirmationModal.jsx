"use client";
import Modal from "@app/common/Modal/Modal";
import { ModalHeader } from "@app/common/Modal/ModalHeader";
import { ModalBody } from "@app/common/Modal/ModalBody";
import SubmitButton from "@app/common/SubmitButton";

const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  onCancel,
  onConfirm,
  prompt,
}) => {
  return (
    <Modal isOpen={isOpen} setOpen={setIsOpen}>
      <ModalHeader>{prompt}</ModalHeader>
      <ModalBody>
        <form
          className="w-full"
          action={() => {
            setIsOpen(false);
            onConfirm && onConfirm();
          }}>
          <div className="flex flex-row gap-1 w-full mt-1">
            <SubmitButton text="Yes" />
            <button
              onClick={() => {
                setIsOpen(false);
                onCancel && onCancel();
              }}
              className="bg-red-700 rounded text-white w-full">
              No
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};
export default ConfirmationModal;
