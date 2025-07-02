import Nav from "./components/Nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PAGE_ROUTE_DASHBOARD } from "@utils/pageRoutes";

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  const isLoggedIn = !!session?.user;

  if (isLoggedIn) {
    redirect(PAGE_ROUTE_DASHBOARD);
  }

  return (
    <div className="relative w-screen h-screen flex flex-col items-center bg-gradient-to-r from-[#ffcbcb] via-[#ebe9e5] to-[#8adcee] animate-bg-gradient">
      <Nav />
      <div className="grow w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
