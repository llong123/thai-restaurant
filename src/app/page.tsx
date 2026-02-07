"use client";

import { Flex, AspectRatio, Box, Stack } from "@chakra-ui/react";
import Footer from "./footer";
import SectionComponent from "@/components/section";
import Image from "next/image";
import { ExtendedFlexProps } from "@/lib/types";
import DishCarousel from "@/components/DishCarouselComponent";
import AnimatedSection from "@/components/animated-section";
import { useEffect, useState, type Key } from "react";
import { useLanguage } from "@/hooks/LanguageContext";
import { urlFor } from "@/sanity/lib/sanityImage";
import { MAX_WIDTH } from "@/lib/enums";
import { FaTimes } from "react-icons/fa";
import { HomepageData } from "@/lib/interfaces/homeData";
import { LocationData } from "@/lib/interfaces/locationData";
import { useAppData } from "@/hooks/AppDataContext";
import ExtendedHeading from "@/components/ExtendedHeading";
import ExtendedText from "@/components/ExtendedText";
import { useTranslation } from "@/lib/translations";
import FullPageLoader from "@/components/FullPageLoader";
import { getLocaleString, type LocaleString } from "@/lib/utility";
import { PageLayout } from "@/components/PageLayout";

const ExtendedFlex = Flex as React.ComponentType<ExtendedFlexProps>;

export default function Page() {
  const { homepage, location, loading } = useAppData();

  const homeData = (homepage ?? null) as HomepageData | null;
  const locationData = (location ?? null) as LocationData | null;

  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const getText = (field?: LocaleString) =>
    getLocaleString(field, language);

  // banner state
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (homeData?.alertBanner?.showBanner) {
      setShowBanner(true);
    }
  }, [homeData]);

  if (loading) return <FullPageLoader message={t("loading")} />;
  if (!homeData || !locationData)
    return <ExtendedText>Content not available.</ExtendedText>;

  return (
      <PageLayout>
        {homeData?.alertBanner && showBanner && (
          <Box
            width="100%"
            bg={homeData.alertBanner.backgroundColor}
            color={homeData.alertBanner.textColor}
            textAlign="center"
            py={6}
            px={4}
            borderRadius={2}
            fontWeight="bold"
            position="sticky"
            top="4rem"
            zIndex={15}
          >
            {getText(homeData.alertBanner.message)}

            <Box
              position="absolute"
              right={2}
              top={2}
              p={4}
              cursor="pointer"
              onClick={() => setShowBanner(false)}
            >
              <FaTimes />
            </Box>
          </Box>
        )}

        {/* Hero Section */}
        <Box
          w="100%"
          maxW={MAX_WIDTH.XL}
          mx="auto"
          height={{ base: "25rem", lg: "37.5rem" }}
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent={{ base: "center", lg: "flex-start" }}
          borderRadius="0.25rem"
          overflow="hidden"
        >
          {/* Background Image */}
          {homeData.hero.image && (
            <Image
              src={urlFor(homeData.hero.image).width(1920).height(1080).url()}
              alt={getText(homeData.hero.imageCaption) || "Hero image"}
              fill
              style={{
                objectFit: "cover",
                zIndex: 1,
              }}
            />
          )}

          {/* Overlay */}
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bg="rgba(0,0,0,0.6)"
            zIndex={2}
          />

          {/* Hero Text */}
          <ExtendedFlex
            direction="column"
            gap={4}
            maxW={{ base: "90%", lg: "50%" }}
            color="white"
            zIndex={5}
            px={4}
          >
            <ExtendedHeading
              size={{ base: "3xl", lg: "5xl" }}
              lineHeight="short"
            >
              {getText(homeData.hero.title)}
            </ExtendedHeading>
            <ExtendedText>
              {getText(homeData.hero.description)}
            </ExtendedText>
          </ExtendedFlex>
        </Box>

        {/* Signature Dishes */}
        <AnimatedSection animation="slideUp">
          <SectionComponent
            headingTitle={getText(homeData.signatureDishes.title)}
            description={getText(homeData.signatureDishes.description)}
          >
            <DishCarousel />
          </SectionComponent>
        </AnimatedSection>

        {/* About Section */}
        <AnimatedSection animation="slideInLeft">
          <SectionComponent
            headingTitle={getText(homeData.about.title)}
            description={" "}
          >
            <Stack
              alignItems={"center"}
              direction={{ base: "column", lg: "row" }}
              gapX={8}
              gapY={4}
            >
              <ExtendedFlex maxW={MAX_WIDTH.XL} gap="8">
                <ExtendedText w={"100%"}>
                  {getText(homeData.about.description)}
                </ExtendedText>
              </ExtendedFlex>

              {/* About Image */}
              {homeData.about.image && (
                <Image
                  src={urlFor(homeData.about.image)
                    .width(1280)
                    .height(720)
                    .url()}
                  alt={
                    getText(homeData.about.imageCaption) ||
                    "About image"
                  }
                  width={600}
                  height={300}
                  style={{ borderRadius: "1rem" }}
                />
              )}
            </Stack>
          </SectionComponent>
        </AnimatedSection>

        {/* Location Section */}
        {locationData && (
          <AnimatedSection animation="slideUp">
            <SectionComponent
              headingTitle={getText(locationData.title)}
              description={getText(locationData.description)}
            >
              <ExtendedFlex
                maxW={MAX_WIDTH.XL}
                width={"100%"}
                gap={16}
                direction={{ base: "column-reverse", lg: "row" }}
                align={{ base: "center", lg: "flex-start" }}
              >
                <AspectRatio
                  borderRadius={16}
                  overflow={"hidden"}
                  width={"100%"}
                  maxH={"18.75rem"}
                  ratio={1 / 1}
                  flexBasis={"50%"}
                >
                  {/* Map iframe */}
                  {locationData.map?.embedUrl && (
                    <iframe
                      src={locationData.map.embedUrl}
                      width="600"
                      height="200"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  )}
                </AspectRatio>
                <ExtendedFlex
                  direction="column"
                  flexBasis={"50%"}
                  textAlign={"left"}
                >
                  {locationData.sections.map((section: any, i: number) => (
                    <Box key={i} pb={8}>
                      <ExtendedHeading size="lg">
                        {getText(section.title)}
                      </ExtendedHeading>

                      {section.info.map(
                        (
                          line: LocaleString | undefined,
                          j: Key | null | undefined,
                        ) => (
                          <ExtendedText key={j}>
                            {getText(line)}
                          </ExtendedText>
                        ),
                      )}
                    </Box>
                  ))}
                </ExtendedFlex>
              </ExtendedFlex>
            </SectionComponent>
          </AnimatedSection>
        )}

        <Footer />
      </PageLayout>
    );
  }
