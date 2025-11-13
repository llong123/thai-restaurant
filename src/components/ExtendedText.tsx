import React from "react";
import { Text } from "@chakra-ui/react";
import type { ExtendedTextProps } from "@/lib/types";
import { merriweather } from "./fontVars";

// Default responsive font sizes (overrideable by props)
const DEFAULT_FONT_SIZE = { base: 12, lg: 14 };

export default function ExtendedText({
  fontSize = DEFAULT_FONT_SIZE,
  children,
  ...rest
}: ExtendedTextProps) {
  return (
    <Text
      className={merriweather.className}
      fontSize={fontSize as any}
      {...rest}
    >
      {children}
    </Text>
  );
}
