"use client";

import React from "react";
import { Box, VStack, Spinner, Text } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

type FullPageLoaderProps = {
  message?: string;
  spinnerSize?: "sm" | "md" | "lg" | "xl";
  bg?: string;
  color?: string;
};

export default function FullPageLoader({
  message = "Loading…",
  spinnerSize = "xl",
  bg,
}: FullPageLoaderProps) {
  const color = "whiteAlpha.900";

  return (
    <Box
      position="fixed"
      inset={0}
      bg="gray.800"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack spaceX={4} textAlign="center">
        <Spinner
          size={spinnerSize}
          animationDuration="0.7s"
          borderWidth={4}
          color={color}
        />
        <Text
          fontSize={{ base: "md", lg: "lg" }}
          color={color}
          fontWeight="semibold"
        >
          {message}
        </Text>
      </VStack>
    </Box>
  );
}
