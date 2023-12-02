"use client";

import { useEffect, useRef } from "react";
import { ModalProvider } from "./ModalContext";

const Modal = ({ isOpen, setOpen, closeOnClickOutside, children }) => {
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
    isOpen && (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gray-700 bg-opacity-30">
        <ModalProvider setOpen={setOpen}>
          <div
            ref={modalRef}
            className="bg-white w-[70%] h-[90%] flex flex-col justify-between p-3">
            {children}
          </div>
        </ModalProvider>
      </div>
    )
  );
};

export default Modal;
