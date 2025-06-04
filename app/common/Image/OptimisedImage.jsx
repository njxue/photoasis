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
  className: customClassName,
  hover,
  quality = QUALITY_MID,
  priority = false,
  width = 10,
  height = 10,
  sizes = "100vw",
  fill = false,
  showLoader = false,
  objectFit = "object-cover",
  onLoad = () => {},
}) => {
  const hoverStyles =
    "hover:opacity-50 transition-opacity ease-in-out duration-50";
  const dimensions = "h-full w-full max-w-[90vw] max-h-[90vh]";

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const widthAndHeightProps = fill ? {} : { width, height };
  const className = `
      ${objectFit} cursor-pointer 
      ${hover && hoverStyles} 
      ${dimensions} ${customClassName}
    `;

  if (isError) {
    return (
      <img
        src={src}
        onClick={onClick}
        className={className}
        {...widthAndHeightProps}
      />
    );
  }

  return (
    <>
      {isLoading && showLoader && (
        <div className="absolute w-10 left-1/2 top-1/2">
          <LoadingSpinner />
        </div>
      )}
      <Image
        src={src}
        alt={name}
        id={id ?? name}
        name={name}
        className={className}
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
        onError={(e) => {
          setIsError(true);
        }}
      />
    </>
  );
};

export default OptimisedImage;
