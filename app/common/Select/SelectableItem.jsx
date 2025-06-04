import { useEffect } from "react";
import { useSelect } from "./SelectContext";

const SelectableItem = ({ children, item, comparator }) => {
  const { isSelecting, isSelected, selectItem, setComparator } = useSelect();

  useEffect(() => {
    if (comparator) {
      setComparator(() => comparator);
    }
  }, [comparator]);

  return (
    <div
      className={`relative cursor-pointer ${
        isSelecting && !isSelected(item) ? "opacity-30" : "opacity-100"
      }`}
      onClick={() => selectItem(item)}>
      <div className={`${isSelecting && "pointer-events-none"}`}>
        {children}
      </div>
      {isSelecting && isSelected(item) && (
        <div className="absolute top-0 right-0 p-1 bg-green-500 opacity-90">
          <img src="/assets/icons/bold-tick.svg" width={16} alt="tick" />
        </div>
      )}
    </div>
  );
};

export default SelectableItem;
