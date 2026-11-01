import type { ReactNode } from "react";

interface ModalBodyProps {
  children: ReactNode;
}

export const ModalBody = ({ children }: ModalBodyProps) => {
  return <div className="h-full w-full relative p-3">{children}</div>;
};
