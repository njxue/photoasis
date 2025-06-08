import OptimisedImage from "../Image/OptimisedImage";
import { QUALITY_LOW, QUALITY_MAX, QUALITY_MID } from "../Image/constants";
import { Blurhash } from "react-blurhash";

const Photo = ({
  src,
  name,
  objectFit = "object-cover",
  blurhash = "",
  lazy = true,
}) => {
  const placeholder = "/assets/images/placeholder.png";
  return (
    <>
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
        src && (
          <OptimisedImage
            src={src}
            name={name}
            quality={QUALITY_LOW}
            sizes=""
            className="absolute blur-xs opacity-95"
            objectFit="object-cover"
            priority={!lazy}
          />
        )
      )}
      <OptimisedImage
        src={src ?? placeholder}
        name={name}
        quality={QUALITY_MID}
        className="absolute"
        objectFit={objectFit}
        priority={!lazy}
      />
    </>
  );
};

export default Photo;
