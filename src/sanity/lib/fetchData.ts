import { client } from "./sanityClient";

export async function fetchHome() {
  const query = `*[_type == "homepage"][0]{
    hero,
    signatureDishes,
    about,
    location,
    footer
  }`;

  const data = await client.fetch(query);
  return data;
}
