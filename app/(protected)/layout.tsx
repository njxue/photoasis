import Nav from "@app/(protected)/components/Nav/Nav";
import { UserPreferencesProvider } from "./UserPreferencesContext";
import getUserPreferences from "@actions/getUserPreferences";
import { authOptions } from "@auth/options";
import { getServerSession } from "next-auth";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  let userPreferences = null;
  try {
    const res = await getUserPreferences();
    if (res) {
      userPreferences = res;
    }
  } catch (err) {
    console.error(err);
  }
  const session = await getServerSession(authOptions);

  return (
    <div className="protected-shell min-h-screen bg-[#f7f7f5] text-[#111111]">
      <header className="fixed inset-x-0 bottom-0 z-50 h-16 border-t border-black/10 bg-white md:inset-y-0 md:left-0 md:right-auto md:h-screen md:w-60 md:border-r md:border-t-0">
        <Nav avatar={session?.user.image} name={session?.user.name} />
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
