import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/sanityClient";
import { MenuPageData } from "@/lib/interfaces/menuData";

// ---------- API Handler ---------- //
const MENUPAGE_QUERY = `*[_type == "menupage"][0]{
  _id,
  pageTitle,
  pageDescription,
  category,
  categoryDescription,
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MenuPageData | { error: string }>,
) {
  try {
    const menuData: MenuPageData = await client.fetch(
      MENUPAGE_QUERY,
      {},
      { next: { revalidate: 30 } },
    );

    if (!menuData) {
      return res.status(404).json({ error: "Menu data not found" });
    }

    res.status(200).json(menuData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch menu data" });
  }
}
