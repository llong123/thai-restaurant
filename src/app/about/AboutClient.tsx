"use client";

import { Box, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react";
import Footer from "../footer";
import Navigation from "@/components/navigation";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useState } from "react";
import { ExtendedTextProps, ExtendedHeadingProps } from "@/lib/types";

// Extended Chakra components
const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;

// Type definitions
interface LocaleString {
  _type: "localeString";
  en?: string;
  fi?: string;
  sv?: string;
}

interface ParagraphGroup {
  _key: string;
  _type: "paragraphGroup";
  paragraphTitle: LocaleString;
  paragraphDescription: LocaleString[];
}

interface ValueGroup {
  _key: string;
  _type: "valueGroup";
  valueTitle: LocaleString;
  valueDescription: LocaleString[];
}

interface AboutClientProps {
  about: {
    title?: LocaleString;
    paragraphInBoxTitle?: LocaleString;
    paragraph?: ParagraphGroup[];
    paragraphInBox?: ValueGroup[];
    mainImage?: { asset: { url: string } };
  };
}

export default function AboutClient({ about }: AboutClientProps) {
  const bgColor = useColorModeValue("white", "gray.800");
  const maxWidth = "8xl";
  const [language, setLanguage] = useState("en");

  if (!about) return <p className="p-8">About content is not available.</p>;

  const getLocaleString = (field?: LocaleString) =>
    field?.[language] || field?.en || "";

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bg={bgColor}>
      <Navigation />

      <Box flex="1" w="100%">
        <Box maxWidth={maxWidth} mx="auto" p={8} w="100%">
          {/* Language Selector */}
          <Box mb={8}>
            <Text mb={2}>Select Language:</Text>
            <Box display="flex" gap={3}>
              {["en", "fi", "sv"].map((lang) => (
                <Box
                  key={lang}
                  cursor="pointer"
                  px={3}
                  py={1}
                  borderWidth={1}
                  borderRadius="md"
                  borderColor={language === lang ? "blue.400" : "gray.300"}
                  onClick={() => setLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Title */}
          <Box pb={12} textAlign="center">
            <ExtendedHeading size="2xl">
              {getLocaleString(about.title)}
            </ExtendedHeading>
          </Box>

          {/* Paragraphs */}
          {about.paragraph?.map((group) => (
            <Box key={group._key} pb={6}>
              <ExtendedHeading size="xl" pb={4}>
                {getLocaleString(group.paragraphTitle)}
              </ExtendedHeading>

              <ExtendedText pb={2}>
                {getLocaleString(group.paragraphDescription)}
              </ExtendedText>
            </Box>
          ))}

          {/* Values Section */}
          <Box pb={16}>
            <ExtendedHeading size="lg" pb={6}>
              {getLocaleString(about.paragraphInBoxTitle)}
            </ExtendedHeading>
            <SimpleGrid columns={[1, null, 3]} gap={8}>
              {about.paragraphInBox?.map((valueGroup) => (
                <Box
                  key={valueGroup._key}
                  p={6}
                  borderWidth="1px"
                  borderRadius="lg"
                >
                  <ExtendedHeading size="md" pb={4}>
                    {getLocaleString(valueGroup.valueTitle)}
                  </ExtendedHeading>
                  <ExtendedText>
                    {getLocaleString(valueGroup.valueDescription)}
                  </ExtendedText>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Main Image */}
          {about.mainImage?.asset?.url && (
            <Box pb={16} position="relative" height="400px">
              <Image
                src={about.mainImage.asset.url}
                alt={getLocaleString(about.title)}
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </Box>
          )}
        </Box>
      </Box>

      <Box mt="auto">
        <Footer />
      </Box>
    </Box>
  );
}
