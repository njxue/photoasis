import Nav from "@app/(protected)/components/Nav/Nav";
import { UserPreferencesProvider } from "./UserPreferencesContext";
import getUserPreferences from "@actions/getUserPreferences";

const Layout = async ({ children }) => {
  let userPreferences = null;
  try {
    const res = await getUserPreferences();
    if (res) {
      userPreferences = res;
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <header className="h-12 w-screen md:w-12 md:h-screen fixed z-50">
        <Nav />
      </header>
      <main className="grow mt-12 md:ml-12 md:mt-0 bg-gray-200 overflow-auto">
        <UserPreferencesProvider data={userPreferences}>
          {children}
        </UserPreferencesProvider>
      </main>
    </div>
  );
};

export default Layout;
