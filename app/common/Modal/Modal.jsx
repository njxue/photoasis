"use client";

import { useEffect, useRef } from "react";
import { ModalProvider } from "./ModalContext";
import { createPortal } from "react-dom";

const MODAL_STYLES =
  "min-w-[250px] max-w-[90vw] max-h-[90vh] rounded fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center bg-white";
const OVERLAY_STYLES = "fixed inset-0 bg-gray-700 bg-opacity-50 z-50";
const Modal = ({ isOpen, setOpen, closeOnClickOutside, children }) => {
  const modalRef = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      // Clicked out
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
        <div className={OVERLAY_STYLES}></div>
        <div ref={modalRef} className={MODAL_STYLES}>
          {children}
        </div>
      </ModalProvider>,
      document.body
    )
  );
};

export default Modal;
