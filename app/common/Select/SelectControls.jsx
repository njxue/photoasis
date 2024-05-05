"use client";
import { useState } from "react";
import ConfirmationModal from "../ConfirmationModal";

const SelectControls = ({
  isSelecting,
  beginSelect,
  endSelect,
  numSelected,
  handleSubmit,
  prompt,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <>
      {!isSelecting ? (
        <img
          src="/assets/icons/select.svg"
          width={30}
          className="cursor-pointer"
          onClick={beginSelect}
        />
      ) : (
        <div className="flex flex-row justify-center items-center gap-1">
          <button
            onClick={() => setIsConfirming(true)}
            disabled={!numSelected}
            className="btn-red font-bold">
            <img src="/assets/icons/trash.svg" width={20} />
            Delete <span>({numSelected})</span>
          </button>
          <button className="btn-white font-bold" onClick={endSelect}>
            <img src="/assets/icons/cross.svg" width={20} />
            Cancel
          </button>
        </div>
      )}

      <ConfirmationModal
        isOpen={isConfirming}
        setIsOpen={setIsConfirming}
        onConfirm={handleSubmit}
        prompt={prompt}
      />
    </>
  );
};

export default SelectControls;
