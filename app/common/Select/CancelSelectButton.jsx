import { useSelect } from "./SelectContext";

export default function CancelSelectButton() {
  const { endSelect } = useSelect();
  return (
    <button className="btn-white font-bold" onClick={endSelect}>
      <img src="/assets/icons/cross.svg" width={20} alt="cross" />
      Cancel
    </button>
  );
}
