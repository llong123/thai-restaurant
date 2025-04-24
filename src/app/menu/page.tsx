'use client';

import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Flex,
  HStack,
  Badge,
  CloseButton,
} from "@chakra-ui/react";
import Navigation from "@/components/navigation";
import { useTranslation } from "@/lib/translations";
import { pacifico } from "@/components/fontVars";
import { ExtendedHeadingProps, ExtendedTextProps, ExtendedFlexProps } from "@/lib/types";
import { Dish } from "@/components/dish";
import dishes from "@/data/thai-dishes.json";
import { useColorModeValue as useChakraColorModeValue } from "@/components/ui/color-mode";
import { useState, useMemo } from "react";

const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;
const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedFlex = Flex as React.ComponentType<ExtendedFlexProps>;

export default function MenuPage() {
  const { t } = useTranslation();
  const bgColor = useChakraColorModeValue("white", "gray.800");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Extract unique categories from dishes
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    dishes.dishes.forEach(dish => {
      if (dish.category) {
        uniqueCategories.add(dish.category);
      }
    });
    return Array.from(uniqueCategories);
  }, []);
  
  // Filter dishes based on selected categories
  const filteredDishes = useMemo(() => {
    if (selectedCategories.length === 0) {
      return dishes.dishes;
    }
    return dishes.dishes.filter(dish => 
      selectedCategories.includes(dish.category)
    );
  }, [selectedCategories]);
  
  // Handle category selection/deselection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <Box bg={bgColor} minH="100vh">
      <Navigation />
      <Container maxW="8xl" py={16}>
        <ExtendedHeading
          size={{ base: "2xl", lg: "4xl" }}
          className={pacifico.className}
          w="full"
          pb={8}
        >
          {t("sections.menu.title")}
        </ExtendedHeading>
        <ExtendedText w="full" pb={6}>
          {t("sections.menu.description")}
        </ExtendedText>
        
        {/* Filter Chips */}
        <Box mb={8}>
          <Box as="h3" fontSize="lg" fontWeight="bold" mb={3}>
            Filter by Category:
          </Box>
          <HStack gap={3} flexWrap="wrap">
            {categories.map((category) => (
              <Badge
                key={category}
                px={selectedCategories.includes(category) ? 2 : 3}
                py={1}
                borderRadius="full"
                colorScheme="gray"
                bg={selectedCategories.includes(category) ? "gray.200" : "transparent"}
                color={selectedCategories.includes(category) ? "gray.700" : "gray.500"}
                border="1px solid"
                borderColor={selectedCategories.includes(category) ? "gray.300" : "gray.300"}
                cursor="pointer"
                onClick={() => toggleCategory(category)}
                display="flex"
                alignItems="center"
                fontSize="sm"
              >
                {category}
                {selectedCategories.includes(category) && (
                  <CloseButton 
                    ml={1} 
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      toggleCategory(category);
                    }} 
                    aria-label="Remove filter"
                    fontSize="xs"
                    borderRadius="full"
                    p={0.5}
                    minW="16px"
                    h="16px"
                    bg="transparent"
                  />
                )}
              </Badge>
            ))}
            {selectedCategories.length > 0 && (
              <Badge
                px={3}
                py={1}
                borderRadius="full"
                colorScheme="gray"
                bg="transparent"
                color="gray.500"
                border="1px solid"
                borderColor="gray.300"
                cursor="pointer"
                onClick={clearFilters}
                fontSize="sm"
              >
                Clear All
              </Badge>
            )}
          </HStack>
        </Box>
        
        <ExtendedFlex justify="center" w="full">
          <SimpleGrid columns={[1, 2, 3]} gap={8} maxW="1200px" w="full">
            {filteredDishes.map((dish) => (
                
              <Dish 
                key={dish.id} 
                name={dish.name}
                description={dish.description}
                image={`https://placehold.co/600x400/111827/FFFFFF?text=${encodeURIComponent(dish.name)}`}
                price={`€${dish.price}`}
              />
            ))}
          </SimpleGrid>
        </ExtendedFlex>
      </Container>
    </Box>
  );
}