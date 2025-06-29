"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";

const SubmitButton = ({
  text,
  preventBrowserRefresh,
  disabled = false,
  disableDuration,
}) => {
  const { pending } = useFormStatus();
  const [countdown, setCountdown] = useState(0);
  const countdownIntervalRef = useRef();

  useEffect(() => {
    // Countdown
    if (pending && disableDuration) {
      setCountdown(disableDuration);

      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => (prev === 0 ? 0 : prev - 1));
      }, 1000);
    }

    // Prevent browser refresh
    if (!preventBrowserRefresh) {
      return;
    }
    const showAlert = (e) => {
      if (pending) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", showAlert);
    return () => {
      window.removeEventListener("beforeunload", showAlert);
      clearInterval(countdownIntervalRef.current);
    };
  }, [pending]);

  useEffect(() => {
    // Reset coundown
    if (countdown === 0 && disableDuration) {
      clearInterval(countdownIntervalRef.current);
    }
  }, [countdown]);

  return (
    <button
      className="btn-gray w-full h-9 text-white font-bold"
      type="submit"
      disabled={pending || disabled || countdown > 0}>
      {pending ? "Loading..." : (text ?? "Submit")}
      {countdown > 0 && (
        <span className="text-sm font-light ml-1">{`(${countdown}s)`}</span>
      )}
    </button>
  );
};

export default SubmitButton;
