import CancelSelectButton from "@app/common/Select/CancelSelectButton";
import { useSelect } from "@app/common/Select/SelectContext";

export default function ChangeThumbnailSelectControls({
  handleChangeThumbail,
}) {
  const { isSelecting, numSelected } = useSelect();

  return (
    isSelecting && (
      <div className="flex flex-row justify-center items-center gap-1">
        <button
          disabled={!numSelected}
          className="btn-gray font-bold"
          onClick={handleChangeThumbail}>
          Set as thumbnail
        </button>
        <CancelSelectButton />
      </div>
    )
  );
}
