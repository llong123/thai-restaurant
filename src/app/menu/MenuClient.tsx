// app/menu/MenuClient.tsx
"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Flex,
  HStack,
  Badge,
  CloseButton,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import Navigation from "@/components/navigation";
import { pacifico } from "@/components/fontVars";
import { Dish } from "@/components/dish";
import { useTranslation } from "@/lib/translations";
import { useColorModeValue as useChakraColorModeValue } from "@/components/ui/color-mode";

export default function MenuClient({ dishes }: { dishes: any[] }) {
  const { t } = useTranslation();
  const bgColor = useChakraColorModeValue("white", "gray.800");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [language, setLanguage] = useState("en"); // default language

  // Extract unique categories from dishes
  const categories = useMemo(() => {
    const unique = new Set<string>();
    dishes.forEach((dish) => {
      if (dish.category) unique.add(dish.category);
    });
    return Array.from(unique);
  }, [dishes]);

  // Filter dishes based on selected categories
  const filteredDishes = useMemo(() => {
    if (selectedCategories.length === 0) return dishes;
    return dishes.filter((dish) => selectedCategories.includes(dish.category));
  }, [dishes, selectedCategories]);

  // Toggle a category filter
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const clearFilters = () => setSelectedCategories([]);

  if (!dishes?.length) return <p className="p-8">No dishes found.</p>;

  return (
    <Box bg={bgColor} minH="100vh">
      <Navigation />
      <Container maxW="8xl" py={16}>
        <Heading
          size={{ base: "2xl", lg: "4xl" }}
          className={pacifico.className}
          pb={8}
        >
          {t("sections.menu.title")}
        </Heading>
        <Text pb={6}>{t("sections.menu.description")}</Text>

        <Box mb={6}>
          <Text mb={2}>Select Language:</Text>
          <HStack spacing={3}>
            {["en", "fi", "sv"].map((lang) => (
              <Badge
                key={lang}
                cursor="pointer"
                colorScheme={language === lang ? "blue" : "gray"}
                onClick={() => setLanguage(lang)}
              >
                {lang.toUpperCase()}
              </Badge>
            ))}
          </HStack>
        </Box>

        {/* Filter Chips */}
        <Box mb={8}>
          <Box as="h3" fontSize="lg" fontWeight="bold" mb={3}>
            Filter by Category:
          </Box>
          <HStack gap={3} flexWrap="wrap">
            {categories.map((category) => (
              <Badge
                key={category}
                px={selectedCategories.includes(category) ? 2 : 3}
                py={1}
                borderRadius="full"
                border="1px solid"
                borderColor="gray.300"
                cursor="pointer"
                bg={
                  selectedCategories.includes(category)
                    ? "gray.200"
                    : "transparent"
                }
                color={
                  selectedCategories.includes(category)
                    ? "gray.700"
                    : "gray.500"
                }
                onClick={() => toggleCategory(category)}
                display="flex"
                alignItems="center"
                fontSize="sm"
              >
                {category}
                {selectedCategories.includes(category) && (
                  <CloseButton
                    ml={1}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCategory(category);
                    }}
                    aria-label="Remove filter"
                    fontSize="xs"
                    borderRadius="full"
                    p={0.5}
                    minW="16px"
                    h="16px"
                    bg="transparent"
                  />
                )}
              </Badge>
            ))}
            {selectedCategories.length > 0 && (
              <Badge
                px={3}
                py={1}
                borderRadius="full"
                border="1px solid"
                borderColor="gray.300"
                cursor="pointer"
                onClick={clearFilters}
                fontSize="sm"
                color="gray.500"
              >
                Clear All
              </Badge>
            )}
          </HStack>
        </Box>

        <Flex justify="center" w="full">
          <SimpleGrid columns={[1, 2, 3]} gap={8} maxW="1200px" w="full">
            {filteredDishes.map((dish) => (
              <Dish
                key={dish._id}
                name={dish.name?.[language] || dish.name?.en || ""}
                description={
                  dish.description?.[language] || dish.description?.en || ""
                }
                image={`https://placehold.co/600x400/111827/FFFFFF?text=${encodeURIComponent(
                  dish.name?.[language] || dish.name?.en || "",
                )}`}
                price={`€${dish.price}`}
              />
            ))}
          </SimpleGrid>
        </Flex>
      </Container>
    </Box>
  );
}
