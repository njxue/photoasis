import Nav from "@app/Nav";
import Provider from "@app/Provider";
import "@styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Photoapp",
  description: "Snap",
};
const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="app">
            {session?.user && <Nav />}
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
