const SelectItem = ({ children, selected, handleSelect, isSelecting }) => {
  return (
    <div
      className={`relative cursor-pointer ${
        isSelecting && !selected ? "opacity-30" : "opacity-100"
      }`}
      onClick={handleSelect}>
      {children}
      {isSelecting && selected && (
        <div className="absolute top-0 right-0 p-1 opacity-60">
          <img src="/assets/icons/tick-circle.svg" width={30} />
        </div>
      )}
    </div>
  );
};

export default SelectItem;
