import { useLanguage } from "@/hooks/LanguageContext";
import { LocaleString } from "./interfaces";

export const useLocale = (field?: LocaleString) => {
  const { language } = useLanguage();
  if (!field) return "";
  return field[language] || field.en || "";
};
// Clip long descriptions to `max` characters and append ellipsis
export const clipText = (text?: string, max = 200) => {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
};
