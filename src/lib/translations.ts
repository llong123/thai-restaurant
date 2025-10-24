import translations from "./translations.json";
import { Language, TranslationKey } from "./types";

export function useTranslation(lang: Language = "en") {
  const getTranslation = (path: TranslationKey) => {
    const keys = path.split(".");
    let current: any = translations[lang]; // select language

    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(
          `Translation key not found: ${path} for language: ${lang}`,
        );
        return path; // fallback to key itself
      }
      current = current[key];
    }

    return current;
  };

  return { t: getTranslation };
}
