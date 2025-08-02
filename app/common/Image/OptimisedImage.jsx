import Image from "next/image";
import { QUALITY_MID } from "./constants";
import { useCallback, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import {
  CLOUDINARY_URL,
  IMAGE_TRANSFORM_ENABLED,
  USE_NEXT_IMAGE,
} from "@app/configs/imageConfigs";
import { Lens } from "../Lens";
import { preload } from "react-dom";

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
  sizes = "100vw",
  srcset: customSrcSet,
  fill = false,
  showLoader = false,
  objectFit = "object-cover",
  onLoad,
  withLens = false,
  preload: shouldPreload = false,
}) => {
  const COMMON_TRANSFORMATIONS = "f_avif,dpr_auto";
  const srcSetWidths = [100, 250, 540, 720, 960, 1200, 1440, 1920];
  const srcset =
    customSrcSet ?? generateSrcset(srcSetWidths, COMMON_TRANSFORMATIONS);

  if (shouldPreload) {
    preload(src, {
      as: "image",
      imageSizes: sizes,
      imageSrcSet: srcset,
    });
  }

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

  const handleError = useCallback(() => {
    /**
     * Possible errors:
     * 1. 402: Exceeded the image optimisation limit for free tier
     * 2. 400: Exceeded the image size limit of 10MB for image transformation with Cloudinary
     */
    setIsError(true);
    setImgSrc(IMAGE_TRANSFORM_ENABLED && !fallback ? src : fallback);
  }, [fallback, src]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete) {
      if (img.naturalWidth === 0) {
        handleError();
      } else {
        handleLoad();
      }
    }
  }, [handleError, handleLoad]);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const ImageElement =
    isError || !USE_NEXT_IMAGE ? (
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
        srcSet={isError ? imgSrc : srcset}
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
    );

  return (
    <>
      {isLoading && showLoader && (
        <div className="absolute w-10 left-1/2 top-1/2">
          <LoadingSpinner />
        </div>
      )}
      {withLens ? <Lens>{ImageElement}</Lens> : ImageElement}
    </>
  );
};

export default OptimisedImage;

const generateSrcset = (widths, transformations) => {
  const srcSetArr = widths.map(
    (width) =>
      `${CLOUDINARY_URL}/${transformations},w_${width}/${src} ${width}w`
  );
  return srcSetArr.join(",");
};
