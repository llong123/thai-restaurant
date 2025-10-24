import { client } from "@/sanity/lib/sanityClient";
import LocationClient from "./LocationClient";
import { groq } from "next-sanity";

const VISIT_US_QUERY = groq`
  *[_type == "visitUs"][0]{
    title,
    description,
    sections,
    moreSections,
    map
  }
`;

export default async function LocationPage() {
  const visitUsData = await client.fetch(VISIT_US_QUERY);
  return <LocationClient visitUs={visitUsData} />;
}
