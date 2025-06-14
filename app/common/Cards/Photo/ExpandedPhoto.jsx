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
      />
    </div>
  );
};

export default ExpandedPhoto;
