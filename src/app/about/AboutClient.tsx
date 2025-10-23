"use client";

import { Box, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react";
import Footer from "../footer";
import NavigationComponent from "@/components/NavigationComponent";
import { useColorModeValue } from "@/components/ui/color-mode";
import { ExtendedTextProps, ExtendedHeadingProps } from "@/lib/types";
import { LocaleString } from "@/lib/interfaces";
import { useLanguage } from "@/hooks/LanguageContext";

// Extended Chakra components
const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;

interface ParagraphGroup {
  _key: string;
  _type: "paragraphGroup";
  paragraphTitle: LocaleString;
  paragraphDescription: LocaleString;
}

interface ValueGroup {
  _key: string;
  _type: "valueGroup";
  valueTitle: LocaleString;
  valueDescription: LocaleString;
}

interface AboutClientProps {
  about: {
    heroimage?: { asset: { url: string } };
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
  const { language } = useLanguage();

  if (!about) return <p className="p-8">About content is not available.</p>;

  const getLocaleString = (field?: LocaleString) =>
    field?.[language] || field?.en || "";

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bg={bgColor}>
      <NavigationComponent />

      <Box flex="1" w="100%">
        <Box maxWidth={maxWidth} mx="auto" p={8} w="100%">
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
        </Box>
      </Box>

      <Box mt="auto">
        <Footer />
      </Box>
    </Box>
  );
}
