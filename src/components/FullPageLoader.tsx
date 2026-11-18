"use client";

import React from "react";
import { Box, Flex, HStack, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";

type FullPageLoaderProps = {
  message?: string;
  bg?: string;
  color?: string;
};

export default function FullPageLoader({
  message = "Loading…",
}: FullPageLoaderProps) {
  return (
    <Box
      position="fixed"
      inset={0}
      bg="gray.800"
      zIndex={9999}
      overflowY="auto"
      px={4}
      role="status"
      aria-label={message}
    >
      <Box maxW="80rem" mx="auto" py={{ base: 5, md: 8 }}>
        <Flex justify="space-between" align="center" mb={{ base: 8, md: 12 }}>
          <Skeleton height="2.75rem" width="8rem" borderRadius="md" />
          <HStack display={{ base: "none", md: "flex" }} gap={5}>
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} height="1rem" width="5rem" />
            ))}
          </HStack>
          <Skeleton display={{ base: "block", md: "none" }} boxSize="2.5rem" borderRadius="md" />
        </Flex>

        <Skeleton height={{ base: "15rem", md: "24rem" }} width="full" borderRadius="xl" />

        <Stack gap={4} mt={{ base: 8, md: 12 }}>
          <Skeleton height="2rem" width="14rem" />
          <Skeleton height="1rem" width="min(100%, 42rem)" />
          <Skeleton height="1rem" width="min(100%, 34rem)" />
        </Stack>

        <SimpleGrid columns={[1, 2, 3]} gap={6} mt={{ base: 8, md: 12 }}>
          {Array.from({ length: 3 }, (_, index) => (
            <Box
              key={index}
              overflow="hidden"
              borderRadius="xl"
              borderWidth="1px"
              borderColor="whiteAlpha.300"
            >
              <Skeleton height="14rem" />
              <Stack p={4} gap={3}>
                <Skeleton height="1.5rem" width="70%" />
                <Skeleton height="1rem" />
                <Skeleton height="1rem" width="85%" />
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
