import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/sanityClient";
import { LocationData } from "@/lib/interfaces/locationData";

// ---------- API Handler ---------- //

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LocationData | { error: string }>,
) {
  try {
    const query = `
      *[_type == "visitUs"][0]{
        title,
        description,
        sections,
        moreSections,
        map
      }
    `;

    const locationData: LocationData = await client.fetch(
      query,
      {},
      { next: { revalidate: 30 } },
    );

    if (!locationData) {
      return res.status(404).json({ error: "Location data not found" });
    }

    res.status(200).json(locationData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch location data" });
  }
}
