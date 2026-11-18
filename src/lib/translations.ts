import translations from "./translations.json";
import { Language, TranslationKey } from "./types";

export function useTranslation(lang: Language = "en") {
  const getTranslation = (path: TranslationKey) => {
    const keys = path.split(".");
    let current: any = translations[lang] ?? translations.en;
    let english: any = translations.en;

    for (const key of keys) {
      if (current?.[key] === undefined) {
        if (english?.[key] !== undefined) {
          current = english[key];
          english = english[key];
          continue;
        }
        console.warn(
          `Translation key not found: ${path} for language: ${lang}`,
        );
        return path; // fallback to key itself
      }
      current = current[key];
      english = english?.[key];
    }

    return current;
  };

  return { t: getTranslation };
}
