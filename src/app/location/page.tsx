import type { Metadata } from "next";
import LocationPageClient from "./LocationPageClient";
import { getLocationData } from "@/lib/cms/googleSheets";
import { createPageMetadata } from "@/lib/seo";
import { getLocaleString, siteMetadata } from "@/lib/utility";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getLocationData();
    return createPageMetadata({
      title: "Location & Opening Hours in Helsinki",
      description: getLocaleString(data.description, "en") || siteMetadata.description,
      path: "/location",
    });
  } catch {
    return createPageMetadata({
      title: "Restaurant Location & Opening Hours in Helsinki",
      description: siteMetadata.description,
      path: "/location",
    });
  }
}

export default function LocationPage() {
  return <LocationPageClient />;
}
