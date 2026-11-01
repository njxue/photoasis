"use client";

import { useFormStatus } from "react-dom";
import { useEffect, type ReactNode } from "react";

interface SubmitButtonProps {
  text?: ReactNode;
  preventBrowserRefresh?: boolean;
  disabled?: boolean;
  countdownMs?: number | null;
}

const SubmitButton = ({
  text,
  preventBrowserRefresh,
  disabled = false,
  countdownMs = 0,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const countdown = countdownMs ?? 0;
  const countdownSeconds = Math.ceil(countdown / 1000);

  useEffect(() => {
    if (!preventBrowserRefresh) return;

    const showAlert = (event: BeforeUnloadEvent) => {
      if (pending) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", showAlert);
    return () => window.removeEventListener("beforeunload", showAlert);
  }, [pending, preventBrowserRefresh]);

  return (
    <button
      className="btn-gray w-full h-9 text-white font-bold"
      type="submit"
      disabled={pending || disabled || countdownMs == null || countdown > 0}>
      {pending ? "Loading..." : (text ?? "Submit")}
      {countdown > 0 && (
        <span className="text-sm font-light ml-1">({countdownSeconds}s)</span>
      )}
    </button>
  );
};

export default SubmitButton;
