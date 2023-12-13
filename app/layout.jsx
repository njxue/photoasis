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
          <main className="app flex flex-col">
            <div>{session?.user && <Nav />}</div>
            <div className="grow">{children}</div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
