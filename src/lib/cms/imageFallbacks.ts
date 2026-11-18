import type { LocaleString } from "@/lib/interfaces";

const SANITY_IMAGE_BASE = "https://cdn.sanity.io/images/uqmxroum/production";

function image(ref: string, convertTiff = false): string {
  const assetPath = ref.replace(/^image-/, "").replace(/-(jpg|tif)$/, ".$1");
  return `${SANITY_IMAGE_BASE}/${assetPath}${convertTiff ? "?fm=jpg" : ""}`;
}

export const fallbackSiteImages = {
  hero: image("image-46a17bdf8d6e8c6b0660f61e3292cd86173bc5f8-4961x3309-tif", true),
  homeAbout: image("image-1fbad3a6ec68ab178161dbf4602cb27bd6eebd5d-8032x5357-jpg"),
  aboutPage: image("image-3e274027a4aea82556c6a9b55249d44ec51eea38-3508x4385-tif", true),
};

const dishImageFallbacks: Array<{ matches: RegExp; url: string }> = [
  {
    matches: /fried fish with spicy mix of thai herbs/i,
    url: image("image-4204dd8a6b011c20c4d52a93839ae6bf35ede4a2-5284x6604-jpg"),
  },
  {
    matches: /kuoi tieu tom yam chao phraya/i,
    url: image("image-c8909ec0f42d6b1be6f72acdd1166b6d783c9680-5284x6604-jpg"),
  },
  {
    matches: /kuoi tieu rua/i,
    url: image("image-3131cae0c5d4f0a7368097902f64519abf2e7dca-8032x5357-jpg"),
  },
  {
    matches: /som tam puu pla raa/i,
    url: image("image-f286c72961a18f111c8fe84cf80d38d608f260dc-5284x6604-jpg"),
  },
  {
    matches: /som tam thai/i,
    url: image("image-e73ec2e60a066c38d21e12bd2ccd0dfa530787a9-5284x6604-jpg"),
  },
  {
    matches: /tempura shrimps?/i,
    url: image("image-b5e225e864b2ed265c5248807b00b9d6fa01501d-4894x6118-jpg"),
  },
  {
    matches: /chicken wings/i,
    url: image("image-6cc2f2755db1c068074058c7af1d9dc6c1cecaf1-4894x6118-jpg"),
  },
  {
    matches: /pad med mamuang/i,
    url: image("image-629fee7c1cc4acf99a2a510e783fc936e383d5c0-4894x6118-jpg"),
  },
  {
    matches: /pad ka prao/i,
    url: image("image-bad81a72a14b4f3a0d00027b27c3fb62e427b624-4894x6118-jpg"),
  },
  {
    matches: /pad thai/i,
    url: image("image-7460a0c154e0b2eec5582629171f5bc3221f1e0a-4894x6118-jpg"),
  },
  {
    matches: /tom kha/i,
    url: image("image-6e987a2eb468288b7fbe73204acdfdab3b5151ef-8011x5343-jpg"),
  },
  {
    matches: /tom yam|tom yum/i,
    url: image("image-f5cd677569d5dd1287742b4906f77397fe8d9dc2-8011x5343-jpg"),
  },
  {
    matches: /khao soi/i,
    url: image("image-943f9560b263d9b6014ebdf4920df5c5fe4e32b6-5284x6604-jpg"),
  },
  {
    matches: /panang curry/i,
    url: image("image-a70dcf2f9a19935fecffb703b7c5d046b3cc80c2-8192x5464-jpg"),
  },
  {
    matches: /khao pad/i,
    url: image("image-52132db99266840aa1f0ed322397abc4ff9a7fc3-4894x6118-jpg"),
  },
  {
    matches: /ro ?ti/i,
    url: image("image-d52546357009920943848dedf8d44077c05ced7c-5122x6403-jpg"),
  },
  {
    matches: /thai ice milk tea/i,
    url: image("image-04712c67752a16ca21f9f1b1e30b1e2312652bdf-5284x6604-jpg"),
  },
];

export function getDefaultDishImage(name: LocaleString): string | undefined {
  const label = name.en || name.fi || name.sv || name.th || "";
  return dishImageFallbacks.find(({ matches }) => matches.test(label))?.url;
}
