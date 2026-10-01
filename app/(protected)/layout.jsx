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
    <div className="protected-shell min-h-screen bg-[#f7f7f5] text-[#111111]">
      <header className="fixed inset-x-0 bottom-0 z-50 h-16 border-t border-black/10 bg-white md:inset-y-0 md:left-0 md:right-auto md:h-screen md:w-60 md:border-r md:border-t-0">
        <Nav />
      </header>
      <main className="min-h-screen overflow-x-hidden pb-20 md:ml-60 md:pb-0">
        <UserPreferencesProvider data={userPreferences}>
          {children}
        </UserPreferencesProvider>
      </main>
    </div>
  );
};

export default Layout;
