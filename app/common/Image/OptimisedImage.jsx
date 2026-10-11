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

const COMMON_TRANSFORMATIONS = "f_avif,dpr_auto";
const DEFAULT_TRANSFORM_WIDTH = 960;
const SRCSET_WIDTHS = [100, 250, 540, 720, 960, 1200, 1440, 1920];

const generateCloudinaryUrl = (src, width) =>
  `${CLOUDINARY_URL}/${COMMON_TRANSFORMATIONS},w_${width}/${src}`;

const generateCloudinarySrcSet = (src, maxSourceWidth) =>
  SRCSET_WIDTHS.filter((width) => width <= maxSourceWidth).map(
    (width) => `${generateCloudinaryUrl(src, width)} ${width}w`
  ).join(", ");

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
  maxSourceWidth = 1920,
  fill = false,
  showLoader = false,
  objectFit = "object-cover",
  onLoad,
  withLens = false,
}) => {
  const canTransform =
    !USE_NEXT_IMAGE &&
    IMAGE_TRANSFORM_ENABLED &&
    Boolean(CLOUDINARY_URL) &&
    /^https?:\/\//.test(src);
  const initialSrc = canTransform
    ? generateCloudinaryUrl(src, Math.min(DEFAULT_TRANSFORM_WIDTH, maxSourceWidth))
    : src;
  const hoverStyles =
    "hover:opacity-50 transition-opacity ease-in-out duration-50";
  const dimensions = "h-full w-full";

  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const imgRef = useRef();

  const widthAndHeightProps = fill ? {} : { width, height };
  const className = `
      ${objectFit} cursor-pointer 
      ${hover ? hoverStyles : ""}
      ${dimensions} ${customClassName ?? ""}
    `;

  const handleError = useCallback(() => {
    /**
     * Possible errors:
     * 1. 402: Exceeded the image optimisation limit for free tier
     * 2. 400: Exceeded the image size limit of 10MB for image transformation with Cloudinary
     */
    setIsError(true);
    setImgSrc(fallback ?? src);
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
    setImgSrc(initialSrc);
    setIsError(false);
    setIsLoading(true);
  }, [initialSrc]);

  const responsiveSrcSet =
    srcset ?? (canTransform ? generateCloudinarySrcSet(src, maxSourceWidth) : undefined);

  const ImageElement =
    isError || !USE_NEXT_IMAGE ? (
      <img
        ref={imgRef}
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
        srcSet={isError ? undefined : responsiveSrcSet}
        src={imgSrc}
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
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-10">
            <LoadingSpinner />
          </div>
        </div>
      )}
      {withLens ? <Lens>{ImageElement}</Lens> : ImageElement}
    </>
  );
};

export default OptimisedImage;
