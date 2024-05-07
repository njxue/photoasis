import OptimisedImage from "./OptimisedImage";

const PageLoading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-5">
      <OptimisedImage
        src="/assets/images/logo.png"
        className="w-1/4 min-w-[200px] opacity-20"
      />
      <div className="loader"></div>
    </div>
  );
};

export default PageLoading;
