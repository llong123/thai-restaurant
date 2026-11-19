import type { Metadata } from "next";
import MenuPageClient from "./MenuPageClient";
import { getMenuPageData, getSheetDishes } from "@/lib/cms/googleSheets";
import { createMenuStructuredData, createPageMetadata } from "@/lib/seo";
import { getLocaleString, siteMetadata } from "@/lib/utility";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getMenuPageData();
    const menuDescription =
      getLocaleString(data.dishListDescription || data.pageDescription, "en") ||
      siteMetadata.description;
    return createPageMetadata({
      title: "Thai Menu in Helsinki",
      description: menuDescription,
      path: "/menu",
    });
  } catch {
    return createPageMetadata({
      title: "Thai Menu in Helsinki",
      description: siteMetadata.description,
      path: "/menu",
    });
  }
}

export default async function MenuPage() {
  let structuredData: string | undefined;
  try {
    structuredData = JSON.stringify(createMenuStructuredData(await getSheetDishes()));
  } catch {
    // Keep the menu page available if Google Sheets is temporarily unreachable.
  }

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData.replace(/</g, "\\u003c") }}
        />
      )}
      <MenuPageClient />
    </>
  );
}
