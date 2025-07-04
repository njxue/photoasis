import Provider from "@app/Provider";
import "@styles/globals.css";
import { inter } from "@styles/fonts";
import ToastContainerWrapper from "./ToastContainerWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Photoasis",
  description:
    "An online photo gallery to store your photos along with your photo settings",
};

const Layout = async ({ children }) => {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_ENABLE_CLOUDINARY_CLIENT_HINTS === "true" && (
          <meta
            http-equiv="delegate-ch"
            content="sec-ch-width https://res.cloudinary.com; sec-ch-dpr https://res.cloudinary.com; sec-ch-viewport-width https://res.cloudinary.com;"></meta>
        )}
      </head>
      <body className={`${inter.className} antialiased`}>
        <SpeedInsights />
        <Provider>
          <main className="app w-screen h-screen">{children}</main>
          <ToastContainerWrapper />
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
