import { Box, type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { MAX_WIDTH } from "@/lib/enums";

interface PageContainerProps extends Omit<BoxProps, "children"> {
  children: ReactNode;
  contentWidth?: BoxProps["maxW"];
  gutter?: BoxProps["px"];
}

export function PageContainer({
  children,
  contentWidth = MAX_WIDTH.XL,
  gutter = { base: 4, md: 8 },
  ...boxProps
}: PageContainerProps) {
  return (
    <Box w="full" maxW={contentWidth} mx="auto" px={gutter} {...boxProps}>
      {children}
    </Box>
  );
}
