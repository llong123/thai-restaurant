import type { NextApiRequest, NextApiResponse } from "next";
import { getMenuPageData } from "@/lib/cms/googleSheets";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = await getMenuPageData();
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json(data);
  } catch (error) {
    console.error("Failed to fetch menu page data from Google Sheets:", error);
    res.status(500).json({ error: "Failed to fetch menu data" });
  }
}
