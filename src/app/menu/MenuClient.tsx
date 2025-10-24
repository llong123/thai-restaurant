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
import { useState, useMemo, useCallback } from "react";
import NavigationComponent from "@/components/NavigationComponent";
import { pacifico } from "@/components/fontVars";
import { Dish } from "@/components/DishComponent";
import { useTranslation } from "@/lib/translations";
import { useColorModeValue as useChakraColorModeValue } from "@/components/ui/color-mode";

import { DishData, LocaleString } from "@/lib/interfaces";
import { useLanguage } from "@/hooks/LanguageContext";
import { MAX_WIDTH } from "@/lib/enums";
import { MenuPageData } from "@/lib/interfaces/menuData";

interface MenuClientProps {
  menuPageData: MenuPageData | null;
  dishes: DishData[];
}

// ---------- 🔹 Component ---------- //

export default function MenuClient({ dishes, menuPageData }: MenuClientProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const bgColor = useChakraColorModeValue("white", "gray.800");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false); // toggle for menu view

  // Utility to safely get localized text
  const getLocaleString = useCallback(
    (field?: LocaleString) => field?.[language] || field?.en || "",
    [language],
  );

  // Unique categories (based on English value)
  const categories = useMemo(() => {
    const unique = new Map<string, DishData>();
    dishes.forEach((dish) => {
      const enCategory = dish.category?.en;
      if (enCategory && !unique.has(enCategory)) {
        unique.set(enCategory, dish);
      }
    });
    return Array.from(unique.entries()).map(([enCategory, dish]) => ({
      en: enCategory,
      label: getLocaleString(dish.category),
    }));
  }, [dishes, getLocaleString]);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    if (selectedCategories.length === 0) return dishes;
    return dishes.filter((dish) =>
      selectedCategories.includes(dish.category!.en!),
    );
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

  if (!dishes?.length || !menuPageData)
    return <p className="p-8">No dishes found.</p>;

  // ---------- 🔹 Render ---------- //
  return (
    <Container maxW={MAX_WIDTH.XL} bg={bgColor} minH="100vh" w="100%" mb={16}>
      <NavigationComponent />

      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
        pb={16}
      >
        <Heading
          size={{ base: "2xl", lg: "4xl" }}
          className={pacifico.className}
          pb={8}
          alignSelf="center"
        >
          {getLocaleString(menuPageData.pageTitle)}
        </Heading>

        <Text pb={6}>{getLocaleString(menuPageData.pageDescription)}</Text>
      </Box>

      {/* Filter Chips */}
      <Box mb={8}>
        <Box as="h4" fontSize="lg" fontWeight="bold" mb={3}>
          {getLocaleString(menuPageData.category)}
        </Box>
        <Box as="p" fontSize="sm" fontStyle="italic" fontWeight="light" mb={3}>
          {getLocaleString(menuPageData.categoryDescription)}
        </Box>
        <HStack gap={3} flexWrap="wrap">
          {categories.map((category) => (
            <Badge
              key={category.en}
              px={selectedCategories.includes(category.en) ? 2 : 3}
              py={1}
              borderRadius="full"
              border="1px solid"
              borderColor="gray.300"
              cursor="pointer"
              bg={
                selectedCategories.includes(category.en)
                  ? "gray.200"
                  : "transparent"
              }
              color={
                selectedCategories.includes(category.en)
                  ? "gray.700"
                  : "gray.500"
              }
              onClick={() => toggleCategory(category.en)}
              display="flex"
              alignItems="center"
              fontSize="sm"
            >
              {/* ✅ Localized category name */}
              {category.label}

              {selectedCategories.includes(category.en) && (
                <CloseButton
                  ml={1}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(category.en);
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
          {showAll ? t("menu.hideMenu") : t("menu.showMenu")}
        </Button>
      </Box>

      {/* Dishes Grid or Full Menu */}
      {showAll ? (
        <>
          {categories
            .sort() // optional: sort category names alphabetically
            .map((category) => {
              const dishesInCategory = filteredDishes.filter(
                (dish) => dish.category!.en! === category.en,
              );
              if (dishesInCategory.length === 0) return null;

              return (
                <Box key={category.en} mb={8}>
                  <Heading size="lg" mb={4}>
                    {category.label}
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
                                {(dish.ingredients as unknown as LocaleString[])
                                  .map((ing) => getLocaleString(ing))
                                  .filter(Boolean)
                                  .join(", ")}
                              </Text>
                            )}
                          </Box>
                          <Box>
                            <Text fontWeight="bold">
                              {dish.price
                                ? `${dish.price} €`
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
              <Dish key={dish._id} dish={dish} getLocale={getLocaleString} />
            ))}
          </SimpleGrid>
        </Flex>
      )}
    </Container>
  );
}
