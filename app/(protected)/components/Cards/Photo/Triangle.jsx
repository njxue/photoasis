function Triangle() {
  const strokeDasharray = 100;
  const strokeWidth = 1.35;
  const strokeColor = "white";

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet">
      <line
        className="line"
        x1="50"
        y1="18"
        x2="18"
        y2="78"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDasharray}
      />
      <line
        className="line"
        x1="50"
        y1="18"
        x2="82"
        y2="78"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDasharray}
      />
      <line
        className="line"
        x1="18"
        y1="78"
        x2="82"
        y2="78"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDasharray}
      />
    </svg>
  );
}

export default Triangle;
