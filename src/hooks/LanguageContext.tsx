"use client";
import { Language } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Luo Context, alustetaan undefined:lla
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Provider-komponentti
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fi");

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
