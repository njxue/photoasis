const ProgressRing = ({ progress }) => {
  const numericProgress = Number(progress);
  const safeProgress = Number.isFinite(numericProgress)
    ? Math.min(Math.max(numericProgress, 0), 100)
    : 0;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (safeProgress / 100) * circumference;
  const isComplete = safeProgress >= 100;

  return (
    <div
      className="flex h-full min-h-[320px] w-full flex-col items-center justify-center bg-white px-8 text-center"
      role="progressbar"
      aria-label="Photo upload progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeProgress}>
      <div className="relative h-28 w-28">
        <svg
          className="h-full w-full -rotate-90"
          viewBox="0 0 100 100"
          aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(17, 17, 17, 0.12)"
            strokeWidth="3"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#111111"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold tabular-nums">
            {Math.round(safeProgress)}
            <span className="ml-0.5 text-xs text-black/45">%</span>
          </span>
        </div>
      </div>

      <p className="eyebrow mt-7">{isComplete ? "Upload complete" : "Uploading"}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight">
        {isComplete ? "Finishing your album" : "Uploading your photos"}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-black/45">
        {isComplete
          ? "Your photographs are uploaded. We’re preparing the final view."
          : "Keep this window open while your photographs are added to the collection."}
      </p>

      <div className="mt-7 h-px w-full max-w-xs overflow-hidden bg-black/10">
        <div
          className="h-full bg-black transition-[width] duration-500 ease-out"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressRing;
