const SEO_META_TITLE_DEFAULT = "Photoasis";
const SEO_META_DESCRIPTION =
  "An online photo gallery to store your photos along with your photo settings";
const META_URL = "https://photoasis.vercel.app";

export const SEO_ROOT_META: Metadata = {
  title: {
    default: SEO_META_TITLE_DEFAULT,
    template: `%s | ${SEO_META_TITLE_DEFAULT}`,
  },
  description: SEO_META_DESCRIPTION,
  metadataBase: new URL(META_URL),
  openGraph: {
    type: "website",
    url: META_URL,
    title: SEO_META_TITLE_DEFAULT,
    siteName: SEO_META_TITLE_DEFAULT,
    description: SEO_META_DESCRIPTION,
    locale: "en_US",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_META_TITLE_DEFAULT,
    description: SEO_META_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export const SEO_NO_INDEX_META: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};
import type { Metadata } from "next";

