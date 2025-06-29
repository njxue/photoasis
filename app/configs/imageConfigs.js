export const NUM_IMAGES_ABOVE_FOLD = 35;
export const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
export const CLOUDINARY_PROXY_URL =
  process.env.NEXT_PUBLIC_CLOUDINARY_PROXY_URL;
export const MAX_SIZE_BYTES = 10485760;
export const IMAGE_TRANSFORM_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_IMAGE_TRANSFORM === "true";
export const IMAGE_SIZE_RESTRICTION_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_IMAGE_SIZE_RESTRICTION === "true";
export const IMAGE_PLACEHOLDER = "/assets/images/placeholder.png";
export const USE_NEXT_IMAGE =
  process.env.NEXT_PUBLIC_ENABLE_NEXT_IMAGE_OPTIMIZATION === "true";
