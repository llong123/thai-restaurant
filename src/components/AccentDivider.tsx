import { Box, Flex, type BoxProps } from "@chakra-ui/react";
import { BRAND_ORANGE } from "@/lib/colors";

export function AccentDivider({ my = 4 }: { my?: BoxProps["my"] }) {
  return (
    <Flex
      role="separator"
      aria-orientation="horizontal"
      justify="center"
      gap={1.5}
      w="full"
      my={my}
      display={{ base: "flex", md: "none" }}
    >
      {[0, 1, 2].map((dot) => (
        <Box
          key={dot}
          boxSize="0.35rem"
          borderRadius="full"
          bg={BRAND_ORANGE}
          opacity={dot === 1 ? 0.8 : 0.4}
        />
      ))}
    </Flex>
  );
}
