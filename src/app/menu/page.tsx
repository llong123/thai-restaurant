// app/menu/page.tsx
import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import MenuClient from "./MenuClient";

const DISHES_QUERY = `*[_type == "dish"]{
  _id,
  name,
  description,
  ingredients,
  category,
  price,
  spiceLevel
}`;

export const revalidate = 30; // ✅ revalidate every 30 seconds

export default async function MenuPage() {
  const dishes = await client.fetch<SanityDocument[]>(
    DISHES_QUERY,
    {},
    { next: { revalidate: 30 } },
  );

  console.log(dishes);
  return <MenuClient dishes={dishes} />;
}
