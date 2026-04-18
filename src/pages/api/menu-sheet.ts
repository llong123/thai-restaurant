import type { NextApiRequest, NextApiResponse } from "next";
import { fetchMenuFromSheets } from "@/lib/menu/parseMenuCSV";
import { siteMetadata } from "@/lib/utility";

const MENU_URL = siteMetadata.googleSheetsMenuUrl;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const menu = await fetchMenuFromSheets(MENU_URL);
    
    const dishes = menu.flatMap((category) =>
      category.items.map((item, index) => {
        return {
        _id: item.id || `dish-${index}`,
        pageTitle: { en: "" },
        pageDescription: { en: "" },
        name: item.name?.en || "",
        description: item.description,
        ingredients: item.ingredients,
        category: { en: item.category },
        price: item.price,
        spiceLevel: item.spiceLevel,
        dishImage: item.imageUrl
          ? { asset: { _ref: "", _type: "image", url: item.imageUrl } as any }
          : undefined,
        signatureDish: item.signatureDish,
      };
      }),
    );

    res.status(200).json(dishes);
  } catch (error) {
    console.error("Error fetching menu from sheets:", error);
    res.status(500).json({ error: "Failed to fetch menu" } as any);
  }
}