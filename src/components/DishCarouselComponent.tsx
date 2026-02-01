"use client";

import { Box, Button, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState, useEffect } from "react";
import { Dish } from "./DishComponent";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/LanguageContext";
import { DishData, LocaleString } from "@/lib/interfaces";
import { useTranslation } from "@/lib/translations";
import FullPageLoader from "./FullPageLoader";

// ---------- 🔹 Component ---------- //

export default function DishCarousel() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [dishes, setDishes] = useState<DishData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 1;
  const router = useRouter();

  // Fetch signature dishes from Sanity
  useEffect(() => {
    let mounted = true;
    async function fetchDishes() {
      try {
        const res = await fetch("/api/dish");
        if (!mounted) return;
        const data: DishData[] = await res.json();
        if (mounted) setDishes(data);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      }
    }
    fetchDishes();
    return () => {
      mounted = false;
    };
  }, []);

  // Utility for localized text
  const getLocaleString = (field?: LocaleString) =>
    field?.[language] || field?.en || "";

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesToShow >= dishes.length ? 0 : prevIndex + slidesToShow,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - slidesToShow < 0
        ? Math.max(0, dishes.length - slidesToShow)
        : prevIndex - slidesToShow,
    );
  };

  const visibleDishes = dishes.slice(currentIndex, currentIndex + slidesToShow);

  if (!dishes.length)
    return <FullPageLoader message={"Loading signature dishes..."} />;

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      spaceY="8"
      w="100%"
    >
      <Box position="relative" width="90%" maxW="1200px" mx="auto">
        <Box
          display="grid"
          gridTemplateColumns={`repeat(${slidesToShow}, 1fr)`}
          gap={8}
          width="100%"
        >
          {visibleDishes.map((dish) => (
            <Dish key={dish._id} dish={dish} getLocale={getLocaleString} />
          ))}
        </Box>

        {/* Previous Button */}
        <IconButton
          aria-label="Previous slide"
          position="absolute"
          left="-4"
          top="50%"
          transform="translateY(-50%)"
          onClick={prevSlide}
          display={dishes.length > slidesToShow ? "flex" : "none"}
        >
          <LuChevronLeft />
        </IconButton>

        {/* Next Button */}
        <IconButton
          aria-label="Next slide"
          position="absolute"
          right="-4"
          top="50%"
          transform="translateY(-50%)"
          onClick={nextSlide}
          display={dishes.length > slidesToShow ? "flex" : "none"}
        >
          <LuChevronRight />
        </IconButton>
      </Box>
      <Button
        aria-label="View all dishes"
        colorScheme="primary"
        size="lg"
        onClick={() => router.push("/menu")}
      >
        {t("homepage.viewAllDishes")}{" "}
      </Button>
    </Box>
  );
}
