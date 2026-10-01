import { useSelect } from "./SelectContext";

// itemId must be a primitive for identity comparison
const SelectableItem = ({ children, item, itemId }) => {
  const { isSelecting, isSelected, selectItem } = useSelect();

  return (
    <div
      className={`relative cursor-pointer ${
        isSelecting && !isSelected(itemId) ? "opacity-30" : "opacity-100"
      }`}
      onClick={() => selectItem(item, itemId)}>
      <div className={`${isSelecting && "pointer-events-none"}`}>
        {children}
      </div>
      {isSelecting && isSelected(itemId) && (
        <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md">
          <img src="/assets/icons/bold-tick.svg" width={16} alt="tick" />
        </div>
      )}
    </div>
  );
};

export default SelectableItem;
