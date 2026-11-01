import type { Dispatch, SetStateAction } from "react";
interface MinimalisticViewToggleProps {
  minimalisticView: boolean;
  setMinimalisticView: Dispatch<SetStateAction<boolean>>;
}
const MinimalisticViewToggle = ({ minimalisticView, setMinimalisticView }: MinimalisticViewToggleProps) => {
  return (
    <button
      className="fixed bottom-20 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white p-2.5 shadow-sm transition hover:border-black md:bottom-5 md:right-5"
      onClick={() => setMinimalisticView((previous) => !previous)}>
      <img
        src={`/assets/icons/${minimalisticView ? "unhide" : "hide"}.svg`}
        alt={minimalisticView ? "Show page controls" : "Hide page controls"}
      />
    </button>
  );
};

export default MinimalisticViewToggle;
