"use client";

import {
  Box,
  Button,
  Flex,
  Skeleton,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { Dish } from "@/components/DishComponent";
import { useTranslation } from "@/lib/translations";
import type { DishData, LocaleString } from "@/lib/interfaces";
import { useLanguage } from "@/hooks/LanguageContext";
import type { MenuPageData } from "@/lib/interfaces/menuData";
import { useThemeColors } from "@/components/fontVars";
import ExtendedHeading from "@/components/ExtendedHeading";
import { getLocaleString } from "@/lib/utility";
import { PageLayout } from "@/components/PageLayout";
import Footer from "@/app/footer";
import { BRAND_ORANGE, BRAND_ORANGE_HOVER, BRAND_ORANGE_TEXT } from "@/lib/colors";
import { RichText } from "@/components/RichText";
import { PageContainer } from "@/components/PageContainer";

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

  const photoSections = useMemo(
    () =>
      categories
        .filter((category) =>
          activeCategory === ALL_CATEGORIES || category.key === activeCategory,
        )
        .map((category) => ({
          ...category,
          dishes: dishes.filter((dish) => dish.category?.en === category.key),
        }))
        .filter((category) => category.dishes.length > 0),
    [activeCategory, categories, dishes],
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

  const visibleFullMenuSections = useMemo(
    () =>
      activeCategory === ALL_CATEGORIES
        ? fullMenuSections
        : fullMenuSections.filter((category) => category.key === activeCategory),
    [activeCategory, fullMenuSections],
  );

  if (loading) {
    return (
      <PageLayout>
        <Box textAlign="center" pb={8}>
          <Skeleton height="3rem" maxW="16rem" mx="auto" mb={4} />
          <Skeleton height="1.25rem" maxW="38rem" mx="auto" />
          <Skeleton height="1rem" maxW="28rem" mx="auto" mt={3} />
        </Box>
        <Flex justify="center" wrap="wrap" gap={2} mb={8}>
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} height="2.25rem" width="6rem" borderRadius="md" />
          ))}
        </Flex>
        <PageContainer contentWidth="80rem" gutter={0}>
          <SimpleGrid columns={[1, 2, 3]} gap={{ base: 5, md: 7 }}>
            {Array.from({ length: 6 }, (_, index) => (
              <Box
                key={index}
                overflow="hidden"
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Skeleton height={{ base: "13rem", md: "14rem" }} />
                <Box p={4}>
                  <Skeleton height="1.5rem" mb={3} />
                  <Skeleton height="1rem" mb={2} />
                  <Skeleton height="1rem" width="70%" />
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </PageContainer>
      </PageLayout>
    );
  }
  if (!dishes.length) return <p className="p-8">No dishes found.</p>;

  return (
      <PageLayout>
      <Box textAlign="center" pb={{ base: 8, md: 12 }}>
        <ExtendedHeading as="h2" pb={4}>
          {getText(menuPageData.pageTitle)}
        </ExtendedHeading>
        <Box maxW="56rem" mx="auto">
          <RichText
            text={getText(menuPageData.pageDescription)}
            fontSize="md"
            lineHeight="tall"
          />
          {menuPageData.dishListDescription && (
            <>
              <Box w="2.5rem" h="2px" bg={BRAND_ORANGE} mx="auto" my={4} />
              <RichText
                text={getText(menuPageData.dishListDescription)}
                fontSize="sm"
                opacity={0.78}
              />
            </>
          )}
        </Box>
      </Box>

      <PageContainer
        contentWidth="80rem"
        gutter={0}
        mb={8}
        gap={{ base: 4, lg: 6 }}
        display="flex"
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ base: "stretch", lg: "flex-end" }}
        justifyContent={showFullMenu ? { base: "center", lg: "flex-end" } : "space-between"}
      >
        <Box flex="1" minW={0}>
            <Text
              textAlign={{ base: "center", lg: "left" }}
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="0.12em"
              textTransform="uppercase"
              opacity={0.65}
              mb={2}
            >
              {t("menu.browseCategories")}
            </Text>
            <Flex
              width="full"
              justify={{ base: "center", lg: "flex-start" }}
              wrap="wrap"
              columnGap={{ base: 1, md: 3 }}
              borderBottomWidth="1px"
              borderColor="whiteAlpha.200"
            >
              <Button
                type="button"
                aria-pressed={activeCategory === ALL_CATEGORIES}
                onClick={() => setActiveCategory(ALL_CATEGORIES)}
                size="sm"
                variant="ghost"
                borderRadius="none"
                borderBottomWidth="2px"
                borderBottomColor={activeCategory === ALL_CATEGORIES ? BRAND_ORANGE : "transparent"}
                color={activeCategory === ALL_CATEGORIES ? BRAND_ORANGE : textColor}
                fontWeight={activeCategory === ALL_CATEGORIES ? "bold" : "medium"}
                px={{ base: 2, md: 3 }}
                mb="-1px"
                _hover={{ bg: "transparent", color: BRAND_ORANGE, borderBottomColor: BRAND_ORANGE }}
              >
                {t("menu.allDishes")}
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
                    variant="ghost"
                    borderRadius="none"
                    borderBottomWidth="2px"
                    borderBottomColor={isActive ? BRAND_ORANGE : "transparent"}
                    color={isActive ? BRAND_ORANGE : textColor}
                    fontWeight={isActive ? "bold" : "medium"}
                    px={{ base: 2, md: 3 }}
                    mb="-1px"
                    _hover={{ bg: "transparent", color: BRAND_ORANGE, borderBottomColor: BRAND_ORANGE }}
                  >
                    {category.label}
                  </Button>
                );
              })}
            </Flex>
        </Box>

        <Button
          type="button"
          variant={showFullMenu ? "outline" : "solid"}
          size="md"
          borderRadius="md"
          minW={{ base: "auto", lg: "11rem" }}
          alignSelf={{ base: "center", lg: "auto" }}
          bg={showFullMenu ? "transparent" : BRAND_ORANGE}
          color={showFullMenu ? textColor : BRAND_ORANGE_TEXT}
          borderColor={showFullMenu ? "gray.500" : "transparent"}
          _hover={{ bg: showFullMenu ? "whiteAlpha.100" : BRAND_ORANGE_HOVER }}
          onClick={() => setShowFullMenu((showing) => !showing)}
        >
          {showFullMenu ? t("menu.hideMenu") : t("menu.showMenu")}
        </Button>
      </PageContainer>

      {showFullMenu ? (
        <PageContainer contentWidth="80rem" gutter={0}>
          <SimpleGrid
            columns={visibleFullMenuSections.length > 1 ? [1, 2] : [1]}
            columnGap={{ base: 0, md: 10 }}
            rowGap={{ base: 8, md: 10 }}
          >
            {visibleFullMenuSections.map((category) => (
              <Box key={category.key} as="section" minW={0}>
                <Box
                  pb={3}
                  mb={4}
                  borderBottomWidth="2px"
                  borderColor={BRAND_ORANGE}
                >
                  <ExtendedHeading size="xl">{category.label}</ExtendedHeading>
                </Box>

                <Stack gap={4}>
                  {category.dishes.map((dish) => {
                    const ingredients = dish.ingredients
                      ?.map(getText)
                      .filter(Boolean)
                      .join(", ");
                    const chiliCount = Math.min(Math.max(dish.spiceLevel ?? 0, 0), 3);

                    return (
                      <Box
                        key={dish._id}
                        as="article"
                        pb={3}
                        borderBottomWidth="1px"
                        borderColor="whiteAlpha.200"
                      >
                        <Flex align="baseline" gap={2}>
                          <Flex align="baseline" gap={2} minW={0}>
                            <Text as="h3" fontWeight="bold" lineHeight="short">
                              {getText(dish.name)}
                            </Text>
                            {chiliCount > 0 && (
                              <Text
                                as="span"
                                role="img"
                                aria-label={`${chiliCount} chili spice level`}
                                whiteSpace="nowrap"
                                fontSize="sm"
                              >
                                {"🌶️".repeat(chiliCount)}
                              </Text>
                            )}
                          </Flex>
                          <Box
                            flex="1"
                            minW={3}
                            borderBottomWidth="1px"
                            borderBottomStyle="dotted"
                            borderColor="whiteAlpha.500"
                            alignSelf="baseline"
                            mb="0.3em"
                          />
                          <Text fontWeight="bold" whiteSpace="nowrap" color={BRAND_ORANGE}>
                            {dish.price != null
                              ? `${dish.price.toFixed(2)} €`
                              : t("menu.priceUnavailable")}
                          </Text>
                        </Flex>

                        {getText(dish.description) && (
                          <RichText
                            text={getText(dish.description)}
                            color={textColor}
                            mt={2}
                            fontSize="sm"
                          />
                        )}
                        {ingredients && (
                          <Box as="p" color={textColor} mt={1} fontSize="sm">
                            {t("menu.ingredients")}: {ingredients}
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </PageContainer>
      ) : (
        <PageContainer
          contentWidth="80rem"
          gutter={0}
          display="flex"
          flexDirection="column"
          gap={{ base: 8, md: 12 }}
        >
          {photoSections.map((category) => (
            <Box key={category.key} as="section" aria-labelledby={`category-${category.key}`}>
              <Flex align="center" gap={4} mb={4}>
                <ExtendedHeading id={`category-${category.key}`} size="lg">
                  {category.label}
                </ExtendedHeading>
                <Box flex="1" h="1px" bg={borderColor} opacity={0.45} />
                <Box as="span" fontSize="sm" opacity={0.7}>
                  {category.dishes.length}
                </Box>
              </Flex>
              <SimpleGrid columns={[1, 2, 3]} gap={{ base: 5, md: 7 }}>
                {category.dishes.map((dish) => (
                  <Dish key={dish._id} dish={dish} getLocale={getText} />
                ))}
              </SimpleGrid>
            </Box>
          ))}
        </PageContainer>
      )}

      <Footer />
    </PageLayout>
  );
}
