import type { NextApiRequest, NextApiResponse } from "next";
import { getAllDatabaseItems } from "@lib/notion-queries";
import { parsePage } from "@lib/parse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const pages = await getAllDatabaseItems();
  const items = pages.map(parsePage);
  res.status(200).json(items);
}
