import Provider from "@app/Provider";
import "@styles/globals.css";
import { inter } from "@styles/fonts";
import ToastContainerWrapper from "./ToastContainerWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { USE_CLIENT_HINTS } from "./configs/imageConfigs";

export const metadata = {
  title: "Photoasis",
  description:
    "An online photo gallery to store your photos along with your photo settings",
};

const Layout = async ({ children }) => {
  return (
    <html lang="en">
      <head>
        {USE_CLIENT_HINTS && (
          <meta
            httpEquiv="delegate-ch"
            content="sec-ch-width https://res.cloudinary.com; sec-ch-dpr https://res.cloudinary.com; sec-ch-viewport-width https://res.cloudinary.com;"></meta>
        )}
      </head>
      <body className={`${inter.className} antialiased`}>
        <SpeedInsights />
        <Provider>
          <div className="app w-screen h-screen">{children}</div>
          <ToastContainerWrapper />
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
