import ExpandedPhotoInfo from "./ExpandedPhotoInfo";
import OptimisedImage from "../../Image/OptimisedImage";
import { QUALITY_MID } from "@app/common/Image/constants";
const ExpandedPhoto = ({ photo }) => {
  return (
    <div className="relative h-full">
      <OptimisedImage
        key={photo.url}
        src={photo.url}
        name={photo.name}
        quality={QUALITY_MID}
        priority
        showLoader
        objectFit="object-contain"
        o
      />

      <div className="absolute top-0 left-0">
        <ExpandedPhotoInfo photo={photo} />
      </div>
    </div>
  );
};

export default ExpandedPhoto;
