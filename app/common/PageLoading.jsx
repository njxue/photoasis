import { QUALITY_MID } from "./Image/constants";
import OptimisedImage from "./Image/OptimisedImage";

const PageLoading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-5">
      <OptimisedImage
        src="/assets/images/logo.png"
        className="w-1/4 min-w-[200px] opacity-20"
        name="loading-state"
        quality={QUALITY_MID}
      />
      <div className="loader"></div>
    </div>
  );
};

export default PageLoading;
