"use client";

import { useFormStatus } from "react-dom";

interface CancelButtonProps {
  text?: string;
  onCancel: () => void;
  disabled?: boolean;
  className?: string;
}

function CancelButton({ text, onCancel, disabled, className }: CancelButtonProps) {
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
