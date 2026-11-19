import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { getAboutData } from "@/lib/cms/googleSheets";
import { createPageMetadata } from "@/lib/seo";
import { getLocaleString, siteMetadata } from "@/lib/utility";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getAboutData();
    const description = data.paragraph
      ?.map((group) => getLocaleString(group.paragraphDescription, "en"))
      .filter(Boolean)
      .join(" ");
    return createPageMetadata({
      title: getLocaleString(data.title, "en") || "Our Story",
      description: description || siteMetadata.description,
      path: "/about",
    });
  } catch {
    return createPageMetadata({
      title: "Our Story",
      description: siteMetadata.description,
      path: "/about",
    });
  }
}

export default function AboutPage() {
  return <AboutPageClient />;
}
