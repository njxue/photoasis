const PageLoading = () => {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-5">
      <img
        src="/assets/images/logoNew.png"
        className="w-1/4 min-w-[200px] opacity-20"
        name="loading-state"
        alt="Photoasis"
      />
      <div className="loader"></div>
    </div>
  );
};

export default PageLoading;
