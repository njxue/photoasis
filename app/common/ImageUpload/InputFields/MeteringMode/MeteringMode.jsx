function MeteringMode({ label, icon, handleClick, isSelected }) {
  return (
    <div
      className="flex flex-col items-center text-[8px] w-10 cursor-pointer"
      onClick={handleClick}>
      <img src={icon} width={15} className={`${!isSelected && "opacity-30"}`} />
      <p className={`${!isSelected && "invisible"} leading-tight`}>{label}</p>
    </div>
  );
}

export default MeteringMode;
