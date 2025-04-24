import translations from './translations.json';
import { TranslationKey } from './types';

export function useTranslation() {
  const getTranslation = (path: TranslationKey) => {
    const keys = path.split('.');
    let current: any = translations;
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation key not found: ${path}`);
        return path;
      }
      current = current[key];
    }
    
    return current;
  };

  return { t: getTranslation };
} 