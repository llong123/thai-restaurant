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
  Button,
  Stack,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import NavigationComponent from "@/components/NavigationComponent";
import { pacifico } from "@/components/fontVars";
import { Dish } from "@/components/dish";
import { useTranslation } from "@/lib/translations";
import { useColorModeValue as useChakraColorModeValue } from "@/components/ui/color-mode";

import { LocaleString } from "@/lib/interfaces";
import { useLanguage } from "@/hooks/LanguageContext";

interface DishImage {
  asset?: {
    url: string;
  };
}

interface DishData {
  _id: string;
  name: string;
  description?: LocaleString;
  ingredients?: string[];
  category?: string;
  price?: number;
  spiceLevel?: string;
  dishImage?: DishImage;
}

interface MenuClientProps {
  dishes: DishData[];
}

// ---------- 🔹 Component ---------- //

export default function MenuClient({ dishes }: MenuClientProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const bgColor = useChakraColorModeValue("white", "gray.800");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false); // toggle for menu view

  // Utility to safely get localized text
  const getLocaleString = (field?: LocaleString) =>
    field?.[language] || field?.en || "";

  // Unique categories
  const categories = useMemo(() => {
    const unique = new Set<string>();
    dishes.forEach((dish) => {
      if (dish.category) unique.add(dish.category);
    });
    return Array.from(unique);
  }, [dishes]);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    if (selectedCategories.length === 0) return dishes;
    return dishes.filter((dish) => selectedCategories.includes(dish.category!));
  }, [dishes, selectedCategories]);

  // Toggle filters
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const clearFilters = () => setSelectedCategories([]);

  if (!dishes?.length) return <p className="p-8">No dishes found.</p>;

  // ---------- 🔹 Render ---------- //
  return (
    <Box bg={bgColor} minH="100vh">
      <NavigationComponent />
      <Container maxW="8xl" py={16}>
        <Heading
          size={{ base: "2xl", lg: "4xl" }}
          className={pacifico.className}
          pb={4}
        >
          {t("sections.menu.title")}
        </Heading>
        <Text pb={6}>{t("sections.menu.description")}</Text>

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

        {/* View All Dishes Button */}
        <Box mb={8} textAlign="center">
          <Button
            colorScheme="primary"
            size="lg"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Hide Menu" : "View All Dishes"}
          </Button>
        </Box>

        {/* Dishes Grid or Full Menu */}
        {showAll ? (
          <>
            {categories
              .sort() // optional: sort category names alphabetically
              .map((category) => {
                const dishesInCategory = filteredDishes.filter(
                  (dish) => dish.category === category,
                );
                if (dishesInCategory.length === 0) return null;

                return (
                  <Box key={category} mb={8}>
                    <Heading size="lg" mb={4}>
                      {category}{" "}
                      {/* You can also localize category names if needed */}
                    </Heading>
                    <Stack spaceY={2}>
                      {dishesInCategory.map((dish) => (
                        <Box
                          key={dish._id}
                          p={4}
                          borderWidth="1px"
                          borderRadius="md"
                        >
                          <Flex justify="space-between" align="start" gap={4}>
                            <Box>
                              <Heading size="md">{dish.name}</Heading>
                              <Text fontSize="sm" color="gray.600">
                                {getLocaleString(dish.description)}
                              </Text>
                              {dish.ingredients?.length && (
                                <Text fontSize="sm" color="gray.500" mt={2}>
                                  {t("menu.ingredients")}:{" "}
                                  {(
                                    dish.ingredients as unknown as LocaleString[]
                                  )
                                    .map((ing) => getLocaleString(ing))
                                    .filter(Boolean)
                                    .join(", ")}
                                </Text>
                              )}
                            </Box>
                            <Box>
                              <Text fontWeight="bold">
                                {dish.price
                                  ? `€${dish.price}`
                                  : t("menu.priceUnavailable")}
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                );
              })}
          </>
        ) : (
          // Your existing grid view
          <Flex justify="center" w="full">
            <SimpleGrid columns={[1, 2, 3]} gap={8} maxW="1200px" w="full">
              {filteredDishes.map((dish) => (
                <Dish
                  key={dish._id}
                  name={dish.name}
                  description={getLocaleString(dish.description)}
                  image={
                    dish.dishImage?.asset?.url ||
                    `https://placehold.co/600x400/111827/FFFFFF?text=${encodeURIComponent(
                      dish.name,
                    )}`
                  }
                  price={
                    dish.price ? `€${dish.price}` : t("menu.priceUnavailable")
                  }
                />
              ))}
            </SimpleGrid>
          </Flex>
        )}
      </Container>
    </Box>
  );
}
