import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/sanityClient";
import { FooterData } from "@/lib/interfaces/footerData";

// ---------- API Handler ---------- //

const FOOTER_QUERY = `*[_type=="footer"][0]{
  quickLinks,
  followUs,
  copyright
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FooterData | { error: string }>,
) {
  try {
    const footerData: FooterData = await client.fetch(
      FOOTER_QUERY,
      {},
      { next: { revalidate: 30 } },
    );

    if (!footerData) {
      return res.status(404).json({ error: "Footer data not found" });
    }

    res.status(200).json(footerData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch footer data" });
  }
}
