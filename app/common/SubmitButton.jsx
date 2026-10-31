"use client";

import { useFormStatus } from "react-dom";
import { useEffect } from "react";

const SubmitButton = ({
  text,
  preventBrowserRefresh,
  disabled = false,
  countdownMs = 0,
}) => {
  const { pending } = useFormStatus();
  const countdownSeconds = Math.ceil(countdownMs / 1000);

  useEffect(() => {
    if (!preventBrowserRefresh) return;

    const showAlert = (e) => {
      if (pending) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", showAlert);
    return () => window.removeEventListener("beforeunload", showAlert);
  }, [pending, preventBrowserRefresh]);

  return (
    <button
      className="btn-gray w-full h-9 text-white font-bold"
      type="submit"
      disabled={pending || disabled || countdownMs == null || countdownMs > 0}>
      {pending ? "Loading..." : (text ?? "Submit")}
      {countdownMs > 0 && (
        <span className="text-sm font-light ml-1">({countdownSeconds}s)</span>
      )}
    </button>
  );
};

export default SubmitButton;
