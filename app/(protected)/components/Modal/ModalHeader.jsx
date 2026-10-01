"use client";

import { useModalContext } from "./ModalContext";

export const ModalHeader = ({ children, size, closeButton }) => {
  // default md
  const fontSizes = { sm: "text-md", md: "text-xl", lg: "text-3xl" };
  const { setOpen } = useModalContext();
  return (
    <div className="w-full px-4 pt-4">
      <div className="w-full flex flex-row justify-between items-center gap-2">
        <div className={`${fontSizes[size] ?? "text-xl"} mb-3 grow line-clamp-2 font-semibold tracking-tight`}>
          {children}
        </div>
        {closeButton && (
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center border border-black/20 text-lg hover:border-black"
            aria-label="Close modal">
            ×
          </button>
        )}
      </div>
      <hr />
    </div>
  );
};
