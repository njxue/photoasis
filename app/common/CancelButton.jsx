"use client";

import { useFormStatus } from "react-dom";

function CancelButton({ text, onCancel, disabled }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn-white w-full h-9 font-bold"
      disabled={pending || disabled}
      onClick={onCancel}>
      {text ?? "Cancel"}
    </button>
  );
}

export default CancelButton;
