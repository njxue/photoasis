"use client";

import { createContext, useContext } from "react";

const AlbumContext = createContext();

export const useAlbum = () => {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error("useAlbum must be used within an AlbumProvider");
  }
  return context;
};

export const AlbumProvider = ({ value, children }) => {
  return (
    <AlbumContext.Provider value={value}>{children}</AlbumContext.Provider>
  );
};
