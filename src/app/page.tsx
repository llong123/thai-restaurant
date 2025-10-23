"use client";

import {
  VStack,
  Flex,
  Heading,
  AspectRatio,
  Text,
  Button,
  HStack,
  Box,
} from "@chakra-ui/react";
import Footer from "./footer";
import SectionComponent from "@/components/section";
import Image from "next/image";
import { client } from "@/sanity/lib/sanityClient"; // Make sure you have a Sanity client setup
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

const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;
const ExtendedButton = Button as React.ComponentType<ExtendedButtonProps>;
const ExtendedFlex = Flex as React.ComponentType<ExtendedFlexProps>;

export default function Page() {
  const maxWidth = "8xl";

  const [homeData, setHomeData] = useState<any>(null);
  const [locationData, setLocationData] = useState<any>(null);

  const { language } = useLanguage();

  const getLocale = (field?: LocaleString) =>
    field?.[language] || field?.en || "";

  useEffect(() => {
    async function fetchHome() {
      const query = `*[_type == "homepage"][0]{
        hero,
        signatureDishes,
        about,
        location
      }`;
      const data = await client.fetch(query);
      console.log(data);
      setHomeData(data);
    }

    async function fetchLocation() {
      const query = `
        *[_type == "visitUs"][0]{
          title,
          sections,
          moreSections,
          map
        }
      `;
      const data = await client.fetch(query);
      setLocationData(data);
    }
    fetchHome();
    fetchLocation();
  }, []);

  if (!homeData || !locationData) return <Text>Loading...</Text>;

  return (
    <VStack maxW={maxWidth} mx="auto" gap={0}>
      <NavigationComponent />

      {/* Hero Section */}
      <Box
        width="100%"
        height={{ base: "400px", lg: "600px" }}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent={{ base: "center", lg: "flex-start" }}
        paddingX={{ base: 4, lg: 16 }}
        borderRadius="16px"
        overflow="hidden"
      >
        {/* Background Image */}
        {homeData.hero.image && (
          <Image
            src={urlFor(homeData.hero.image).width(1920).height(1080).url()}
            alt={getLocale(homeData.hero.imageCaption) || "Hero image"}
            fill
            style={{
              objectFit: "cover",
              zIndex: -1, // put image behind the text
            }}
          />
        )}

        {/* Overlay (optional, for better readability) */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bg="rgba(0,0,0,0.4)" // dark overlay
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
            {getLocale(homeData.hero.title)}
          </ExtendedHeading>
          <ExtendedText fontSize={{ base: 14, lg: 20 }}>
            {getLocale(homeData.hero.description)}
          </ExtendedText>
          <ExtendedButton size="lg" mt={{ base: 4, lg: 8 }}>
            {getLocale(homeData.hero.cta)}
          </ExtendedButton>
        </ExtendedFlex>
      </Box>

      {/* Signature Dishes */}
      <AnimatedSection animation="slideUp">
        <SectionComponent
          headingTitle={getLocale(homeData.signatureDishes.title)}
          description={getLocale(homeData.signatureDishes.description)}
        >
          <DishCarousel />
        </SectionComponent>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection animation="slideInLeft">
        <SectionComponent
          headingTitle={getLocale(homeData.about.title)}
          description={" "}
        >
          <HStack gapX={8} px={8}>
            <ExtendedFlex direction={"column"} maxW={maxWidth} gap="8">
              <ExtendedText fontSize={{ base: 12, lg: 16 }} w={"100%"}>
                {getLocale(homeData.about.description)}
              </ExtendedText>
            </ExtendedFlex>

            {/* About Image */}
            {homeData.about.image && (
              <Image
                src={urlFor(homeData.about.image).width(500).height(300).url()}
                alt={getLocale(homeData.about.imageCaption) || "About image"}
                width={500}
                height={300}
                style={{ borderRadius: "16px" }}
              />
            )}
          </HStack>
        </SectionComponent>
      </AnimatedSection>

      {/* Location Section */}
      {locationData && (
        <AnimatedSection animation="slideUp">
          <SectionComponent
            darkBg
            headingTitle={getLocale(locationData.title)}
            description={getLocale(locationData.title)}
          >
            <ExtendedFlex
              maxW={maxWidth}
              width={"100%"}
              gap={16}
              paddingX={8}
              direction={{ base: "column-reverse", lg: "row" }}
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
                      {getLocale(section.title)}
                    </ExtendedHeading>

                    {section.info.map(
                      (
                        line: LocaleString | undefined,
                        j: Key | null | undefined,
                      ) => (
                        <ExtendedText key={j}>{getLocale(line)}</ExtendedText>
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
