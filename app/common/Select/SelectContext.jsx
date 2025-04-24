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
  const [comparator, setComparator] = useState(() => (a, b) => a === b);

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
    if (
      selectedItems.find((existingItem) => comparator?.(existingItem, item))
    ) {
      setSelectedItems(
        selectedItems.filter(
          (existingItem) => !comparator?.(existingItem, item)
        )
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const numSelected = selectedItems.length;
  const isSelected = (item) =>
    selectedItems.find((existingItem) => comparator?.(existingItem, item)) !=
    null;

  const value = {
    isSelecting,
    selectedItems,
    beginSelect,
    endSelect,
    selectItem,
    numSelected,
    isSelected,
    mode,
    setComparator,
  };
  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
};
