import { LocaleString } from "./interfaces";

export type { LocaleString };

export const siteMetadata = {
  siteUrl: "https://www.chaophraya.fi",
  title: "Chao Phraya — Authentic Thai Restaurant in Helsinki",
  description:
    "Authentic Thai restaurant in Helsinki. See our menu, opening hours and book a table.",
  googleSheetsMenuUrl:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vT9gN22Uc4K-aIaqf7wNwvBwjMKOsbiKw3QY31Rn6ODiqTTS0Bm8poxwowOWrmACjdmad16MXO4xNWV/pub?gid=0&single=true&output=csv",
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
