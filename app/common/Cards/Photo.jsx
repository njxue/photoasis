import OptimisedImage from "../Image/OptimisedImage";
import { QUALITY_LOW } from "../Image/constants";
import { Blurhash } from "react-blurhash";

const Photo = ({
  src,
  name,
  objectFit = "object-cover",
  blurhash = "",
  lazy = true,
  isLocal = false,
}) => {
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
            className="absolute blur-xs opacity-95"
            objectFit="object-cover"
            priority={!lazy}
            isLocal={isLocal}
            sizes="(max-width: 450px) 20px, (max-width: 640px) 50px, 100px"
          />
        )
      )}
      <OptimisedImage
        src={src}
        name={name}
        quality={QUALITY_LOW}
        className="absolute"
        objectFit={objectFit}
        priority={!lazy}
        fill={true}
        isLocal={isLocal}
        sizes="(max-width: 450px) 50px, (max-width: 640px) 64px, 125px"
      />
    </>
  );
};

export default Photo;
