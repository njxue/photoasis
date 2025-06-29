const ProgressRing = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center animate-border-clockwise">
      <div
        className="relative w-20 h-20 rounded-full"
        style={{
          background: `conic-gradient(#10b981 ${
            Math.min(progress, 100) * 3.6
          }deg, #e5e7eb 0deg)`,
        }}>
        <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
          <span className="text-sm font-medium">{progress}%</span>
        </div>
      </div>
      <div>{progress < 100 ? "Uploading in progress..." : "Done-zo!"}</div>
    </div>
  );
};

export default ProgressRing;
