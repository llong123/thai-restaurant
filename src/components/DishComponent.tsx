"use client";

import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { DishData, LocaleString } from "@/lib/interfaces";
import { useThemeColors } from "./fontVars";
import { clipText } from "@/lib/utility";
import { DishModal } from "./DishModal";
import { ImageWithSkeleton } from "./ImageWithSkeleton";
import { BRAND_ORANGE } from "@/lib/colors";

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
  const chiliCount = Math.min(Math.max(dish.spiceLevel ?? 0, 0), 3);

  const openDetails = () => setIsModalOpen(true);

  return (
    <>
      <MotionBox
        as="article"
        role="button"
        tabIndex={0}
        aria-label={`${dishName}${chiliCount ? `, spice level ${chiliCount}` : ""}${dishPrice ? `, ${dishPrice}` : ""}. View details`}
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
        _hover={{ shadow: "xl", borderColor: BRAND_ORANGE }}
        _focusVisible={{ outline: "3px solid", outlineColor: BRAND_ORANGE, outlineOffset: "2px" }}
      >
        {dishImageUrl ? (
          <ImageWithSkeleton
            src={dishImageUrl}
            alt={dishName}
            containerProps={{ height: { base: "13rem", md: "14rem" } }}
            imageProps={{ objectFit: "cover", loading: "lazy", decoding: "async" }}
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
            <Box display="flex" alignItems="flex-start" gap={2} minW={0}>
              <Text as="h3" fontSize="lg" fontWeight="bold" lineHeight="short" color={textColor}>
                {dishName}
              </Text>
              {chiliCount > 0 && (
                <Text
                  as="span"
                  role="img"
                  aria-label={`Spice level ${chiliCount} out of 3`}
                  fontSize="sm"
                  lineHeight="short"
                  whiteSpace="nowrap"
                >
                  {"🌶️".repeat(chiliCount)}
                </Text>
              )}
            </Box>
            {dishPrice && (
              <Text fontWeight="bold" whiteSpace="nowrap" color={BRAND_ORANGE}>
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
