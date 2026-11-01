"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SelectItemId = string | number;
interface SelectedItem { id: SelectItemId; data: unknown }
interface BeginSelectOptions { allowMultiple?: boolean; mode?: string }
interface SelectContextValue {
  isSelecting: boolean;
  selectedItems: unknown[];
  beginSelect: (options?: BeginSelectOptions) => void;
  endSelect: () => void;
  selectItem: (item: unknown, itemId: SelectItemId) => void;
  numSelected: number;
  isSelected: (itemId: SelectItemId) => boolean;
  mode: string;
}
interface SelectProviderProps {
  children: ReactNode;
}

const SelectContext = createContext<SelectContextValue | null>(null);
export const useSelect = <Item = unknown>() => {
  const context = useContext(SelectContext);
  if (!context) throw new Error("useSelect must be used within SelectProvider");
  return { ...context, selectedItems: context.selectedItems as Item[] };
};

export const SelectProvider = ({ children }: SelectProviderProps) => {
  const DEFAULT_ALLOW_MULTI = true;
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [internalSelectedItems, setInternalSelectedItems] = useState<SelectedItem[]>([]);
  const [allowMulti, setAllowMulti] = useState<boolean>(DEFAULT_ALLOW_MULTI);
  const [mode, setMode] = useState<string>("");

  const endSelect = () => {
    setIsSelecting(false);
    setMode("");
    setInternalSelectedItems([]);
  };

  const beginSelect = ({
    allowMultiple = DEFAULT_ALLOW_MULTI,
    mode = "",
  }: BeginSelectOptions = {}) => {
    setIsSelecting(true);
    setInternalSelectedItems([]);
    setAllowMulti(allowMultiple);
    setMode(mode);
  };

  const selectItem = (item: unknown, itemId: SelectItemId) => {
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

  const isSelected = (itemId: SelectItemId) =>
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
