function Triangle() {
  const strokeDasharray = 100;
  const strokeWidth = 1;
  const strokeColor = "white";

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none max-sm:opacity-0"
      xmlns="http://www.w3.org/2000/svg">
      <line
        className="line"
        x1="50%"
        y1="40%"
        x2="35%"
        y2="69%"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDasharray}
      />
      <line
        className="line"
        x1="50%"
        y1="40%"
        x2="65%"
        y2="69%"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDasharray}
      />
      <line
        className="line"
        x1="35%"
        y1="69%"
        x2="65%"
        y2="69%"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDasharray}
      />
    </svg>
  );
}

export default Triangle;
