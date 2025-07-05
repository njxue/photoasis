import Image from "next/image";
import { QUALITY_MID } from "./constants";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import {
  CLOUDINARY_URL,
  IMAGE_TRANSFORM_ENABLED,
  USE_NEXT_IMAGE,
} from "@app/configs/imageConfigs";

const OptimisedImage = ({
  src,
  fallback,
  name,
  id,
  onClick,
  className: customClassName,
  hover,
  quality = QUALITY_MID,
  priority = false,
  width = 10,
  height = 10,
  sizes,
  srcset,
  fill = false,
  showLoader = false,
  objectFit = "object-cover",
  onLoad,
  isLocal = false,
}) => {
  const COMMON_TRANSFORMATIONS = "f_avif,dpr_auto";
  const hoverStyles =
    "hover:opacity-50 transition-opacity ease-in-out duration-50";
  const dimensions = "h-full w-full";

  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const imgRef = useRef();

  const widthAndHeightProps = fill ? {} : { width, height };
  const className = `
      ${objectFit} cursor-pointer 
      ${hover && hoverStyles} 
      ${dimensions} ${customClassName}
    `;

  const handleError = () => {
    /**
     * Possible errors:
     * 1. 402: Exceeded the image optimisation limit for free tier
     * 2. 400: Exceeded the image size limit of 10MB for image transformation with Cloudinary
     */
    setIsError(true);
    setImgSrc(IMAGE_TRANSFORM_ENABLED && !fallback ? src : fallback);
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete) {
      if (img.naturalWidth === 0) {
        handleError();
      } else {
        handleLoad();
      }
    }
  }, []);

  return (
    <>
      {isLoading && showLoader && (
        <div className="absolute w-10 left-1/2 top-1/2">
          <LoadingSpinner />
        </div>
      )}
      {isError || !USE_NEXT_IMAGE ? (
        <img
          ref={imgRef}
          src={imgSrc}
          alt={name}
          onClick={onClick}
          className={className}
          {...widthAndHeightProps}
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={handleError}
          onLoad={handleLoad}
          sizes={sizes ?? "100vw"}
          srcSet={
            isError
              ? imgSrc
              : (srcset ??
                `${CLOUDINARY_URL}/${COMMON_TRANSFORMATIONS},w_100/${src} 100w,
                ${CLOUDINARY_URL}/${COMMON_TRANSFORMATIONS},w_250/${src} 250w,
                ${CLOUDINARY_URL}/${COMMON_TRANSFORMATIONS},w_540/${src} 540w,
                ${CLOUDINARY_URL}/${COMMON_TRANSFORMATIONS},w_720/${src} 720w,
                ${CLOUDINARY_URL}/${COMMON_TRANSFORMATIONS},w_960/${src} 960w,
                ${CLOUDINARY_URL}/${COMMON_TRANSFORMATIONS},w_1200/${src} 1200w,
                ${CLOUDINARY_URL}/${COMMON_TRANSFORMATIONS},w_1440/${src} 1440w,
                ${CLOUDINARY_URL}/${COMMON_TRANSFORMATIONS},w_1920/${src} 1920w`)
          }
        />
      ) : (
        <Image
          src={imgSrc}
          alt={name}
          id={id ?? name}
          name={name}
          className={className}
          sizes={sizes ?? "100vw"}
          quality={quality}
          onClick={onClick}
          priority={priority}
          placeholder="empty"
          fill={fill}
          {...widthAndHeightProps}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </>
  );
};

export default OptimisedImage;
