export default function Head() {
  // TODO: replace siteUrl, telephone, streetAddress and social links with real values
  const siteUrl = "https://www.chaophraya.fi";
  const ogImage = `${siteUrl}/og-image.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Chao Phraya",
    description:
      "Chao Phraya — Authentic Thai restaurant located in Helsinki. Fresh ingredients, traditional recipes, dine-in and takeaway. View menu, opening hours and book a table.",
    url: siteUrl,
    telephone: "+358 10 5514139",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lönnrotinkatu 34",
      addressLocality: "Helsinki",
      postalCode: "00180",
      addressCountry: "FI",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 60.1699,
      longitude: 24.9384,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "22:00",
      },
    ],
    servesCuisine: "Thai",
    acceptsReservations: true,
    sameAs: [
      "https://www.facebook.com/ChaoPhrayaHelsinki",
      "https://www.instagram.com/chaophraya.fi/",
    ],
    priceRange: "€€",
  };

  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Chao Phraya Menu",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Appetizers",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Spring Rolls",
            offers: { "@type": "Offer", price: "8.50", priceCurrency: "EUR" },
          },
          {
            "@type": "MenuItem",
            name: "Tom Yum Soup",
            offers: { "@type": "Offer", price: "7.00", priceCurrency: "EUR" },
          },
        ],
      },
      {
        "@type": "MenuSection",
        name: "Main Courses",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Pad Thai",
            offers: { "@type": "Offer", price: "16.00", priceCurrency: "EUR" },
          },
          {
            "@type": "MenuItem",
            name: "Green Curry",
            offers: { "@type": "Offer", price: "17.00", priceCurrency: "EUR" },
          },
        ],
      },
    ],
  };

  return (
    <>
      <title>Chao Phraya — Authentic Thai Restaurant in Helsinki</title>

      {/* Basic SEO */}
      <meta
        name="description"
        content="Chao Phraya — Authentic Thai restaurant in Helsinki. See our menu, opening hours and book a table. Dine-in and takeaway available."
      />
      <meta
        name="keywords"
        content="Thai restaurant Helsinki, Thai food Helsinki, Chao Phraya, Thai takeaway Helsinki, best Thai Helsinki"
      />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={`${siteUrl}/`} />

      {/* Hreflang for supported languages */}
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en/`} />
      <link rel="alternate" hrefLang="fi" href={`${siteUrl}/`} />
      <link rel="alternate" hrefLang="sv" href={`${siteUrl}/sv/`} />

      {/* Open Graph */}
      <meta property="og:type" content="restaurant" />
      <meta
        property="og:title"
        content="Chao Phraya — Authentic Thai Restaurant in Helsinki"
      />
      <meta
        property="og:description"
        content="Authentic Thai flavours in the heart of Helsinki. View menu, opening hours and reserve a table."
      />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Chao Phraya" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Chao Phraya — Authentic Thai Restaurant in Helsinki"
      />
      <meta
        name="twitter:description"
        content="Authentic Thai flavours in the heart of Helsinki. View menu, opening hours and reserve a table."
      />
      <meta name="twitter:image" content={ogImage} />

      {/* Icons / manifest */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#2D3748" />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
    </>
  );
}
