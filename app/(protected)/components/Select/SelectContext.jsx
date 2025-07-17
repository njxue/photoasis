"use client";

import { createContext, useContext, useState } from "react";

const SelectContext = createContext();
export const useSelect = () => {
  return useContext(SelectContext);
};

export const SelectProvider = ({ children }) => {
  const DEFAULT_ALLOW_MULTI = true;
  const [isSelecting, setIsSelecting] = useState(false);
  const [internalSelectedItems, setInternalSelectedItems] = useState([]);
  const [allowMulti, setAllowMulti] = useState(DEFAULT_ALLOW_MULTI);
  const [mode, setMode] = useState("");

  const endSelect = () => {
    setIsSelecting(false);
    setMode("");
    setInternalSelectedItems([]);
  };

  const beginSelect = ({
    allowMultiple = DEFAULT_ALLOW_MULTI,
    mode = "",
  } = {}) => {
    setIsSelecting(true);
    setInternalSelectedItems([]);
    setAllowMulti(allowMultiple);
    setMode(mode);
  };

  const selectItem = (item, itemId) => {
    const selectedItem = { id: itemId, data: item };
    if (!allowMulti) {
      setInternalSelectedItems([selectedItem]);
      return;
    }
    if (internalSelectedItems.find((existingItem) => existingItem.id === itemId)) {
      setInternalSelectedItems(
        internalSelectedItems.filter((existingItem) => existingItem.id !== itemId)
      );
    } else {
      setInternalSelectedItems([...internalSelectedItems, selectedItem]);
    }
  };

  const numSelected = internalSelectedItems.length;

  const isSelected = (itemId) =>
    internalSelectedItems.some((existingItem) => existingItem.id === itemId);

  const selectedItems = internalSelectedItems.map((item) => item.data); // Don't return id

  const value = {
    isSelecting,
    selectedItems,
    beginSelect,
    endSelect,
    selectItem,
    numSelected,
    isSelected,
    mode,
  };
  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
};
