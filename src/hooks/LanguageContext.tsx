"use client";
import { Language } from "@/lib/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Luo Context, alustetaan undefined:lla
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Provider-komponentti
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fi");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const browserLang = navigator.language?.slice(0, 2).toLowerCase() as Language; // e.g. 'en', 'fi', 'sv', 'de'
      const supportedLangs: Language[] = ["en", "fi", "sv"];
      if (browserLang && supportedLangs.includes(browserLang)) {
        setLanguage(browserLang);
      } else {
        setLanguage("en");
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook Contextin käyttämiseen
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
