import OptimisedImage from "../Image/OptimisedImage";
import { QUALITY_MID } from "../Image/constants";

const Photo = ({ src, name, objectFit = "object-cover" }) => {
  const placeholder = "/assets/images/placeholder.png";
  return (
    <>
      {src && (
        <OptimisedImage
          src={src}
          name={name}
          quality={QUALITY_MID}
          sizes=""
          className="absolute blur-xs"
          objectFit="object-cover"
        />
      )}
      <OptimisedImage
        src={src ?? placeholder}
        name={name}
        quality={QUALITY_MID}
        className="absolute"
        objectFit={objectFit}
      />
    </>
  );
};

export default Photo;
