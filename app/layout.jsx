import Nav from "@app/components/Nav/Nav";
import Provider from "@app/Provider";
import "@styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { inter } from "@styles/fonts";
import Login from "./components/Login";
import ToastContainerWrapper from "./ToastContainerWrapper";
import { UserPreferencesProvider } from "./UserPreferencesContext";

export const metadata = {
  title: "Photoasis",
  description:
    "An online photo gallery to store your photos along with your photo settings",
};

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Provider>
          <main className="app">
            {session?.user ? (
              <div className="flex flex-col h-screen md:flex-row">
                <div className="h-12 w-screen md:w-12 md:h-screen fixed z-50">
                  <Nav />
                </div>
                <div className="grow mt-12 md:ml-12 md:mt-0 p-3 bg-gray-200 overflow-auto">
                  <UserPreferencesProvider>{children}</UserPreferencesProvider>
                </div>
              </div>
            ) : (
              <Login />
            )}
          </main>
          <ToastContainerWrapper />
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
