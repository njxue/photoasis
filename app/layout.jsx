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
          <main className="app h-screen w-screen flex flex-col">
            <div>{session?.user && <Nav />}</div>
            <div className="grow">{children}</div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
