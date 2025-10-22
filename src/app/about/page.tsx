// app/about/page.tsx
import { client } from "@/sanity/lib/client";
import AboutClient from "./AboutClient";

const ABOUT_QUERY = `*[_type == "about"][0]{
  title,
  paragraph,
  paragraphInBox,
  paragraphInBoxTitle,
  mainImage
}`;

export const revalidate = 30; // ISR: re-fetch every 30s

export default async function AboutPage() {
  try {
    const about = await client.fetch(ABOUT_QUERY);

    if (!about) {
      return <p className="p-8">No about content found.</p>;
    }

    return <AboutClient about={about} />;
  } catch (err) {
    console.error("Error fetching About document:", err);
    return <p className="p-8">Error loading about content.</p>;
  }
}
