import { useSelect } from "./SelectContext";

interface CancelSelectButtonProps {
  disabled?: boolean;
  className?: string;
}

export default function CancelSelectButton({
  disabled,
  className = "",
}: CancelSelectButtonProps) {
  const { endSelect } = useSelect();
  return (
    <button
      className={`btn-white font-bold ${className}`}
      onClick={endSelect}
      disabled={disabled}>
      <img src="/assets/icons/cross.svg" width={18} alt="cancel" />
      Cancel
    </button>
  );
}
