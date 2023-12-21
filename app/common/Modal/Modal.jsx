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
  const widths = { sm: "30%", md: "70%", lg: "90%" };
  const heights = { sm: "25%", md: "50%", lg: "90%" };

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
      <ModalProvider setOpen={setOpen}>
        <div className="fixed inset-0 h-screen w-screen bg-gray-700 bg-opacity-50 z-50"></div>
        <div
          ref={modalRef}
          className={`h-[${heights[size] ?? "50%"}] w-[${
            widths[size] ?? "50%"
          }] min-w-[250px] max-w-[90vw] max-h-[90vh] p-2 rounded fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-50 bg-white`}
          style={style}>
          {children}
        </div>
      </ModalProvider>,
      document.body
    )
  );
};

export default Modal;
