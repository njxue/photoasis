"use client";
import Image from "next/image";
import { QUALITY_MAX } from "./constants";

const OptimisedImage = ({
  src,
  name,
  onClick,
  className,
  hover,
  quality = QUALITY_MAX,
  priority = false,
}) => {
  const hoverStyles =
    "hover:opacity-50 transition-opacity ease-in-out duration-50";
  const dimensions = "h-full w-full max-w-[90vw] max-h-[90vh]";
  return (
    <Image
      src={src}
      width={0}
      height={0}
      alt={name}
      id={name}
      className={`
        object-cover cursor-pointer 
        ${hover && hoverStyles}
        ${className ?? dimensions}
      `}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
      quality={quality}
      onClick={onClick}
      priority={priority}
    />
  );
};

export default OptimisedImage;
