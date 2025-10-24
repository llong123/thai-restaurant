// app/menu/page.tsx
import { client } from "@/sanity/lib/sanityClient";
import MenuClient from "./MenuClient";

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

const MENUPAGE_QUERY = `*[_type == "menupage"][0]{
  _id,
  pageTitle,
  pageDescription,
  category,
  categoryDescription,
}`;

export const revalidate = 30; // ✅ revalidate every 30 seconds

export default async function MenuPage() {
  const dishes = await client.fetch(
    DISHES_QUERY,
    {},
    { next: { revalidate: 30 } },
  );

  const menuData = await client.fetch(
    MENUPAGE_QUERY,
    {},
    { next: { revalidate: 30 } },
  );

  return <MenuClient dishes={dishes} menuPageData={menuData} />;
}
