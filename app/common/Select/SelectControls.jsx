"use client";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";
import { useSelectContext } from "./SelectContext";
function SelectControls({ text, onConfirm, prompt }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSelecting, beginSelect, endSelect, numSelected } =
    useSelectContext();

  function handleConfirm() {
    onConfirm && onConfirm();
    endSelect();
  }

  return !isSelecting ? (
    <img
      src="/assets/icons/select.svg"
      width={30}
      className="cursor-pointer"
      onClick={beginSelect}
    />
  ) : (
    <div className="flex flex-row justify-center items-center gap-1">
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        disabled={!numSelected}
        className="btn-red font-bold">
        <img src="/assets/icons/trash.svg" width={20} />
        {text ?? "Submit"} <span>({numSelected})</span>
      </button>
      <button className="btn-white font-bold" onClick={endSelect}>
        <img src="/assets/icons/cross.svg" width={20} />
        Cancel
      </button>
      <ConfirmationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onConfirm={handleConfirm}
        prompt={prompt}
      />
    </div>
  );
}

export default SelectControls;
