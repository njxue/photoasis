import Nav from "@app/Nav";
import Provider from "@app/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "Photoapp",
  description: "Snap",
};
const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
