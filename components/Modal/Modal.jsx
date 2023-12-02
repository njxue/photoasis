"use client";

import { ModalProvider } from "./ModalContext";

const Modal = ({ isOpen, setOpen, children }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gray-700 bg-opacity-30">
        <ModalProvider setOpen={setOpen}>
          <div className="bg-white w-[70%] h-[90%] flex flex-col justify-between p-3">
            {children}
          </div>
        </ModalProvider>
      </div>
    )
  );
};

export default Modal;
