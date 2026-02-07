"use client";

import { Box, Image as ChakraImage } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/sanityImage";
import { DishData, LocaleString } from "@/lib/interfaces";
import { useThemeColors } from "./fontVars";
import { clipText } from "@/lib/utility";
import { DishModal } from "./DishModal";
import {
  cardVariants,
  overlayVariants,
  transitionConfig,
} from "@/lib/animationVariants";

const MotionBox = motion.create(Box);

interface DishProps {
  dish: DishData;
  getLocale: (_localeString?: LocaleString) => string;
}

export function Dish({ dish, getLocale }: DishProps) {
  const { textColor } = useThemeColors();

  const [dishDetails, setDishDetails] = useState({
    name: dish.name,
    description: getLocale(dish.description),
    ingredients: dish.ingredients || [],
    spiceLevel: dish.spiceLevel,
    price: dish.price ? `${dish.price.toFixed(2)} EUR` : "N/A",
    image: dish.dishImage
      ? urlFor(dish.dishImage).width(500).height(300).url()
      : "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setDishDetails({
      name: dish.name,
      description: getLocale(dish.description),
      ingredients: dish.ingredients || [],
      spiceLevel: dish.spiceLevel,
      price: dish.price ? `${dish.price.toFixed(2)} EUR` : "N/A",
      image: dish.dishImage
        ? urlFor(dish.dishImage).width(500).height(300).url()
        : "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <MotionBox
        position="relative"
        overflow="hidden"
        borderRadius="lg"
        cursor="pointer"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
        transition={transitionConfig}
        onClick={handleClick}
      >
        {dishDetails.image && (
          <ChakraImage
            src={dishDetails.image}
            alt={dishDetails.name}
            w="100%"
            h="18.75rem"
            objectFit="cover"
          />
        )}
        <MotionBox
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bg="rgba(0, 0, 0, 0.7)"
          p={4}
          variants={overlayVariants}
          transition={transitionConfig}
        >
          <Box
            as="h3"
            fontSize="xl"
            fontWeight="bold"
            mb={2}
            color={textColor}
          >
            {dishDetails.name}
          </Box>
          <Box fontSize="sm" mb={2} color={textColor}>
            {clipText(dishDetails.description)}
          </Box>
          <Box fontSize="xl" fontWeight="bold" color={textColor}>
            {dishDetails.price}
          </Box>
        </MotionBox>
      </MotionBox>

      <DishModal
        isOpen={isModalOpen}
        onClose={closeModal}
        dishName={dishDetails.name}
        dishDescription={dishDetails.description}
        dishImage={dishDetails.image}
        ingredients={dishDetails.ingredients}
        spiceLevel={dishDetails.spiceLevel}
        price={dishDetails.price}
        getLocale={getLocale}
      />
    </>
  );
}
