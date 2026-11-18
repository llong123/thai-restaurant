"use client";

import { Box, Image as ChakraImage, Text } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { DishData, LocaleString } from "@/lib/interfaces";
import { useThemeColors } from "./fontVars";
import { clipText } from "@/lib/utility";
import { DishModal } from "./DishModal";

const MotionBox = motion.create(Box);

interface DishProps {
  dish: DishData;
  getLocale: (_localeString?: LocaleString) => string;
}

export function Dish({ dish, getLocale }: DishProps) {
  const { bgColor, borderColor, textColor } = useThemeColors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dishImageUrl = dish.dishImage?.asset?.url || "";
  const dishName = getLocale(dish.name);
  const dishDescription = getLocale(dish.description);
  const ingredients = dish.ingredients || [];
  const dishPrice = dish.price != null ? `${dish.price.toFixed(2)} €` : "";

  const openDetails = () => setIsModalOpen(true);

  return (
    <>
      <MotionBox
        as="article"
        role="button"
        tabIndex={0}
        aria-label={`${dishName}${dishPrice ? `, ${dishPrice}` : ""}. View details`}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="xl"
        bg={bgColor}
        cursor="pointer"
        onClick={openDetails}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openDetails();
          }
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.18 }}
        _hover={{ shadow: "xl", borderColor: "orange.400" }}
        _focusVisible={{ outline: "3px solid", outlineColor: "orange.400", outlineOffset: "2px" }}
      >
        {dishImageUrl ? (
          <ChakraImage
            src={dishImageUrl}
            alt={dishName}
            width="100%"
            height={{ base: "13rem", md: "14rem" }}
            objectFit="cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <Box
            height={{ base: "13rem", md: "14rem" }}
            display="grid"
            placeItems="center"
            bg="blackAlpha.100"
            color={textColor}
          >
            <Text fontSize="4xl" aria-hidden="true">🍽️</Text>
          </Box>
        )}

        <Box p={4} flex="1">
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={3}>
            <Text as="h3" fontSize="lg" fontWeight="bold" lineHeight="short" color={textColor}>
              {dishName}
            </Text>
            {dishPrice && (
              <Text fontWeight="bold" whiteSpace="nowrap" color="orange.500">
                {dishPrice}
              </Text>
            )}
          </Box>
          {dishDescription && (
            <Text mt={2} fontSize="sm" lineHeight="tall" color={textColor}>
              {clipText(dishDescription, 120)}
            </Text>
          )}
        </Box>
      </MotionBox>

      <DishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dishName={dishName}
        dishDescription={dishDescription}
        dishImage={dishImageUrl}
        ingredients={ingredients}
        spiceLevel={dish.spiceLevel}
        price={dishPrice || "N/A"}
        getLocale={getLocale}
      />
    </>
  );
}
