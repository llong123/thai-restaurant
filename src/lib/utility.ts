import { useLanguage } from "@/hooks/LanguageContext";
import { LocaleString } from "./interfaces";

export const useLocale = (field?: LocaleString) => {
  const { language } = useLanguage();
  if (!field) return "";
  return field[language] || field.en || "";
};
