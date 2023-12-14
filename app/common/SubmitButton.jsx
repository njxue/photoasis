"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = ({ style, text }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-green-500 w-full h-9 text-white px-2 rounded"
      type="submit">
      {pending ? "Loading..." : text ?? "Submit"}
    </button>
  );
};

export default SubmitButton;
