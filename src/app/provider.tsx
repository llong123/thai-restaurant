"use client";

import { LanguageProvider } from "@/hooks/LanguageContext";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { AppDataProvider } from "@/hooks/AppDataContext";
import type { AppDataInitialData } from "@/hooks/AppDataContext";

export default function Provider(props: {
  children: React.ReactNode;
  initialData?: AppDataInitialData;
}) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider
        attribute="class"
        // Use system so server/client start from same neutral state
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange
      >
          <AppDataProvider initialData={props.initialData}>
          <LanguageProvider>{props.children}</LanguageProvider>
        </AppDataProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
