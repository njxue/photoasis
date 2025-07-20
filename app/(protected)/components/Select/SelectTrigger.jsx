import { useSelect } from "./SelectContext";
export default function SelectTrigger({
  allowMultiple = true,
  mode = "",
  renderTrigger,
}) {
  const { beginSelect } = useSelect();
  return renderTrigger ? (
    <div onClick={() => beginSelect({ allowMultiple, mode })}>
      {renderTrigger}
    </div>
  ) : (
    <img
      src="/assets/icons/select.svg"
      alt="select"
      width={30}
      className="cursor-pointer"
      onClick={() => beginSelect({ allowMultiple, mode })}
    />
  );
}
