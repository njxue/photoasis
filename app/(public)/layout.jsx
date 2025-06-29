import Nav from "./components/Nav";

const Layout = async ({ children }) => {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center bg-[#F9FAFB] font-inter">
      <Nav />
      <div className="grow w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
