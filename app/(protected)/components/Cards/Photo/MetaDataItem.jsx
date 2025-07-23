import { useState } from "react";

function MetaDataItem({ icon, label, value }) {
  // Click to expand if truncated
  const [truncate, setTruncate] = useState(true);

  return (
    <div
      className="flex flex-row justify-start items-center gap-2 text-xs cursor-pointer"
      onClick={() => setTruncate((prev) => !prev)}>
      <dt className="invert">
        <img src={`/assets/icons/${icon}`} width={16} alt={label} />
      </dt>

      <dd
        className={`${truncate && "line-clamp-2"} break-words overflow-hidden`}>
        {value ? value : "-"}
      </dd>
    </div>
  );
}

export default MetaDataItem;
