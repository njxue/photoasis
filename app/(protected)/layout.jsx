import Nav from "@app/(protected)/components/Nav/Nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { UserPreferencesProvider } from "./UserPreferencesContext";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  const isLoggedIn = !!session?.user;

  if (!isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="h-12 w-screen md:w-12 md:h-screen fixed z-50">
        <Nav />
      </div>
      <div className="grow mt-12 md:ml-12 md:mt-0 p-3 bg-gray-200 overflow-auto">
        <UserPreferencesProvider>{children}</UserPreferencesProvider>
      </div>
    </div>
  );
};

export default Layout;
