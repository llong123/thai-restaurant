import type { Metadata } from "next";
import Provider from "./provider";
import { Analytics } from "@vercel/analytics/next";
import { siteMetadata } from "@/lib/utility";
import {
  getAboutData,
  getFooterData,
  getHomepageData,
  getLocationData,
  getMenuPageData,
  getNavigationData,
  getSheetDishes,
} from "@/lib/cms/googleSheets";
import type { AppDataInitialData } from "@/hooks/AppDataContext";

async function getInitialAppData(): Promise<AppDataInitialData | undefined> {
  const results = await Promise.allSettled([
    getNavigationData(),
    getFooterData(),
    getHomepageData(),
    getSheetDishes(),
    getMenuPageData(),
    getLocationData(),
    getAboutData(),
  ]);
  const value = <T,>(result: PromiseSettledResult<T>) =>
    result.status === "fulfilled" ? result.value : null;

  const initialData: AppDataInitialData = {
    navigation: value(results[0]),
    footer: value(results[1]),
    homepage: value(results[2]),
    dishes: value(results[3]),
    menu: value(results[4]),
    location: value(results[5]),
    about: value(results[6]),
  };

  return Object.values(initialData).some((item) => item != null)
    ? initialData
    : undefined;
}

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: "%s | Chao Phraya",
  },
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.siteUrl),
  alternates: { canonical: siteMetadata.siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_FI",
    url: siteMetadata.siteUrl,
    siteName: "Chao Phraya",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [{ url: siteMetadata.openGraphImage, alt: "Thai food at Chao Phraya in Helsinki" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.openGraphImage],
  },
  icons: { icon: "/favicon.ico" },
};

const restaurantStructuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteMetadata.siteUrl}/#restaurant`,
  name: "Chao Phraya",
  description: siteMetadata.description,
  url: siteMetadata.siteUrl,
  image: siteMetadata.openGraphImage,
  telephone: "+358 10 5514139",
  servesCuisine: ["Thai"],
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lönnrotinkatu 34",
    addressLocality: "Helsinki",
    postalCode: "00180",
    addressCountry: "FI",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "11:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "11:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "11:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "11:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "11:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "12:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "12:00", closes: "16:00" },
  ],
  sameAs: [
    "https://www.facebook.com/ChaoPhrayaHelsinki",
    "https://www.instagram.com/chaophraya.fi/",
  ],
  hasMenu: `${siteMetadata.siteUrl}/menu`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialData = await getInitialAppData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        <Provider initialData={initialData}>
          {children}
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
