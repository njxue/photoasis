"use client";

import NextImage from "next/image";
import { QUALITY_LOW, QUALITY_MID } from "./constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";
import LoadingSpinner from "../LoadingSpinner";
import {
  CLOUDINARY_URL,
  IMAGE_TRANSFORM_ENABLED,
  IMAGE_PLACEHOLDER,
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

const CustomImage = ({
  src: source,
  fallback,
  name,
  id,
  onClick,
  className: customClassName,
  hover,
  preview = false,
  blurhash = "",
  quality = preview ? QUALITY_LOW : QUALITY_MID,
  priority = false,
  lazy = true,
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
  unoptimized = false,
}) => {
  const src = source || IMAGE_PLACEHOLDER;
  const isLazy = lazy && !priority;
  const imageSizes = isLazy ? `auto, ${sizes ?? "100vw"}` : sizes ?? "100vw";
  const canTransform =
    !unoptimized &&
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
      ${dimensions} ${preview ? "absolute inset-0" : ""}
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
    setImgSrc(initialSrc);
    setIsError(false);
    setIsLoading(true);
  }, [initialSrc]);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete) {
      if (img.naturalWidth === 0) {
        handleError();
      } else {
        handleLoad();
      }
    }
  }, [imgSrc, handleError, handleLoad]);

  const responsiveSrcSet =
    unoptimized
      ? undefined
      : srcset ?? (canTransform ? generateCloudinarySrcSet(src, maxSourceWidth) : undefined);

  const ImageElement =
    unoptimized || isError || !USE_NEXT_IMAGE ? (
      <img
        ref={imgRef}
        alt={name}
        onClick={onClick}
        className={className}
        {...widthAndHeightProps}
        fetchPriority={priority ? "high" : "auto"}
        loading={isLazy ? "lazy" : "eager"}
        decoding="async"
        onError={handleError}
        onLoad={handleLoad}
        sizes={unoptimized ? undefined : imageSizes}
        srcSet={isError ? undefined : responsiveSrcSet}
        src={imgSrc}
      />
    ) : (
      <NextImage
        ref={imgRef}
        src={imgSrc}
        alt={name}
        id={id ?? name}
        name={name}
        className={className}
        sizes={imageSizes}
        quality={quality}
        onClick={onClick}
        priority={priority}
        loading={isLazy ? "lazy" : "eager"}
        placeholder="empty"
        fill={fill}
        {...widthAndHeightProps}
        onLoad={handleLoad}
        onError={handleError}
      />
    );

  return (
    <div className={`relative flex h-full w-full items-center justify-center ${customClassName ?? ""}`}>
      {preview && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {blurhash ? (
            <Blurhash
              width="100%"
              height="100%"
              hash={blurhash}
              punch={1}
              resolutionX={32}
              resolutionY={32}
            />
          ) : USE_NEXT_IMAGE && !unoptimized ? (
            <NextImage
              src={src}
              alt=""
              width={100}
              height={100}
              quality={QUALITY_LOW}
              sizes="100px"
              loading={isLazy ? "lazy" : "eager"}
              className="h-full w-full object-cover blur-xs opacity-50"
            />
          ) : (
            <img
              src={canTransform ? generateCloudinaryUrl(src, 100) : src}
              alt=""
              loading={isLazy ? "lazy" : "eager"}
              decoding="async"
              className="h-full w-full object-cover blur-xs opacity-50"
            />
          )}
        </div>
      )}
      {isLoading && showLoader && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-10">
            <LoadingSpinner />
          </div>
        </div>
      )}
      {withLens ? <Lens>{ImageElement}</Lens> : ImageElement}
    </div>
  );
};

export default CustomImage;
