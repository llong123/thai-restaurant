"use client";

import { Box, Image as ChakraImage, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/sanityImage"; // Sanity image helper
import { DishData, LocaleString } from "@/lib/interfaces";
import { useTranslation } from "@/lib/translations";
import { useLanguage } from "@/hooks/LanguageContext";

const MotionBox = motion.create(Box);

interface DishProps {
  dish: DishData;
  getLocale: (field?: LocaleString) => string;
}

export function Dish({ dish, getLocale }: DishProps) {
  const { open, onOpen, onClose } = useDisclosure();
  const { language } = useLanguage();
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

  const { t } = useTranslation(language);

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
    onOpen();
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05 },
  };

  const overlayVariants = {
    hidden: { y: "100%" },
    visible: { y: "100%" },
    hover: { y: 0 },
  };

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
        transition={{ duration: 0.3 }}
        onClick={handleClick}
      >
        {dishDetails.image && (
          <ChakraImage
            src={dishDetails.image}
            alt={dishDetails.name}
            w="100%"
            h="300px"
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
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Box as="h3" fontSize="xl" fontWeight="bold" mb={2} color="white">
            {dishDetails.name}
          </Box>
          <Box fontSize="md" mb={2} color="white">
            {dishDetails.description}
          </Box>
          <Box fontSize="xl" fontWeight="bold" color="white">
            {dishDetails.price}
          </Box>
        </MotionBox>
      </MotionBox>

      {open && (
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MotionBox
            bg="white"
            p={6}
            borderRadius="xl"
            maxW="500px"
            w="90%"
            maxH="90vh"
            overflowY="auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {dishDetails.image && (
              <Box position="relative" w="100%" h="200px" pb={4}>
                <ChakraImage
                  src={dishDetails.image}
                  alt={dishDetails.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  borderRadius="md"
                />
              </Box>
            )}

            <Box as="h3" fontSize="2xl" fontWeight="bold" mb={2} color="black">
              {dishDetails.name}
            </Box>
            <Box fontSize="md" mb={4} color="black">
              {dishDetails.description}
            </Box>

            {dishDetails.ingredients.length > 0 && (
              <>
                <Box fontWeight="bold" mb={2} color="black">
                  {t("menu.ingredients")}:
                </Box>
                <Box mb={4}>
                  {dishDetails.ingredients.map((ingredient, index) => (
                    <Box key={index} color="black">
                      • {getLocale(ingredient as any)}
                    </Box>
                  ))}
                </Box>
              </>
            )}

            <Box fontWeight="bold" mb={2} color="black">
              {t("menu.spiceLevel")}: {"🌶️".repeat(dishDetails.spiceLevel!)}
            </Box>
            <Box fontWeight="bold" color="black">
              {dishDetails.price}
            </Box>

            <Box
              position="absolute"
              top={4}
              right={4}
              cursor="pointer"
              onClick={onClose}
              p={2}
              borderRadius="full"
              bg="rgba(0, 0, 0, 0.1)"
              _hover={{ bg: "rgba(0, 0, 0, 0.2)" }}
              transition="all 0.2s ease"
            >
              ✕
            </Box>
          </MotionBox>
        </MotionBox>
      )}
    </>
  );
}
