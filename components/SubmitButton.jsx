"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return <button type="submit">{pending ? "Loading..." : "Submit"}</button>;
};

export default SubmitButton;
