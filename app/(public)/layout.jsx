import Nav from "./components/Nav";

const Layout = async ({ children }) => {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center bg-gradient-to-r from-[#ffcbcb] via-[#ebe9e5] to-[#8adcee] animate-bg-gradient">
      <Nav />
      <main className="grow w-full flex justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default Layout;
