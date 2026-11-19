"use client";

import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Footer from "../footer";
import type { ExtendedHeadingProps } from "@/lib/types";
import { useLanguage } from "@/hooks/LanguageContext";
import type { AboutData } from "@/lib/interfaces/aboutData";
import { useTranslation } from "@/lib/translations";
import FullPageLoader from "@/components/FullPageLoader";
import { getLocaleString, type LocaleString } from "@/lib/utility";
import { PageLayout } from "@/components/PageLayout";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { RichText } from "@/components/RichText";
import { PageContainer } from "@/components/PageContainer";
import { BRAND_ORANGE } from "@/lib/colors";

const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;

interface AboutClientProps {
  about: AboutData;
  loading: boolean;
}

export default function AboutClient({ about, loading }: AboutClientProps) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const getText = (field?: LocaleString) => getLocaleString(field, language);

  if (loading) return <FullPageLoader message={t("loading")} />;
  if (!about) return <p className="p-8">About content is not available.</p>;

  return (
    <PageLayout>
      <PageContainer contentWidth="full" gutter={0} display="flex" flexDirection="column" flex="1">
        {about.mainImage?.asset?.url && (
          <Box pb={{ base: 8, md: 12 }} position="relative" height={{ base: "16rem", md: "24rem" }}>
            <ImageWithSkeleton
              src={about.mainImage.asset.url}
              alt={getText(about.title)}
              containerProps={{ width: "100%", height: "100%", borderRadius: "2xl" }}
              imageProps={{ objectFit: "cover", loading: "lazy" }}
            />
          </Box>
        )}

        {about.paragraph?.map((group) => (
          <Flex
            key={group._key}
            direction={{ base: "column", lg: "row" }}
            align="flex-start"
            gap={{ base: 4, lg: 12 }}
            maxW="68rem"
            mx="auto"
            w="full"
            py={{ base: 8, md: 12 }}
          >
            <Box flex={{ base: "none", lg: "0 0 18rem" }}>
              <ExtendedHeading as="h1" size="3xl">
                {getText(group.paragraphTitle)}
              </ExtendedHeading>
            </Box>
            <RichText
              text={getText(group.paragraphDescription)}
              flex="1"
              maxW="48rem"
              fontSize="md"
              lineHeight="tall"
            />
          </Flex>
        ))}

        {about.paragraphInBox?.length ? (
          <Box pb={{ base: 10, md: 16 }}>
            <Flex align="center" gap={4} mb={6}>
              <ExtendedHeading as="h2" size="xl">
                {getText(about.paragraphInBoxTitle)}
              </ExtendedHeading>
              <Box flex="1" h="1px" bg="whiteAlpha.300" />
            </Flex>
            <SimpleGrid columns={[1, null, 3]} gap={{ base: 4, md: 6 }}>
              {about.paragraphInBox.map((valueGroup, index) => (
                <Box
                  key={valueGroup._key}
                  p={{ base: 5, md: 6 }}
                  borderWidth="1px"
                  borderTopWidth="3px"
                  borderColor="whiteAlpha.300"
                  borderTopColor={BRAND_ORANGE}
                  borderRadius="lg"
                  bg="whiteAlpha.50"
                  minH="100%"
                >
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="0.1em"
                    color={BRAND_ORANGE}
                    mb={3}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <ExtendedHeading as="h3" size="lg" pb={3}>
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
        ) : null}
      </PageContainer>

      <Box mt="auto">
        <Footer />
      </Box>
    </PageLayout>
  );
}
