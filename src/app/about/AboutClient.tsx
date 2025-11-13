"use client";

import { Box, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react";
import Footer from "../footer";
import NavigationComponent from "@/components/NavigationComponent";
import { ExtendedTextProps, ExtendedHeadingProps } from "@/lib/types";
import { LocaleString } from "@/lib/interfaces";
import { useLanguage } from "@/hooks/LanguageContext";
import { MAX_WIDTH } from "@/lib/enums";
import { AboutData } from "@/lib/interfaces/aboutData";
import { useThemeColors } from "@/components/fontVars";
import { useTranslation } from "@/lib/translations";
import FullPageLoader from "@/components/FullPageLoader";

// Extended Chakra components
const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;

interface AboutClientProps {
  about: AboutData;
  loading: boolean;
}

export default function AboutClient({ about, loading }: AboutClientProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const { bgColor, borderColor } = useThemeColors();

  if (loading) return <FullPageLoader message={t("loading")} />;
  if (!about) return <p className="p-8">About content is not available.</p>;

  const getLocaleString = (field?: LocaleString) =>
    field?.[language] || field?.en || "";

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bg={bgColor}>
      <Box px={[8, 16]} w="100%">
        <Box maxWidth={MAX_WIDTH.XL} mx="auto" px={0} w="100%">
          <NavigationComponent />
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
            <ExtendedHeading as="h2">
              {getLocaleString(about.title)}
            </ExtendedHeading>
          </Box>

          {/* Paragraphs */}
          {about.paragraph?.map((group) => (
            <Box key={group._key} pb={6}>
              <ExtendedHeading as="h4" size="2xl" pb={4}>
                {getLocaleString(group.paragraphTitle)}
              </ExtendedHeading>

              <ExtendedText pb={2}>
                {getLocaleString(group.paragraphDescription)}
              </ExtendedText>
            </Box>
          ))}

          {/* Values Section */}
          <Box pb={16}>
            <ExtendedHeading as="h4" size="lg" pb={6}>
              {getLocaleString(about.paragraphInBoxTitle)}
            </ExtendedHeading>
            <SimpleGrid columns={[1, null, 3]} gap={8}>
              {about.paragraphInBox?.map((valueGroup) => (
                <Box
                  key={valueGroup._key}
                  p={6}
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor={borderColor}
                >
                  <ExtendedHeading as="h6" size="md" pb={4}>
                    {getLocaleString(valueGroup.valueTitle)}
                  </ExtendedHeading>
                  <ExtendedText fontSize={{ base: 12, lg: 14 }}>
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
