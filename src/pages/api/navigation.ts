import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/sanityClient";
import { NavigationData } from "@/lib/interfaces/navigationData";

// ---------- API Handler ---------- //

const NAVIGATION_QUERY = `*[_type == "navigation"][0]{
      siteTitle,
      links[]{
        name,
        href
      },
      button{
        label,
        href
      },
      languages
      }`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NavigationData | { error: string }>,
) {
  try {
    const navigationData: NavigationData = await client.fetch(
      NAVIGATION_QUERY,
      {},
      { next: { revalidate: 30 } },
    );

    if (!navigationData) {
      return res.status(404).json({ error: "About data not found" });
    }

    res.status(200).json(navigationData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch about data" });
  }
}
