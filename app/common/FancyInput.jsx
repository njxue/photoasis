"use client";
import { useEffect, useRef, useState } from "react";

function FancyInput({ label, name, required, type, min, step, defaultValue }) {
  const inputRef = useRef();
  const labelRef = useRef();

  const [isFocused, setIsFocused] = useState(defaultValue != null);

  const LABEL_STYLE_FOCUSED =
    "h-fit -translate-y-2/4 translate-x-2 scale-75 origin-left bg-white rounded px-1 font-bold transition-all duration-300";
  const LABEL_STYLE_UNFOCUSED =
    "bg-transparent text-gray-500 px-2 transition-all duration-300";
  const INPUT_STYLE = "p-2 w-full border border-gray-300 rounded";
  useEffect(() => {
    const handleClick = (e) => {
      // Clicked on label or input field
      if (
        labelRef.current?.contains(e.target) ||
        inputRef.current?.contains(e.target)
      ) {
        setIsFocused(true);
        inputRef.current?.focus();
      } else if (inputRef.current?.value === "") {
        setIsFocused(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="relative w-full">
      {type === "textarea" ? (
        <textarea
          defaultValue={defaultValue}
          ref={inputRef}
          className={INPUT_STYLE}
          name={name}
          required={required}
          onFocus={() => setIsFocused(true)}
        />
      ) : (
        <input
          type={type}
          min={min}
          step={step}
          defaultValue={defaultValue}
          ref={inputRef}
          className={INPUT_STYLE}
          name={name}
          required={required}
          onFocus={() => setIsFocused(true)}
        />
      )}
      <div
        className={`w-fit absolute inset-0 flex justify-center items-center ${
          isFocused ? LABEL_STYLE_FOCUSED : LABEL_STYLE_UNFOCUSED
        }`}
        ref={labelRef}>
        {label}
      </div>
    </div>
  );
}

export default FancyInput;
