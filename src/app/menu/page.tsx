'use client';

import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import Navigation from "@/components/navigation";
import { useTranslation } from "@/lib/translations";
import { pacifico } from "@/components/fontVars";
import { ExtendedHeadingProps, ExtendedTextProps, ExtendedFlexProps } from "@/lib/types";
import { Dish } from "@/components/dish";
import dishes from "@/data/thai-dishes.json";
import { useColorModeValue } from "@/components/ui/color-mode";

const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;
const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedFlex = Flex as React.ComponentType<ExtendedFlexProps>;

export default function MenuPage() {
  const { t } = useTranslation();
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box bg={bgColor} minH="100vh">
      <Navigation />
      <Container maxW="8xl" py={16}>
        <ExtendedHeading
          size={{ base: "2xl", lg: "4xl" }}
          className={pacifico.className}
          w="full"
          pb={8}
        >
          {t("sections.menu.title")}
        </ExtendedHeading>
        <ExtendedText w="full" pb={12}>
          {t("sections.menu.description")}
        </ExtendedText>
        <ExtendedFlex justify="center" w="full">
          <SimpleGrid columns={[1, 2, 3]} gap={8} maxW="1200px" w="full">
            {dishes.dishes.map((dish) => (
              <Dish 
                key={dish.id} 
                name={dish.name}
                description={dish.description}
                image={`https://placehold.co/600x400/111827/FFFFFF?text=${encodeURIComponent(dish.name)}`}
                price={`€${dish.price}`}
              />
            ))}
          </SimpleGrid>
        </ExtendedFlex>
      </Container>
    </Box>
  );
}