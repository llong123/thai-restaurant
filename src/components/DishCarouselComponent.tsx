"use client";

import {
  Box,
  Flex,
  IconButton,
  Skeleton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { LuArrowRight, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Dish } from "./DishComponent";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/LanguageContext";
import { DishData } from "@/lib/interfaces";
import { useTranslation } from "@/lib/translations";
import { getLocaleString, type LocaleString } from "@/lib/utility";
import { ActionButton } from "@/components/ActionButton";

// ---------- 🔹 Component ---------- //

export default function DishCarousel() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [dishes, setDishes] = useState<DishData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 1;
  const router = useRouter();
  const maxIndex = Math.max(0, dishes.length - slidesToShow);

  // Fetch featured dishes from the Google Sheets CMS
  useEffect(() => {
    let mounted = true;
    async function fetchDishes() {
      try {
        const res = await fetch("/api/dish");
        if (!res.ok) throw new Error(`Failed to fetch dishes (${res.status})`);
        if (!mounted) return;
        const data: DishData[] = await res.json();
        if (mounted) setDishes(data);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchDishes();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (
      loading ||
      isHovered ||
      hasFocus ||
      prefersReducedMotion ||
      dishes.length <= slidesToShow
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setCurrentIndex((index) => (index >= maxIndex ? 0 : index + 1));
    }, 5000);

    return () => window.clearInterval(timer);
  }, [
    dishes.length,
    hasFocus,
    isHovered,
    loading,
    maxIndex,
    prefersReducedMotion,
    slidesToShow,
  ]);

  // Utility for localized text
  const getText = (field?: LocaleString) => getLocaleString(field, language);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : Math.min(prevIndex + slidesToShow, maxIndex),
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : Math.max(0, prevIndex - slidesToShow),
    );
  };

  const visibleDishes = dishes.slice(currentIndex, currentIndex + slidesToShow);

  if (loading) {
    return (
      <Box w="100%" maxW="75rem" mx="auto" px={4}>
        <Box
          display="grid"
          gridTemplateColumns={`repeat(${slidesToShow}, minmax(0, 1fr))`}
          gap={8}
        >
          {Array.from({ length: slidesToShow }, (_, index) => (
            <Box
              key={index}
              overflow="hidden"
              borderRadius="xl"
              borderWidth="1px"
              borderColor="whiteAlpha.300"
            >
              <Skeleton height="14rem" />
              <Box p={4}>
                <Skeleton height="1.5rem" mb={3} />
                <Skeleton height="1rem" mb={2} />
                <Skeleton height="1rem" width="70%" />
              </Box>
            </Box>
          ))}
        </Box>
        <Skeleton
          height="3rem"
          width="10rem"
          mx="auto"
          mt={8}
          borderRadius="md"
        />
      </Box>
    );
  }

  if (!dishes.length) return null;

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      spaceY="8"
      w="100%"
    >
      <Box
        w="full"
        maxW="80rem"
        mx="auto"
        px={{ base: 4, md: 0 }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured dishes carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget as Node | null)
          ) {
            setHasFocus(false);
          }
        }}
      >
        <Flex align="center" gap={4}>
          {dishes.length > slidesToShow && (
            <IconButton
              aria-label="Previous dishes"
              onClick={prevSlide}
              display={{ base: "none", md: "flex" }}
              flexShrink={0}
              borderRadius="md"
              variant="outline"
            >
              <LuChevronLeft />
            </IconButton>
          )}

          <Box flex="1" minW={0} overflow="hidden">
            <motion.div
              key={currentIndex}
              initial={prefersReducedMotion ? false : { x: 36 }}
              animate={{ x: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.65,
                ease: "easeOut",
              }}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${slidesToShow}, minmax(0, 1fr))`,
                gap: slidesToShow === 1 ? "1rem" : "1.5rem",
                width: "100%",
              }}
              aria-live="off"
            >
              {visibleDishes.map((dish) => (
                <Dish key={dish._id} dish={dish} getLocale={getText} />
              ))}
            </motion.div>
          </Box>

          {dishes.length > slidesToShow && (
            <IconButton
              aria-label="Next dishes"
              onClick={nextSlide}
              display={{ base: "none", md: "flex" }}
              flexShrink={0}
              borderRadius="md"
              variant="outline"
            >
              <LuChevronRight />
            </IconButton>
          )}
        </Flex>

        {dishes.length > slidesToShow && (
          <Flex
            display={{ base: "flex", md: "none" }}
            justify="center"
            align="center"
            gap={5}
            mt={4}
          >
            <IconButton
              aria-label="Previous dish"
              onClick={prevSlide}
              borderRadius="md"
              variant="outline"
            >
              <LuChevronLeft />
            </IconButton>
            <Text aria-live="polite" fontSize="sm" opacity={0.75}>
              {currentIndex + 1} / {dishes.length}
            </Text>
            <IconButton
              aria-label="Next dish"
              onClick={nextSlide}
              borderRadius="md"
              variant="outline"
            >
              <LuChevronRight />
            </IconButton>
          </Flex>
        )}
      </Box>
      <ActionButton
        aria-label={t("homepage.viewAllDishes")}
        size="lg"
        fontWeight="bold"
        px={6}
        onClick={() => router.push("/menu")}
      >
        {t("homepage.viewAllDishes")}
        <LuArrowRight aria-hidden="true" />
      </ActionButton>
    </Box>
  );
}
