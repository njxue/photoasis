"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className="bg-green-200" type="submit">
      {pending ? "Loading..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
