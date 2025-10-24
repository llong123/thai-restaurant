import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/sanityClient";
import { DishData } from "@/lib/interfaces";

// ---------- API Handler ---------- //
const DISHES_QUERY = `*[_type == "dish"]{
  _id,
  name,
  description,
  ingredients,
  category,
  price,
  spiceLevel,
  dishImage { asset->{url} }
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DishData | { error: string }>,
) {
  try {
    const dishData: DishData = await client.fetch(
      DISHES_QUERY,
      {},
      { next: { revalidate: 30 } },
    );

    if (!dishData) {
      return res.status(404).json({ error: "Dish data not found" });
    }

    res.status(200).json(dishData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch dish data" });
  }
}
