import Nav from "@app/Nav";
import Provider from "@app/Provider";
import "@styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { inter } from "@styles/fonts";

export const metadata = {
  title: "Photoapp",
  description: "Snap",
};
const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Provider>
          <main className="app flex flex-col md:flex-row">
            <div className="h-12 w-screen md:w-12 md:h-screen fixed z-50">
              {session?.user && <Nav />}
            </div>
            <div className="grow mt-12 md:ml-12 md:mt-0">{children}</div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
