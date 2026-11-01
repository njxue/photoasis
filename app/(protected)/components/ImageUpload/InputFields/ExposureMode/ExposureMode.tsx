interface ExposureModeProps {
  label: string;
  icon: string;
  handleClick: () => void;
  isSelected: boolean;
}
function ExposureMode({ label, icon, handleClick, isSelected }: ExposureModeProps) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`text-[10px] w-10 ${
        isSelected ? "opacity-100" : "opacity-30"
      }`}>
      {icon}
      <p className={`${!isSelected && "invisible"} leading-tight text-[8px]`}>
        {label}
      </p>
    </button>
  );
}

export default ExposureMode;
