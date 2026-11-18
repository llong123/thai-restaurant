"use client";

import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";
import NavigationComponent from "@/components/NavigationComponent";
import { useThemeColors } from "@/components/fontVars";
import { PageContainer } from "@/components/PageContainer";

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
    <Box bg={bgColor} minH="100vh" w="100%" display="flex" flexDirection="column">
      <NavigationComponent />
      <PageContainer
        as="main"
        flex="1"
        display="flex"
        flexDirection="column"
        gutter={contentPadding}
        pt={{ base: 4, md: 6 }}
      >
        {children}
      </PageContainer>
    </Box>
  );
}
