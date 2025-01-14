"use client";

import { createContext, useContext, useState } from "react";

const SelectContext = createContext();
export const useSelect = () => {
  return useContext(SelectContext);
};

export const SelectProvider = ({ children }) => {
  const DEFAULT_ALLOW_MULTI = true;
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [allowMulti, setAllowMulti] = useState(DEFAULT_ALLOW_MULTI);
  const [mode, setMode] = useState("");

  const endSelect = () => {
    setIsSelecting(false);
    setSelectedItems([]);
  };
  const beginSelect = ({
    allowMultiple = DEFAULT_ALLOW_MULTI,
    mode = "",
  } = {}) => {
    setIsSelecting(true);
    setSelectedItems([]);
    setAllowMulti(allowMultiple);
    setMode(mode);
  };

  const selectItem = (item) => {
    if (!allowMulti) {
      setSelectedItems([item]);
      return;
    }
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const numSelected = selectedItems.length;
  const isSelected = (item) => selectedItems.includes(item);

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
