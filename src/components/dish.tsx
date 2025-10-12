"use client";

import { Box, Image, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface DishProps {
  name: string;
  description: string;
  image: string;
  price: string;
}

export function Dish({ name, description, image, price }: DishProps) {
  const { open, onOpen, onClose } = useDisclosure();
  const [dishDetails, setDishDetails] = useState({
    name: name,
    description: description,
    ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
    spicyLevel: "Medium",
    price: price,
  });

  const handleClick = () => {
    setDishDetails({
      name: name,
      description: description,
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      spicyLevel: "Medium",
      price: price,
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
        <Image src={image} alt={name} w="100%" h="300px" objectFit="cover" />
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
            {name}
          </Box>
          <Box fontSize="md" mb={2} color="white">
            {description}
          </Box>
          <Box fontSize="xl" fontWeight="bold" color="white">
            {price}
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
            <Box position="relative" w="100%" h="200px" pb={4}>
              <Image
                src={image}
                alt={name}
                w="100%"
                h="100%"
                objectFit="cover"
                borderRadius="md"
              />
            </Box>
            <Box as="h3" fontSize="2xl" fontWeight="bold" mb={2} color="black">
              {dishDetails.name}
            </Box>
            <Box fontSize="md" mb={4} color="black">
              {dishDetails.description}
            </Box>
            <Box fontWeight="bold" mb={2} color="black">
              Ingredients:
            </Box>
            <Box mb={4}>
              {dishDetails.ingredients.map((ingredient, index) => (
                <Box key={index} color="black">
                  • {ingredient}
                </Box>
              ))}
            </Box>
            <Box fontWeight="bold" mb={2} color="black">
              Spicy Level: {dishDetails.spicyLevel}
            </Box>
            <Box fontWeight="bold" color="black">
              Price: {dishDetails.price}
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
