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
  width = 10,
  height = 10,
  sizes = "100vw",
  fill = false,
  showLoader = false,
  objectFit = "cover",
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
        object-${objectFit} cursor-pointer 
        ${hover && hoverStyles} 
        ${dimensions} ${className}
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
