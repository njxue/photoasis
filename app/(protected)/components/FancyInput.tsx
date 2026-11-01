"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface FancyInputProps {
  label?: ReactNode;
  name: string;
  required?: boolean;
  type?: string;
  min?: number;
  step?: number;
  defaultValue?: string | number | null;
  onChange?: (value: string | number) => void;
}

function FancyInput({
  label,
  name,
  required,
  type,
  min,
  step,
  defaultValue,
  onChange,
}: FancyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState<boolean>(defaultValue != null);

  const LABEL_STYLE_FOCUSED =
    "h-fit -translate-y-2/4 translate-x-2 scale-75 origin-left bg-white px-1 font-bold uppercase tracking-wider transition-all duration-300";
  const LABEL_STYLE_UNFOCUSED =
    "bg-transparent text-gray-500 px-2 transition-all duration-300";
  const INPUT_STYLE = "h-11 w-full border border-black/30 bg-white p-2 outline-none transition focus:border-black";
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Clicked on label or input field
      if (
        event.target instanceof Node &&
        (labelRef.current?.contains(event.target) ||
          inputRef.current?.contains(event.target) ||
          textareaRef.current?.contains(event.target))
      ) {
        setIsFocused(true);
        (type === "textarea" ? textareaRef.current : inputRef.current)?.focus();
      } else if (
        (type === "textarea" ? textareaRef.current : inputRef.current)?.value === ""
      ) {
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
          defaultValue={defaultValue ?? undefined}
          ref={textareaRef}
          className={INPUT_STYLE}
          name={name}
          required={required}
          onFocus={() => setIsFocused(true)}
          onChange={(event) => {
            onChange?.(event.target.value);
          }}
        />
      ) : (
        <input
          type={type}
          min={min}
          step={step}
          defaultValue={defaultValue ?? undefined}
          ref={inputRef}
          className={INPUT_STYLE}
          name={name}
          required={required}
          onFocus={() => setIsFocused(true)}
          onChange={(event) => {
            let val: string | number = event.target.value;
            if (type === "number") val = parseFloat(event.target.value);
            onChange?.(val);
          }}
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
