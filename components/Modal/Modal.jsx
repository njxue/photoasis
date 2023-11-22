"use client";

import { ModalProvider } from "./ModalContext";

const Modal = ({ isOpen, setOpen, children }) => {
  return (
    <div>
      {isOpen && (
        <ModalProvider setOpen={setOpen}>
          <div className="fixed inset-0 bg-gray-700 bg-opacity-80 backdrop-blur-sm flex flex-col justify-center items-center z-50">
            <div className="bg-white w-[70%] h-[90%] flex flex-col justify-between p-3">
              {children}
            </div>
          </div>
        </ModalProvider>
      )}
    </div>
  );
};

export default Modal;
