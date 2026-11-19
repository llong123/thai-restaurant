import { LocaleString } from "./interfaces";

export type { LocaleString };

export const siteMetadata = {
  siteUrl: "https://www.chaophraya.fi",
  title: "Chao Phraya | Thai Restaurant in Helsinki",
  description:
    "Family-recipe Thai food at Hietalahti Market Hall in Helsinki. Explore the menu, opening hours and location of Chao Phraya.",
  openGraphImage:
    "https://res.cloudinary.com/dn1bjdgjf/image/upload/f_auto,q_auto,w_1200/v1795038934/menu_photo_203.jpg",
};

export const getLocaleString = (
  field?: LocaleString,
  language?: string,
): string => {
  if (!field) return "";
  const lang = language || "en";
  return field[lang as keyof LocaleString] || field.en || "";
};

export const useLocale = () => {
  return { getLocaleString };
};

export const clipText = (text?: string, max = 200) => {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
};
