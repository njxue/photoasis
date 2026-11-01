"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ModalProvider } from "./ModalContext";

const DEFAULT_MODAL_STYLES =
  "min-w-[300px] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center border border-black bg-white shadow-[10px_10px_0_rgba(0,0,0,0.18)]";

const OVERLAY_STYLES = "fixed inset-0 bg-black/55 backdrop-blur-sm z-50";
interface ModalProps {
  isOpen: boolean;
  setOpen?: (open: boolean) => void;
  closeOnClickOutside?: boolean;
  children: ReactNode;
  className?: string;
}
const Modal = ({
  isOpen,
  setOpen = () => undefined,
  closeOnClickOutside,
  children,
  className,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Clicked out
      if (event.target instanceof Node && !modalRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    // Use capture phase so we can detect clicks before React potentially removes the clicked element from the DOM
    const USE_CAPTURE = true;

    if (isOpen && closeOnClickOutside) {
      document.addEventListener("click", handleClick, USE_CAPTURE);
    }
    return () => {
      document.removeEventListener("click", handleClick, USE_CAPTURE);
    };
  }, [isOpen, setOpen, closeOnClickOutside]);

  return (
    isOpen &&
    createPortal(
      <ModalProvider setOpen={setOpen}>
        <div className={OVERLAY_STYLES}></div>
        <div ref={modalRef} className={`${DEFAULT_MODAL_STYLES} ${className}`}>
          {children}
        </div>
      </ModalProvider>,
      document.body
    )
  );
};

export default Modal;
