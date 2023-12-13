"use client";

import { useModalContext } from "./ModalContext";

export const ModalHeader = ({ children, size }) => {
  // default md
  const fontSizes = { sm: "text-md", md: "text-xl", lg: "text-3xl" };
  const { setOpen } = useModalContext();
  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between items-center">
        <div
          className={`${
            fontSizes[size] ?? "text-xl"
          } flex flex-col justify-center mb-2`}>
          {children}
        </div>
        <button onClick={() => setOpen(false)}>x</button>
      </div>
      <hr />
    </div>
  );
};
