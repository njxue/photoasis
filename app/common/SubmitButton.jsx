"use client";

import { useFormStatus } from "react-dom";
import { useEffect } from "react";

const SubmitButton = ({ text, preventBrowserRefresh }) => {
  const { pending } = useFormStatus();
  useEffect(() => {
    if (!preventBrowserRefresh) {
      return;
    }
    const showAlert = (e) => {
      if (true) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", showAlert);
    return () => {
      window.removeEventListener("beforeunload", showAlert);
    };
  }, [pending]);

  return (
    <button
      className="btn-green w-full h-9 text-white font-bold"
      type="submit"
      disabled={pending}>
      {pending ? "Loading..." : text ?? "Submit"}
    </button>
  );
};

export default SubmitButton;
