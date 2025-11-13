"use client";

import { LanguageProvider } from "@/hooks/LanguageContext";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { AppDataProvider } from "@/hooks/AppDataContext";

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider
        attribute="class"
        // Use system so server/client start from same neutral state
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange
      >
        <AppDataProvider>
          <LanguageProvider>{props.children}</LanguageProvider>
        </AppDataProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
