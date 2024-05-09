"use client";

import { useModalContext } from "./ModalContext";

export const ModalHeader = ({ children, size, closeButton }) => {
  // default md
  const fontSizes = { sm: "text-md", md: "text-xl", lg: "text-3xl" };
  const { setOpen } = useModalContext();
  return (
    <div className="w-full p-2">
      <div className="w-full flex flex-row justify-between items-center gap-2">
        <div className={`${fontSizes[size] ?? "text-xl"} mb-2 grow line-clamp-2`}>
          {children}
        </div>
        {closeButton && <button onClick={() => setOpen(false)}>x</button>}
      </div>
      <hr />
    </div>
  );
};
