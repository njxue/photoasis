"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const DynamicModalProvider = dynamic(
  () => import("./ModalContext").then((mod) => mod.ModalProvider),
  {
    ssr: false,
  }
);

const DEFAULT_MODAL_STYLES =
  "min-w-[300px]  rounded fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center bg-gray-50";

const OVERLAY_STYLES = "fixed inset-0 bg-gray-300 bg-opacity-70 z-50";
const Modal = ({
  isOpen,
  setOpen,
  closeOnClickOutside,
  children,
  className,
}) => {
  const modalRef = useRef();
  useEffect(() => {
    // Use capture phase so we can detect clicks before React potentially removes the clicked element from the DOM
    const USE_CAPTURE = true;
    const handleClick = (e) => {
      // Clicked out
      if (!modalRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    if (isOpen && closeOnClickOutside) {
      document.addEventListener("click", handleClick, USE_CAPTURE);
    }
    return () => {
      document.removeEventListener("click", handleClick, USE_CAPTURE);
    };
  }, [isOpen, modalRef]);

  return (
    isOpen &&
    createPortal(
      <DynamicModalProvider setOpen={setOpen}>
        <div className={OVERLAY_STYLES}></div>
        <div ref={modalRef} className={`${DEFAULT_MODAL_STYLES} ${className}`}>
          {children}
        </div>
      </DynamicModalProvider>,
      document.body
    )
  );
};

export default Modal;
