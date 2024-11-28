"use client";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { useSelect } from "./SelectContext";
import CancelSelectButton from "./CancelSelectButton";
function DeleteSelectedControls({ prompt, handleDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSelecting, numSelected, endSelect } = useSelect();

  const handleConfirm = () => {
    handleDelete();
    endSelect();
  };

  return (
    <>
      {isSelecting && (
        <div className="flex flex-row justify-center items-center gap-1">
          <button
            disabled={!numSelected}
            className="btn-red font-bold"
            onClick={() => setIsModalOpen(true)}>
            <img src="/assets/icons/trash.svg" width={20} alt="trash" />
            Delete <span>({numSelected})</span>
          </button>
          <CancelSelectButton />
          <ConfirmationModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            onConfirm={handleConfirm}
            prompt={prompt}
          />
        </div>
      )}
    </>
  );
}

export default DeleteSelectedControls;
