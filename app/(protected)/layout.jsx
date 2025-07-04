import Nav from "@app/(protected)/components/Nav/Nav";
import { UserPreferencesProvider } from "./UserPreferencesContext";

const Layout = async ({ children }) => {
  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="h-12 w-screen md:w-12 md:h-screen fixed z-50">
        <Nav />
      </div>
      <div className="grow mt-12 md:ml-12 md:mt-0 bg-gray-200 overflow-auto">
        <UserPreferencesProvider>{children}</UserPreferencesProvider>
      </div>
    </div>
  );
};

export default Layout;
