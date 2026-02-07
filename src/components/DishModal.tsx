"use client";

import { Box, Image as ChakraImage } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { MAX_WIDTH } from "@/lib/enums";
import { merriweather, useThemeColors } from "./fontVars";
import { LocaleString } from "@/lib/interfaces";
import { useTranslation } from "@/lib/translations";
import { useLanguage } from "@/hooks/LanguageContext";
import {
  modalVariants,
  modalContentVariants,
  transitionConfig,
} from "@/lib/animationVariants";

const MotionBox = motion.create(Box);

interface DishModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishName: string;
  dishDescription: string;
  dishImage: string;
  ingredients: LocaleString[];
  spiceLevel?: number;
  price: string;
  getLocale: (localeString?: LocaleString) => string;
}

export function DishModal({
  isOpen,
  onClose,
  dishName,
  dishDescription,
  dishImage,
  ingredients,
  spiceLevel,
  price,
  getLocale,
}: DishModalProps) {
  const { textColor, bgColor } = useThemeColors();
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  if (!isOpen) return null;

  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.7)"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={transitionConfig}
    >
      <MotionBox
        bg="white"
        p={6}
        borderRadius="xl"
        maxWidth={MAX_WIDTH.XS}
        w="90%"
        maxH="90vh"
        overflowY="auto"
        onClick={(e) => e.stopPropagation()}
        variants={modalContentVariants}
        transition={transitionConfig}
        bgColor={bgColor}
      >
        {dishImage && (
          <Box position="relative" w="100%" h="12.5rem" pb={4}>
            <ChakraImage
              src={dishImage}
              alt={dishName}
              w="100%"
              h="100%"
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
        )}

        <Box as="h3" fontSize="2xl" fontWeight="bold" mb={2} color={textColor}>
          {dishName}
        </Box>
        <Box className={merriweather.className} fontSize="md" mb={4} color={textColor}>
          {dishDescription}
        </Box>

        {ingredients.length > 0 && (
          <>
            <Box className={merriweather.className} fontWeight="bold" mb={2} color={textColor}>
              {t("menu.ingredients")}:
            </Box>
            <Box mb={4}>
              {ingredients.map((ingredient, index) => (
                <Box className={merriweather.className} key={index} color={textColor}>
                  • {getLocale(ingredient)}
                </Box>
              ))}
            </Box>
          </>
        )}

        <Box className={merriweather.className} fontWeight="bold" mb={2} color={textColor}>
          {t("menu.spiceLevel")}:{" "}
          {spiceLevel ? "🌶️".repeat(spiceLevel) : "N/A"}
        </Box>
        <Box className={merriweather.className} fontWeight="bold" color={textColor}>
          {price}
        </Box>

        <Box
          position="absolute"
          top={4}
          right={4}
          cursor="pointer"
          onClick={onClose}
          p={2}
          borderRadius="full"
          _hover={{ bg: "rgba(0, 0, 0, 0.2)" }}
          transition="all 0.2s ease"
        >
          <FaTimes color="white" />
        </Box>
      </MotionBox>
    </MotionBox>
  );
}
