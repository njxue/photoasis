import React from "react";
import { useSelect } from "./SelectContext";
export default function SelectTrigger({ allowMultiple = true, mode = "" }) {
  const { isSelecting, beginSelect } = useSelect();
  return (
    !isSelecting && (
      <img
        src="/assets/icons/select.svg"
        alt="select"
        width={30}
        className="cursor-pointer"
        onClick={() => beginSelect({ allowMultiple, mode })}
      />
    )
  );
}
