import type { Metadata } from "next";
import type { DishData } from "@/lib/interfaces";
import { siteMetadata } from "@/lib/utility";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = siteMetadata.openGraphImage,
}: PageMetadataInput): Metadata {
  const url = new URL(path, siteMetadata.siteUrl).toString();
  const cleanDescription = description.replace(/\s+/g, " ").trim();
  const searchDescription =
    cleanDescription.length <= 160
      ? cleanDescription
      : `${cleanDescription.slice(0, 157).replace(/\s+\S*$/, "")}…`;
  const socialTitle = title.includes("Chao Phraya")
    ? title
    : `${title} | Chao Phraya`;

  return {
    title: { absolute: socialTitle },
    description: searchDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_FI",
      url,
      siteName: "Chao Phraya",
      title: socialTitle,
      description: searchDescription,
      images: [{ url: image, alt: "Chao Phraya Thai food in Helsinki" }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: searchDescription,
      images: [image],
    },
  };
}

export function createMenuStructuredData(dishes: DishData[]) {
  const sections = new Map<string, DishData[]>();
  for (const dish of dishes) {
    const category = dish.category?.en || "Menu";
    const items = sections.get(category) || [];
    items.push(dish);
    sections.set(category, items);
  }

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Chao Phraya Thai Restaurant Menu",
    url: `${siteMetadata.siteUrl}/menu`,
    hasMenuSection: Array.from(sections, ([name, items]) => ({
      "@type": "MenuSection",
      name,
      hasMenuItem: items.map((dish) => ({
        "@type": "MenuItem",
        name: dish.name.en || dish.name.fi || dish.name.sv || dish.name.th,
        description: dish.description?.en,
        offers:
          dish.price != null
            ? {
                "@type": "Offer",
                price: dish.price.toFixed(2),
                priceCurrency: "EUR",
              }
            : undefined,
      })),
    })),
  };
}
