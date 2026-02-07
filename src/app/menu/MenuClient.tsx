"use client";

import {
  Box,
  SimpleGrid,
  Flex,
  HStack,
  Badge,
  CloseButton,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useState, useMemo, useCallback } from "react";
import { Dish } from "@/components/DishComponent";
import { useTranslation } from "@/lib/translations";

import { DishData } from "@/lib/interfaces";
import { useLanguage } from "@/hooks/LanguageContext";
import { MenuPageData } from "@/lib/interfaces/menuData";
import { useThemeColors } from "@/components/fontVars";
import ExtendedHeading from "@/components/ExtendedHeading";
import ExtendedText from "@/components/ExtendedText";
import FullPageLoader from "@/components/FullPageLoader";
import { getLocaleString, type LocaleString } from "@/lib/utility";
import { PageLayout } from "@/components/PageLayout";
import Footer from "@/app/footer";

interface MenuClientProps {
  menuPageData: MenuPageData | null;
  dishes: DishData[];
  loading: boolean;
}

// ---------- 🔹 Component ---------- //

export default function MenuClient({
  dishes,
  menuPageData,
  loading,
}: MenuClientProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const { borderColor, textColor } = useThemeColors();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const getText = useCallback(
    (field?: LocaleString) => getLocaleString(field, language),
    [language],
  );

  // Unique categories (based on English value)
  const categories = useMemo(() => {
    const unique = new Map<string, typeof dishes[0]>();
    dishes.forEach((dish) => {
      const enCategory = dish.category?.en;
      if (enCategory && !unique.has(enCategory)) {
        unique.set(enCategory, dish);
      }
    });
    return Array.from(unique.entries()).map(([enCategory, dish]) => ({
      en: enCategory,
      label: getText(dish.category),
    }));
  }, [dishes, getText]);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    if (selectedCategories.length === 0) return dishes;
    return dishes.filter((dish) =>
      selectedCategories.includes(dish.category?.en || ""),
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
  if (loading) return <FullPageLoader message={t("loading")} />;

  if (!dishes?.length || !menuPageData)
    return <p className="p-8">No dishes found.</p>;

  // ---------- 🔹 Render ---------- //
  return (
    <PageLayout>
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
        pb={16}
      >
        <ExtendedHeading as={"h2"} pb={8} alignSelf="center">
          {getText(menuPageData.pageTitle)}
        </ExtendedHeading>

        <ExtendedText pb={6}>
          {getText(menuPageData.pageDescription)}
        </ExtendedText>
      </Box>

      {/* Filter Chips */}
      <Box mb={8}>
        <Box as="h4" fontSize="lg" fontWeight="bold" mb={3}>
          {getText(menuPageData.category)}
        </Box>
        <Box
          as="p"
          fontSize="sm"
          fontStyle="italic"
          fontWeight="light"
          mb={3}
        >
          {getText(menuPageData.categoryDescription)}
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
                  minW="1rem"
                  h="1rem"
                  bg="transparent"
                  color="gray.950"
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
                (dish) => (dish.category?.en || "") === category.en,
              );
              if (dishesInCategory.length === 0) return null;

              return (
                <Box key={category.en} mb={8}>
                  <ExtendedHeading size="lg" mb={4}>
                    {category.label}
                  </ExtendedHeading>
                  <Stack spaceY={2}>
                    {dishesInCategory.map((dish) => (
                      <Box
                        key={dish._id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor={borderColor}
                      >
                        <Flex justify="space-between" align="center" gap={4}>
                          <Box>
                            <ExtendedHeading size="md">
                              {dish.name}
                            </ExtendedHeading>
                            <ExtendedText color={textColor} mt={2}>
                              {getText(dish.description)}
                            </ExtendedText>
                            {dish.ingredients?.length && (
                              <ExtendedText color={textColor} mt={2}>
                                {t("menu.ingredients")}:{" "}
                                {dish.ingredients
                                  ?.map((ing) => getText(ing))
                                  .filter(Boolean)
                                  .join(", ")}
                              </ExtendedText>
                            )}
                          </Box>
                          <Box>
                            <ExtendedText fontWeight="bold">
                              {dish.price ? (
                                <>
                                  {dish.price}
                                  {"\u00A0"}€
                                </>
                              ) : (
                                t("menu.priceUnavailable")
                              )}
                            </ExtendedText>
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
          <SimpleGrid columns={[1, 2, 3]} gap={8} maxW="75rem" w="full">
            {filteredDishes.map((dish) => (
              <Dish key={dish._id} dish={dish} getLocale={getText} />
            ))}
          </SimpleGrid>
        </Flex>
      )}

      <Footer />
    </PageLayout>
  );
}
