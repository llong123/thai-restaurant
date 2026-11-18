"use client";

import {
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { Dish } from "@/components/DishComponent";
import { useTranslation } from "@/lib/translations";
import type { DishData, LocaleString } from "@/lib/interfaces";
import { useLanguage } from "@/hooks/LanguageContext";
import type { MenuPageData } from "@/lib/interfaces/menuData";
import { useThemeColors } from "@/components/fontVars";
import ExtendedHeading from "@/components/ExtendedHeading";
import ExtendedText from "@/components/ExtendedText";
import FullPageLoader from "@/components/FullPageLoader";
import { getLocaleString } from "@/lib/utility";
import { PageLayout } from "@/components/PageLayout";
import Footer from "@/app/footer";

interface MenuClientProps {
  menuPageData: MenuPageData;
  dishes: DishData[];
  loading: boolean;
}

const ALL_CATEGORIES = "__all__";

export default function MenuClient({
  dishes,
  menuPageData,
  loading,
}: MenuClientProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { borderColor, textColor } = useThemeColors();
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  const getText = useCallback(
    (field?: LocaleString) => getLocaleString(field, language),
    [language],
  );

  const categories = useMemo(() => {
    const categoryMap = new Map<string, LocaleString>();
    dishes.forEach((dish) => {
      const key = dish.category?.en;
      if (key && !categoryMap.has(key)) categoryMap.set(key, dish.category!);
    });
    return Array.from(categoryMap, ([key, label]) => ({ key, label: getText(label) }));
  }, [dishes, getText]);

  const visibleDishes = useMemo(
    () =>
      activeCategory === ALL_CATEGORIES
        ? dishes
        : dishes.filter((dish) => dish.category?.en === activeCategory),
    [activeCategory, dishes],
  );

  const fullMenuSections = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          dishes: dishes.filter((dish) => dish.category?.en === category.key),
        }))
        .filter((category) => category.dishes.length > 0),
    [categories, dishes],
  );

  if (loading) return <FullPageLoader message={t("loading")} />;
  if (!dishes.length) return <p className="p-8">No dishes found.</p>;

  return (
    <PageLayout>
      <Box textAlign="center" pb={{ base: 8, md: 12 }}>
        <ExtendedHeading as="h2" pb={4}>
          {getText(menuPageData.pageTitle)}
        </ExtendedHeading>
        <ExtendedText>{getText(menuPageData.pageDescription)}</ExtendedText>
      </Box>

      {menuPageData.dishListTitle && (
        <Box textAlign="center" pb={8}>
          <ExtendedHeading as="h3" pb={3}>
            {getText(menuPageData.dishListTitle)}
          </ExtendedHeading>
          {menuPageData.dishListDescription && (
            <ExtendedText>{getText(menuPageData.dishListDescription)}</ExtendedText>
          )}
        </Box>
      )}

      {!showFullMenu && (
        <Box mb={6} overflowX="auto" pb={2}>
          <HStack minW="max-content" justify={{ base: "flex-start", md: "center" }} gap={2}>
            <Button
              type="button"
              aria-pressed={activeCategory === ALL_CATEGORIES}
              onClick={() => setActiveCategory(ALL_CATEGORIES)}
              size="sm"
              borderRadius="full"
              borderWidth="1px"
              borderColor={activeCategory === ALL_CATEGORIES ? "orange.500" : borderColor}
              bg={activeCategory === ALL_CATEGORIES ? "orange.500" : "transparent"}
              color={activeCategory === ALL_CATEGORIES ? "white" : textColor}
              _hover={{ bg: "orange.600", color: "white", borderColor: "orange.600" }}
            >
              {language === "fi" ? "Kaikki" : language === "sv" ? "Alla" : "All dishes"}
            </Button>
            {categories.map((category) => {
              const isActive = activeCategory === category.key;
              return (
                <Button
                  key={category.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category.key)}
                  size="sm"
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor={isActive ? "orange.500" : borderColor}
                  bg={isActive ? "orange.500" : "transparent"}
                  color={isActive ? "white" : textColor}
                  _hover={{ bg: "orange.600", color: "white", borderColor: "orange.600" }}
                >
                  {category.label}
                </Button>
              );
            })}
          </HStack>
        </Box>
      )}

      <Flex justify="center" mb={8}>
        <Button
          type="button"
          colorPalette="orange"
          variant={showFullMenu ? "outline" : "solid"}
          size="md"
          onClick={() => setShowFullMenu((showing) => !showing)}
        >
          {showFullMenu ? t("menu.hideMenu") : t("menu.showMenu")}
        </Button>
      </Flex>

      {showFullMenu ? (
        <Stack gap={10}>
          {fullMenuSections.map((category) => (
            <Box key={category.key}>
              <ExtendedHeading size="lg" mb={4}>
                {category.label}
              </ExtendedHeading>
              <Stack gap={3}>
                {category.dishes.map((dish) => {
                  const ingredients = dish.ingredients
                    ?.map(getText)
                    .filter(Boolean)
                    .join(", ");
                  return (
                    <Flex
                      key={dish._id}
                      as="article"
                      justify="space-between"
                      align="flex-start"
                      gap={5}
                      p={{ base: 4, md: 5 }}
                      borderWidth="1px"
                      borderColor={borderColor}
                      borderRadius="lg"
                      bg={{ base: "transparent", _dark: "whiteAlpha.50" }}
                    >
                      <Box flex="1" minW={0}>
                        <ExtendedHeading size="md">
                          {getText(dish.name)}
                        </ExtendedHeading>
                        {getText(dish.description) && (
                          <ExtendedText color={textColor} mt={2}>
                            {getText(dish.description)}
                          </ExtendedText>
                        )}
                        {ingredients && (
                          <Box as="p" color={textColor} mt={2} fontSize="sm">
                            {t("menu.ingredients")}: {ingredients}
                          </Box>
                        )}
                      </Box>
                      <Box flexShrink={0} textAlign="right">
                        <ExtendedText fontWeight="bold" whiteSpace="nowrap">
                          {dish.price != null
                            ? `${dish.price.toFixed(2)} €`
                            : t("menu.priceUnavailable")}
                        </ExtendedText>
                        {dish.spiceLevel != null && dish.spiceLevel > 0 && (
                          <ExtendedText mt={1} aria-label={`${dish.spiceLevel} spice level`}>
                            {"🌶️".repeat(dish.spiceLevel)}
                          </ExtendedText>
                        )}
                      </Box>
                    </Flex>
                  );
                })}
              </Stack>
            </Box>
          ))}
        </Stack>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} gap={{ base: 5, md: 7 }} maxW="80rem" mx="auto" w="full">
          {visibleDishes.map((dish) => (
            <Dish key={dish._id} dish={dish} getLocale={getText} />
          ))}
        </SimpleGrid>
      )}

      <Footer />
    </PageLayout>
  );
}
