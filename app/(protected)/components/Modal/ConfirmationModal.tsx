"use client";
import Modal from "@app/(protected)/components/Modal/Modal";
import { ModalBody } from "@app/(protected)/components/Modal/ModalBody";
import SubmitButton from "@app/common/SubmitButton";
import CancelButton from "../CancelButton";
import type { ReactNode } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm?: () => void | Promise<void>;
  prompt: ReactNode;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  prompt,
}: ConfirmationModalProps) => {
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
