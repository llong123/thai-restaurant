'use client';

import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import { Dish } from "./dish";

interface DishCarouselProps {
  dishes: string[];
}

export default function DishCarousel({ dishes }: DishCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 1;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + slidesToShow >= dishes.length ? 0 : prevIndex + slidesToShow
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - slidesToShow < 0 ? Math.max(0, dishes.length - slidesToShow) : prevIndex - slidesToShow
    );
  };

  const visibleDishes = dishes.slice(currentIndex, currentIndex + slidesToShow);

  return (
    <Box position="relative" width="100%" maxW="1200px" mx="auto">
      <Box
        display="grid"
        gridTemplateColumns={`repeat(${slidesToShow}, 1fr)`}
        gap={8}
        width="100%"
      >
        {visibleDishes.map((dish, index) => (
          <Dish
            key={index}
            name={dish}
            description="A delicious Thai dish"
            image={`https://placehold.co/600x400/111827/FFFFFF?text=${encodeURIComponent(dish)}`}
            price="€15.99"
          />
        ))}
      </Box>

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
  );
} 