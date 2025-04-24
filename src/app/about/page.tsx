'use client';

import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  VStack,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "@/lib/translations";
import { pacifico } from "@/components/fontVars";
import Footer from "../footer";
import content from "@/data/content.json";
import { ExtendedTextProps, ExtendedHeadingProps, ExtendedButtonProps, ExtendedFlexProps } from "@/lib/types";
import Navigation from "@/components/navigation";
import { useColorModeValue } from "@/components/ui/color-mode";

// Create extended components with proper types
const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;
const ExtendedButton = Button as React.ComponentType<ExtendedButtonProps>;
const ExtendedFlex = Flex as React.ComponentType<ExtendedFlexProps>;

export default function AboutPage() {
  const { t } = useTranslation();
  const maxWidth = "8xl";
  const { about } = content;
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      minHeight="100vh"
      bg={bgColor}
    >
      <Navigation />

      {/* Main Content */}
      <Box flex="1" w="100%">
        <Box maxWidth={maxWidth} mx="auto" p={8} w="100%">
          {/* Title Section */}
          <Box pb={12} textAlign="center">
            <ExtendedHeading size="2xl">
              {about.title}
            </ExtendedHeading>
          </Box>

          {/* Main Image and Story */}
          <Box pb={16}>
            <Box pb={8} position="relative" height="400px">
              <Image
                src={about.mainImage}
                alt="Restaurant interior"
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </Box>
            <Box>
              <ExtendedHeading size="xl" pb={6}>
                {about.story.heading}
              </ExtendedHeading>
              {about.story.content.map((paragraph, index) => (
                <ExtendedText key={index} pb={4}>
                  {paragraph}
                </ExtendedText>
              ))}
            </Box>
          </Box>

          {/* Mission */}
          <Box pb={16}>
            <ExtendedHeading size="lg" pb={4}>
              {about.mission.heading}
            </ExtendedHeading>
            <ExtendedText>
              {about.mission.content}
            </ExtendedText>
          </Box>

          {/* Values */}
          <Box pb={16}>
            <ExtendedHeading size="lg" pb={6}>
              {about.values.heading}
            </ExtendedHeading>
            <SimpleGrid columns={[1, null, 3]} gap={8}>
              {about.values.items.map((value, index) => (
                <Box key={index} p={6} borderWidth="1px" borderRadius="lg">
                  <ExtendedHeading size="md" pb={4}>
                    {value.title}
                  </ExtendedHeading>
                  <ExtendedText>
                    {value.description}
                  </ExtendedText>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box mt="auto">
        <Footer />
      </Box>
    </Box>
  );
} 