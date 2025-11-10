"use client";

import {
  VStack,
  Flex,
  Heading,
  AspectRatio,
  Text,
  Button,
  Box,
  Stack,
} from "@chakra-ui/react";
import Footer from "./footer";
import SectionComponent from "@/components/section";
import Image from "next/image";
import {
  ExtendedTextProps,
  ExtendedHeadingProps,
  ExtendedButtonProps,
  ExtendedFlexProps,
} from "@/lib/types";
import NavigationComponent from "@/components/NavigationComponent";
import DishCarousel from "@/components/DishCarouselComponent";
import AnimatedSection from "@/components/animated-section";
import { Key, useEffect, useState } from "react";
import { useLanguage } from "@/hooks/LanguageContext";
import { LocaleString } from "@/lib/interfaces";
import { urlFor } from "@/sanity/lib/sanityImage";
import { MAX_WIDTH } from "@/lib/enums";
import { FaTimes } from "react-icons/fa";
import { HomepageData } from "@/lib/interfaces/homeData";
import { LocationData } from "@/lib/interfaces/locationData";
import { useAppData } from "@/hooks/AppDataContext";

const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;
const ExtendedButton = Button as React.ComponentType<ExtendedButtonProps>;
const ExtendedFlex = Flex as React.ComponentType<ExtendedFlexProps>;

export default function Page() {
  // use centralized app data
  const { homepage, location, loading } = useAppData();

  const homeData = (homepage ?? null) as HomepageData | null;
  const locationData = (location ?? null) as LocationData | null;

  const { language } = useLanguage();

  const getLocaleString = (field?: LocaleString) =>
    field?.[language] || field?.en || "";

  // banner state
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (homeData?.alertBanner?.showBanner) {
      setShowBanner(true);
    }
  }, [homeData]);

  if (loading) return <Text>Loading...</Text>;
  if (!homeData || !locationData) return <Text>Content not available.</Text>;

  return (
    <VStack alignItems="center" maxW={MAX_WIDTH.XL} mx="auto" gap={0}>
      <NavigationComponent />

      {homeData?.alertBanner && showBanner && (
        <Box
          width="100%"
          bg={homeData.alertBanner.backgroundColor}
          color={homeData.alertBanner.textColor}
          textAlign="center"
          py={6}
          px={8}
          borderRadius={2}
          fontWeight="bold"
          position="sticky"
          top="64px"
          zIndex={15}
        >
          {getLocaleString(homeData.alertBanner.message)}

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
        width="100%"
        height={{ base: "400px", lg: "600px" }}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent={{ base: "center", lg: "flex-start" }}
        paddingX={{ base: 4, lg: 16 }}
        borderRadius="4px"
        overflow="hidden"
      >
        {/* Background Image */}
        {homeData.hero.image && (
          <Image
            src={urlFor(homeData.hero.image).width(1920).height(1080).url()}
            alt={getLocaleString(homeData.hero.imageCaption) || "Hero image"}
            fill
            style={{
              objectFit: "cover",
              zIndex: -1,
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
          zIndex={0}
        />

        {/* Hero Text */}
        <ExtendedFlex
          direction="column"
          gap={4}
          maxW={{ base: "90%", lg: "50%" }}
          color="white"
          zIndex={1}
        >
          <ExtendedHeading size={{ base: "xl", lg: "4xl" }}>
            {getLocaleString(homeData.hero.title)}
          </ExtendedHeading>
          <ExtendedText fontSize={{ base: 14, lg: 20 }}>
            {getLocaleString(homeData.hero.description)}
          </ExtendedText>
          <ExtendedButton
            size="lg"
            mt={{ base: 4, lg: 8 }}
            onClick={() => (window.location.href = homeData.hero.ctaUrl)}
          >
            {getLocaleString(homeData.hero.cta)}
          </ExtendedButton>
        </ExtendedFlex>
      </Box>

      {/* Signature Dishes */}
      <AnimatedSection animation="slideUp">
        <SectionComponent
          headingTitle={getLocaleString(homeData.signatureDishes.title)}
          description={getLocaleString(homeData.signatureDishes.description)}
        >
          <DishCarousel />
        </SectionComponent>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection animation="slideInLeft">
        <SectionComponent
          headingTitle={getLocaleString(homeData.about.title)}
          description={" "}
        >
          <Stack
            alignItems={"center"}
            direction={{ base: "column", lg: "row" }}
            gapX={8}
            gapY={4}
            px={8}
          >
            <ExtendedFlex maxW={MAX_WIDTH.XL} gap="8">
              <ExtendedText fontSize={{ base: 12, lg: 16 }} w={"100%"}>
                {getLocaleString(homeData.about.description)}
              </ExtendedText>
            </ExtendedFlex>

            {/* About Image */}
            {homeData.about.image && (
              <Image
                src={urlFor(homeData.about.image).width(1280).height(720).url()}
                alt={
                  getLocaleString(homeData.about.imageCaption) || "About image"
                }
                width={600}
                height={300}
                style={{ borderRadius: "16px" }}
              />
            )}
          </Stack>
        </SectionComponent>
      </AnimatedSection>

      {/* Location Section */}
      {locationData && (
        <AnimatedSection animation="slideUp">
          <SectionComponent
            darkBg
            headingTitle={getLocaleString(locationData.title)}
            description={getLocaleString(locationData.description)}
          >
            <ExtendedFlex
              maxW={MAX_WIDTH.XL}
              width={"100%"}
              gap={16}
              paddingX={8}
              direction={{ base: "column-reverse", lg: "row" }}
              align={{ base: "center", lg: "flex-start" }}
            >
              <AspectRatio
                borderRadius={16}
                overflow={"hidden"}
                width={"100%"}
                maxH={"300px"}
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
                      {getLocaleString(section.title)}
                    </ExtendedHeading>

                    {section.info.map(
                      (
                        line: LocaleString | undefined,
                        j: Key | null | undefined,
                      ) => (
                        <ExtendedText key={j}>
                          {getLocaleString(line)}
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
    </VStack>
  );
}