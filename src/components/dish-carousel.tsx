"use client";

import { Box, Button, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState, useEffect } from "react";
import { Dish } from "./dish";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { Language } from "@/lib/types";
import { useLanguage } from "@/hooks/LanguageContext";

const DISHES_QUERY = `*[_type == "dish"]{
  _id,
  name,
  description,
  ingredients,
  category,
  price,
  spiceLevel,
  dishImage { asset->{url} }
}`;

interface LocaleString {
  _type: "localeString";
  en?: string;
  fi?: string;
  sv?: string;
}

interface DishImage {
  asset?: {
    url: string;
  };
}

interface DishData {
  _id: string;
  name: LocaleString;
  description?: LocaleString;
  price?: number;
  signatureDish?: boolean;
  dishImage?: DishImage;
}

// ---------- 🔹 Component ---------- //

export default function DishCarousel() {
  const { language } = useLanguage();
  const [dishes, setDishes] = useState<DishData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 1;
  const router = useRouter();

  // Fetch signature dishes from Sanity
  useEffect(() => {
    async function fetchDishes() {
      const data: DishData[] = await client.fetch(
        DISHES_QUERY,
        {},
        { next: { revalidate: 30 } },
      );
      setDishes(data);
    }
    fetchDishes();
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

  if (!dishes.length) return <p>Loading signature dishes...</p>;

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      spaceY="8"
    >
      <Box position="relative" width="100%" maxW="1200px" mx="auto">
        <Box
          display="grid"
          gridTemplateColumns={`repeat(${slidesToShow}, 1fr)`}
          gap={8}
          width="100%"
        >
          {visibleDishes.map((dish) => (
            <Dish
              key={dish._id}
              name={getLocaleString(dish.name)}
              description={getLocaleString(dish.description)}
              image={
                dish.dishImage?.asset?.url ||
                `https://placehold.co/600x400/111827/FFFFFF?text=${encodeURIComponent(
                  getLocaleString(dish.name),
                )}`
              }
              price={dish.price ? `€${dish.price.toFixed(2)}` : "N/A"}
            />
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
        View All Dishes
      </Button>
    </Box>
  );
}
