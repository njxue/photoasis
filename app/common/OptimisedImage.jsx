"use client";
import Image from "next/image";

const OptimisedImage = ({ src, name, onClick, className, hover }) => {
  return (
    <Image
      src={src}
      width={0}
      height={0}
      alt={name}
      className={`
        ${
          hover &&
          "hover:opacity-50 transition-opacity ease-in-out duration-50 "
        }
        ${className ?? "h-full w-full object-cover max-w-[90vw] max-h-[90vh]"}
      `}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
      quality={100}
      onClick={onClick}
    />
  );
};

export default OptimisedImage;
