"use client";

import { useEffect, useRef } from "react";
import { ModalProvider } from "./ModalContext";
import { createPortal } from "react-dom";

const Modal = ({
  isOpen,
  setOpen,
  closeOnClickOutside,
  children,
  size,
  style,
}) => {
  const widths = { sm: "30vw", md: "70vw", lg: "70vw" };
  const heights = { sm: "25vh", md: "50vh", lg: "90vh" };

  const modalRef = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    if (isOpen && closeOnClickOutside) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen, modalRef]);

  return (
    isOpen &&
    createPortal(
      <div className="h-screen w-screen fixed inset-0 flex flex-col items-center justify-center z-50 bg-gray-700 bg-opacity-30">
        <ModalProvider setOpen={setOpen}>
          <div
            ref={modalRef}
            className={`bg-white w-[${widths[size] ?? "90vw"}] h-[${
              heights[size] ?? "80vh"
            }] flex flex-col justify-between p-3 rounded`}
            style={style}>
            {children}
          </div>
        </ModalProvider>
      </div>,
      document.body
    )
  );
};

export default Modal;
