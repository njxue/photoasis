function ExposureMode({ label, icon, handleClick, isSelected }) {
  return (
    <div
      className={`text-[10px] cursor-pointer w-10 ${
        !isSelected && "opacity-30"
      }`}
      onClick={handleClick}>
      {icon}
      <p className={`${!isSelected && "invisible"} leading-tight text-[8px]`}>
        {label}
      </p>
    </div>
  );
}

export default ExposureMode;
