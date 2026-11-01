import { useSelect } from "./SelectContext";
import type { ReactNode } from "react";
interface SelectTriggerProps {
  allowMultiple?: boolean;
  mode?: string;
  renderTrigger?: ReactNode;
}
export default function SelectTrigger({
  allowMultiple = true,
  mode = "",
  renderTrigger,
}: SelectTriggerProps) {
  const { beginSelect } = useSelect();
  return (
    <button
      onClick={() => beginSelect({ allowMultiple, mode })}
      className="w-full">
      {renderTrigger ? (
        renderTrigger
      ) : (
        <span className="secondary-action w-full">
          <img src="/assets/icons/select.svg" alt="" className="h-4 w-4" />
          Select
        </span>
      )}
    </button>
  );
}
