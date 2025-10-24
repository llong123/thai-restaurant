import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/sanityClient";
import { AboutData } from "@/lib/interfaces/aboutData";

// ---------- API Handler ---------- //

const ABOUT_QUERY = `*[_type == "about"][0]{
  title,
  paragraph,
  paragraphInBox,
  paragraphInBoxTitle,
  mainImage { asset->{url} }
}`;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AboutData | { error: string }>,
) {
  try {
    const aboutData: AboutData = await client.fetch(
      ABOUT_QUERY,
      {},
      { next: { revalidate: 30 } },
    );

    if (!aboutData) {
      return res.status(404).json({ error: "About data not found" });
    }

    res.status(200).json(aboutData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch about data" });
  }
}
