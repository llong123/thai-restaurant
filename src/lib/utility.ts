import { LocaleString } from "./interfaces";

export type { LocaleString };

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
