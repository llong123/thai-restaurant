import type { Metadata } from "next";
import Provider from "./provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteMetadata } from "@/lib/utility";

export const metadata: Metadata = {
  title: {
    default: "Chao Phraya — Authentic Thai Restaurant in Helsinki",
    template: "%s | Chao Phraya",
  },
  description:
    "Chao Phraya — Authentic Thai restaurant in Helsinki. See our menu, opening hours and book a table. Dine-in and takeaway available.",
  metadataBase: new URL(siteMetadata.siteUrl),
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteMetadata.siteUrl,
    siteName: "Chao Phraya",
    title: "Chao Phraya — Authentic Thai Restaurant in Helsinki",
    description:
      "Authentic Thai flavours in the heart of Helsinki. View menu, opening hours and reserve a table.",
    images: [{ url: `${siteMetadata.siteUrl}/og-image.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chao Phraya — Authentic Thai Restaurant in Helsinki",
    description:
      "Authentic Thai flavours in the heart of Helsinki. View menu, opening hours and reserve a table.",
    images: [`${siteMetadata.siteUrl}/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          {children}
          <Analytics />
          <SpeedInsights />
        </Provider>
      </body>
    </html>
  );
}
