"use client";

import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import Footer from "../footer";
import { ExtendedHeadingProps } from "@/lib/types";
import { useLanguage } from "@/hooks/LanguageContext";
import { AboutData } from "@/lib/interfaces/aboutData";
import { useThemeColors } from "@/components/fontVars";
import { useTranslation } from "@/lib/translations";
import FullPageLoader from "@/components/FullPageLoader";
import { getLocaleString, type LocaleString } from "@/lib/utility";
import { PageLayout } from "@/components/PageLayout";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { RichText } from "@/components/RichText";
import { PageContainer } from "@/components/PageContainer";

// Extended Chakra components
const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;

interface AboutClientProps {
  about: AboutData;
  loading: boolean;
}

export default function AboutClient({ about, loading }: AboutClientProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const { borderColor } = useThemeColors();

  if (loading) return <FullPageLoader message={t("loading")} />;
  if (!about) return <p className="p-8">About content is not available.</p>;

  const getText = (field?: LocaleString) => getLocaleString(field, language);

  return (
    <PageLayout>
      <PageContainer contentWidth="full" gutter={0}>
        {/* Main Image */}
        {about.mainImage?.asset?.url && (
          <Box pb={16} position="relative" height="25rem">
            <ImageWithSkeleton
              src={about.mainImage.asset.url}
              alt={getText(about.title)}
              containerProps={{ width: "100%", height: "100%" }}
              imageProps={{ objectFit: "cover", loading: "lazy" }}
            />
          </Box>
        )}

        {/* Title */}
        <Box pb={12} textAlign="center">
          <ExtendedHeading as="h2">
            {getText(about.title)}
          </ExtendedHeading>
        </Box>

        {/* Paragraphs */}
        {about.paragraph?.map((group) => (
          <Box key={group._key} pb={6}>
            <ExtendedHeading as="h4" size="2xl" pb={4}>
              {getText(group.paragraphTitle)}
            </ExtendedHeading>

            <RichText text={getText(group.paragraphDescription)} pb={2} />
          </Box>
        ))}

        {/* Values Section */}
        <Box pb={16}>
          <ExtendedHeading as="h4" size="lg" pb={6}>
            {getText(about.paragraphInBoxTitle)}
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
                  {getText(valueGroup.valueTitle)}
                </ExtendedHeading>
                <RichText
                  text={getText(valueGroup.valueDescription)}
                  fontSize={{ base: 12, lg: 14 }}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </PageContainer>

      <Box mt="auto">
        <Footer />
      </Box>
    </PageLayout>
  );
}
