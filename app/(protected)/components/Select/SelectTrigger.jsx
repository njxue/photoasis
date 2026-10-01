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
        <span className="secondary-action">
          <img src="/assets/icons/select.svg" alt="" className="h-4 w-4" />
          Select
        </span>
      )}
    </button>
  );
}
