"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = ({ text }) => {
  const { pending } = useFormStatus();
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
