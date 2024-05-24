"use client";

import { createContext, useContext, useState } from "react";

const SelectContext = createContext();
export const useSelectContext = () => {
  return useContext(SelectContext);
};

export const SelectProvider = ({ children }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const endSelect = () => {
    setIsSelecting(false);
    setSelectedItems([]);
  };
  const beginSelect = () => setIsSelecting(true);
  const selectItem = (item) => {
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
  };
  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
};
