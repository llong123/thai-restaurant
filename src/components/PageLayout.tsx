"use client";

import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import NavigationComponent from "@/components/NavigationComponent";
import { useThemeColors } from "@/components/fontVars";
import { MAX_WIDTH } from "@/lib/enums";

interface PageLayoutProps {
  children: ReactNode;
  contentPadding?: { base?: number | string; lg?: number | string };
}

export function PageLayout({
  children,
  contentPadding = { base: 4, lg: 8 },
}: PageLayoutProps) {
  const { bgColor } = useThemeColors();

  return (
    <Box bg={bgColor} minH="100vh" w="100%" pt={4}>
      <VStack
        w="100%"
        alignItems="center"
        maxW={MAX_WIDTH.XL}
        mx="auto"
        gap={0}
      >
        <NavigationComponent />
        <Box
          w="100%"
          px={contentPadding}
        >
          {children}
        </Box>
      </VStack>
    </Box>
  );
}
