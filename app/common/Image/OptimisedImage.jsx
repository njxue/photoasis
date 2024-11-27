"use client";
import Image from "next/image";
import { QUALITY_MID } from "./constants";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

const OptimisedImage = ({
  src,
  name,
  id,
  onClick,
  className,
  hover,
  quality = QUALITY_MID,
  priority = false,
  width = 0,
  height = 0,
  sizes = "100vw",
  fill = false,
  showLoader = false,
  onLoad = () => {},
}) => {
  const hoverStyles =
    "hover:opacity-50 transition-opacity ease-in-out duration-50";
  const dimensions = "h-full w-full max-w-[90vw] max-h-[90vh]";

  const [isLoading, setIsLoading] = useState(true);
  const widthAndHeightProps = fill ? {} : { width, height };
  return (
    <>
      {isLoading && showLoader && (
        <div className="absolute w-10">
          <LoadingSpinner />
        </div>
      )}
      <Image
        src={src}
        alt={name}
        id={id ?? name}
        name={name}
        className={`
        object-cover cursor-pointer 
        ${hover && hoverStyles}
        ${className ?? dimensions}
      `}
        sizes={sizes}
        quality={quality}
        onClick={onClick}
        priority={priority}
        placeholder="empty"
        fill={fill}
        {...widthAndHeightProps}
        onLoad={() => {
          setIsLoading(false);
          onLoad();
        }}
      />
    </>
  );
};

export default OptimisedImage;
