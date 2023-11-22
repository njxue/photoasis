"use client";

import { createContext, useContext } from "react";

const ModalContext = createContext();
export const useModalContext = () => {
  return useContext(ModalContext);
};
export const ModalProvider = ({ children, setOpen }) => {
  return (
    <ModalContext.Provider value={{ setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
