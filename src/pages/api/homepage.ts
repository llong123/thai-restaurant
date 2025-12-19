import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/sanityClient";
import { HomepageData } from "@/lib/interfaces/homeData";

// ------------------ API Handler ------------------ //
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HomepageData | { error: string }>,
) {
  try {
    const data: HomepageData = await client.fetch(
      `*[_type == "homepage"][0]{
      hero,
      signatureDishes,
      about,
      reserveTable,
      location,
      alertBanner
    }`,
      {},
      { next: { revalidate: 30 } },
    );

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch homepage data" });
  }
}
