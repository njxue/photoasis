import { useSelect } from "./SelectContext";
export default function SelectTrigger({
  allowMultiple = true,
  mode = "",
  renderTrigger,
}) {
  const { beginSelect } = useSelect();
  return (
    <button
      onClick={() => beginSelect({ allowMultiple, mode })}
      className="w-full">
      {renderTrigger ? (
        renderTrigger
      ) : (
        <img src="/assets/icons/select.svg" alt="select" width={30} />
      )}
    </button>
  );
}
