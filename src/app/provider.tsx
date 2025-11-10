"use client";

import { LanguageProvider } from "@/hooks/LanguageContext";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { AppDataProvider } from "@/hooks/AppDataContext";


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        <AppDataProvider>
          <LanguageProvider>{props.children}</LanguageProvider>
        </AppDataProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
