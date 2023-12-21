"use client";
import Image from "next/image";

const OptimisedImage = ({ src, name, onClick, className }) => {
  return (
    <Image
      src={src}
      width={0}
      height={0}
      alt={name}
      className={
        className ??
        "hover:opacity-50 transition-opacity ease-in-out duration-50 h-full w-full object-cover"
      }
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={100}
      onClick={onClick}
    />
  );
};

export default OptimisedImage;
