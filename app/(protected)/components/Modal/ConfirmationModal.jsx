"use client";
import Modal from "@app/(protected)/components/Modal/Modal";
import { ModalHeader } from "@app/(protected)/components/Modal/ModalHeader";
import { ModalBody } from "@app/(protected)/components/Modal/ModalBody";
import SubmitButton from "@app/common/SubmitButton";
import { useState } from "react";
import CancelButton from "../CancelButton";

const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  onCancel,
  onConfirm,
  prompt,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  function handleConfirm() {
    setIsOpen(false);
    onConfirm && onConfirm();
    setIsSubmitting(false);
  }

  function handleCancel() {
    setIsOpen(false);
    onCancel && onCancel();
    setIsSubmitting(false);
  }

  return (
    <Modal isOpen={isOpen} setOpen={setIsOpen}>
      <ModalBody>
        <div className="text-xl mb-2">{prompt}</div>
        <form
          className="w-full"
          action={handleConfirm}
          onSubmit={() => {
            setIsSubmitting(true);
          }}>
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
