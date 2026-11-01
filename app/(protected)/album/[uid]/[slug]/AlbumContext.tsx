"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { AlbumPageData } from "./queries";

const AlbumContext = createContext<AlbumPageData | null>(null);

interface AlbumProviderProps {
  value: AlbumPageData;
  children: ReactNode;
}

export const useAlbum = () => {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error("useAlbum must be used within an AlbumProvider");
  }
  return context;
};

export const AlbumProvider = ({
  value,
  children,
}: AlbumProviderProps) => {
  return (
    <AlbumContext.Provider value={value}>{children}</AlbumContext.Provider>
  );
};
