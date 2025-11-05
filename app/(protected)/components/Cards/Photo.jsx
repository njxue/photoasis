import { IMAGE_PLACEHOLDER } from "@app/configs/imageConfigs";
import OptimisedImage from "../../../common/Image/OptimisedImage";
import { QUALITY_LOW } from "../../../common/Image/constants";
import { Blurhash } from "react-blurhash";

const Photo = ({
  src,
  name,
  objectFit = "object-cover",
  blurhash = "",
  lazy = true,
  sizes = "100vw",
  className = "",
}) => {
  if (!src) src = IMAGE_PLACEHOLDER;
  return (
    <div className={`flex justify-center w-full h-full ${className}`}>
      {blurhash ? (
        <div className="absolute w-full h-full">
          <Blurhash
            width="100%"
            height="100%"
            hash={blurhash}
            punch={1}
            resolutionX={32}
            resolutionY={32}
          />
        </div>
      ) : (
        // Create blurhash effect for older photos without blurhash (before it was implemented)
        <div className="absolute w-full h-full blur-xs opacity-50">
          <OptimisedImage
            src={src}
            name={name}
            quality={QUALITY_LOW}
            objectFit="object-cover"
            priority={!lazy}
            sizes="(max-width: 450px) 20px, (max-width: 640px) 50px, 100px"
          />
        </div>
      )}
      <OptimisedImage
        src={src}
        name={name}
        quality={QUALITY_LOW}
        className="absolute"
        objectFit={objectFit}
        priority={!lazy}
        fill={true}
        sizes={sizes}
      />
    </div>
  );
};

export default Photo;
