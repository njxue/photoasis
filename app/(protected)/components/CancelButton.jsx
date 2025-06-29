"use client";

import { useFormStatus } from "react-dom";

function CancelButton({ text, onCancel, disabled, className }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="button"
      className={`btn-white w-full h-9 font-bold ${className}`}
      disabled={pending || disabled}
      onClick={onCancel}>
      {text ?? "Cancel"}
    </button>
  );
}

export default CancelButton;
