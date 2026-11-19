import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { getHomepageData } from "@/lib/cms/googleSheets";
import { createPageMetadata } from "@/lib/seo";
import { getLocaleString, siteMetadata } from "@/lib/utility";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getHomepageData();
    const heroDescription = getLocaleString(data.hero.description, "en");
    return createPageMetadata({
      title: "Thai Restaurant in Helsinki",
      description: heroDescription
        ? `${heroDescription} Visit Chao Phraya at Hietalahti Market Hall in Helsinki.`
        : siteMetadata.description,
      path: "/",
      image: data.hero.image || siteMetadata.openGraphImage,
    });
  } catch {
    return createPageMetadata({
      title: siteMetadata.title,
      description: siteMetadata.description,
      path: "/",
    });
  }
}

export default function HomePage() {
  return <HomePageClient />;
}
