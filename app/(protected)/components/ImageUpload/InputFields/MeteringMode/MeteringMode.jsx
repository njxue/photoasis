function MeteringMode({ label, icon, handleClick, isSelected }) {
  return (
    <button
      type="button"
      className={`flex flex-col items-center text-[8px] w-10 ${isSelected ? "opacity-100" : "opacity-30"}`}
      onClick={handleClick}>
      <img src={icon} width={15} alt={label} />
      <p className={`${!isSelected && "invisible"} leading-tight`}>{label}</p>
    </button>
  );
}

export default MeteringMode;
