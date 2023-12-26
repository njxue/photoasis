import { useState, useEffect } from "react";

const useSelect = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (!isSelecting) setSelectedItems([]);
  }, [isSelecting]);

  const endSelect = () => setIsSelecting(false);
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

  return {
    isSelecting,
    endSelect,
    beginSelect,
    selectItem,
    selectedItems,
    numSelected,
    isSelected,
  };
};

export { useSelect };
