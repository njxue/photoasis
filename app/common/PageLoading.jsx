const PageLoading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-5">
      <img
        src="/assets/images/logoNew.png"
        className="w-1/4 min-w-[200px] opacity-20"
        name="loading-state"
      />
      <div className="loader"></div>
    </div>
  );
};

export default PageLoading;
