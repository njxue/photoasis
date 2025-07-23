import { useSelect } from "./SelectContext";

export default function CancelSelectButton({ disabled }) {
  const { endSelect } = useSelect();
  return (
    <button
      className="btn-white font-bold"
      onClick={endSelect}
      disabled={disabled}>
      <img src="/assets/icons/cross.svg" width={18} alt="cancel" />
      Cancel
    </button>
  );
}
