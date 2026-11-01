"use client";

import { createContext, useContext, type ReactNode } from "react";

interface ModalContextValue {
  setOpen: (open: boolean) => void;
}
interface ModalProviderProps extends ModalContextValue {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextValue | null>(null);
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModalContext must be used within ModalProvider");
  return context;
};
export const ModalProvider = ({
  children,
  setOpen,
}: ModalProviderProps) => {
  return (
    <ModalContext.Provider value={{ setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
