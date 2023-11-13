import Provider from "@components/Provider";

export const metadata = {
  title: "Photoapp",
  description: "Snap",
};
const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
