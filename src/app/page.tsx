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
import { Dish } from "@/components/dish";
import Footer from "./footer";
import SectionComponent from "@/components/section";
import Image from "next/image";
import { useTranslation } from "@/lib/translations";
import {
  ExtendedTextProps,
  ExtendedHeadingProps,
  ExtendedButtonProps,
  ExtendedFlexProps,
} from "@/lib/types";
import Navigation from "@/components/navigation";
import DishCarousel from "@/components/dish-carousel";
import AnimatedSection from "@/components/animated-section";

const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;
const ExtendedButton = Button as React.ComponentType<ExtendedButtonProps>;
const ExtendedFlex = Flex as React.ComponentType<ExtendedFlexProps>;

export default function Page() {
  const maxWidth = "8xl";
  const { t } = useTranslation();

  return (
    <VStack maxW={maxWidth} mx="auto" gap={0}>
      <Navigation />

      {/* Hero Section */}
      <AnimatedSection animation="fadeIn">
        <Box>
          <ExtendedFlex
            direction={{ base: "column", lg: "row" }}
            paddingX={{ base: 4, lg: 8 }}
            maxW="1200px"
            mx="auto"
            gap={8}
            alignItems="center"
            justifyContent="space-between"
          >
            <ExtendedFlex
              direction="column"
              maxW={{ base: "100%", lg: "50%" }}
              gap={4}
            >
              <ExtendedHeading size={{ base: "xl", lg: "2xl" }}>
                {t("hero.title")}
              </ExtendedHeading>
              <ExtendedText fontSize={{ base: 16, lg: 18 }}>
                {t("hero.description")}
              </ExtendedText>
              <ExtendedButton size="lg" mt={{ base: 4, lg: 6 }}>
                {t("hero.cta")}
              </ExtendedButton>
            </ExtendedFlex>
            <ExtendedFlex
              direction="column"
              maxW={{ base: "100%", lg: "45%" }}
              gap={2}
            >
              <ExtendedText fontSize={{ base: 14, lg: 16 }}>
                {t("hero.imageCaption")}
              </ExtendedText>
            </ExtendedFlex>
          </ExtendedFlex>
        </Box>
      </AnimatedSection>

      {/* Popular dishes */}
      <AnimatedSection animation="slideUp">
        <SectionComponent
          headingTitle={t("sections.signatureDishes.title")}
          description={t("sections.signatureDishes.description")}
        >
          <DishCarousel dishes={["pad-thai", "tom-yum", "green-curry"]} />
        </SectionComponent>
      </AnimatedSection>

      <AnimatedSection animation="slideInLeft">
        <SectionComponent
          headingTitle={t("sections.about.title")}
          description={t("sections.about.description")}
        >
          <HStack>
            <ExtendedFlex direction={"column"} maxW={maxWidth} gap={4} py={32}>
              <ExtendedHeading size={{ base: "2xl", lg: "4xl" }} w={"50%"}>
                {t("hero.title")}
              </ExtendedHeading>
              <ExtendedText fontSize={{ base: 16, lg: 20 }} w={"50%"}>
                {t("hero.description")}
              </ExtendedText>
            </ExtendedFlex>

            <Image
              src="https://placehold.co/500x100"
              alt="About us restaurant image"
              width={500}
              height={100}
            />
          </HStack>
        </SectionComponent>
      </AnimatedSection>

      {/* Our Menu */}
      <AnimatedSection animation="slideInRight">
        <SectionComponent
          headingTitle={t("sections.menu.title")}
          description={t("sections.menu.description")}
        >
          <ExtendedFlex gap="2" wrap="wrap" justify="center">
            <Dish
              name="Pad Thai"
              description="Classic stir-fried rice noodles with eggs, tofu, and peanuts"
              image="https://placehold.co/600x400/111827/FFFFFF?text=Pad+Thai"
              price="€12.99"
            />
            <Dish
              name="Tom Yum Goong"
              description="Spicy and sour soup with shrimp and mushrooms"
              image="https://placehold.co/600x400/111827/FFFFFF?text=Tom+Yum"
              price="€14.99"
            />
            <Dish
              name="Som Tum"
              description="Green papaya salad with chili, lime, and peanuts"
              image="https://placehold.co/600x400/111827/FFFFFF?text=Som+Tum"
              price="€10.99"
            />
            <Dish
              name="Larb"
              description="Minced meat salad with herbs and spices"
              image="https://placehold.co/600x400/111827/FFFFFF?text=Larb"
              price="€13.99"
            />
            <Dish
              name="Massaman Curry"
              description="Rich curry with potatoes, peanuts, and tender meat"
              image="https://placehold.co/600x400/111827/FFFFFF?text=Massaman"
              price="€15.99"
            />
            <Dish
              name="Khao Pad"
              description="Thai-style fried rice with your choice of protein"
              image="https://placehold.co/600x400/111827/FFFFFF?text=Khao+Pad"
              price="€11.99"
            />
          </ExtendedFlex>
        </SectionComponent>
      </AnimatedSection>

      {/* Find Us */}
      <AnimatedSection animation="slideUp">
        <SectionComponent
          darkBg
          headingTitle={t("sections.location.title")}
          description={t("sections.location.description")}
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.9515746665063!2d24.952672178088346!3d60.18153377503828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920bd5bc995bc1%3A0x785b19e065883db0!2sH%C3%A4meentie%207%2C%2000530%20Helsinki!5e0!3m2!1sfi!2sfi!4v1742577370577!5m2!1sfi!2sfi"
                width="600"
                height="200"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </AspectRatio>
            <ExtendedFlex
              direction="column"
              flexBasis={"50%"}
              textAlign={"left"}
            >
              <ExtendedHeading size="lg">
                {t("sections.location.address.title")}
              </ExtendedHeading>
              <ExtendedText pl={4} pb={4} color={"gray.500"}>
                {t("sections.location.address.value")}
              </ExtendedText>
              <ExtendedHeading size="lg">
                {t("sections.location.fromAirport.title")}
              </ExtendedHeading>
              <ExtendedText>
                {t("sections.location.fromAirport.description")}
              </ExtendedText>
              <ExtendedHeading size="lg">
                {t("sections.location.fromStation.title")}
              </ExtendedHeading>
              <ExtendedText>
                {t("sections.location.fromStation.description")}
              </ExtendedText>
              <ExtendedHeading size="lg">
                {t("sections.location.openingHours.title")}
              </ExtendedHeading>
              <ExtendedText>
                {t("sections.location.openingHours.weekdays")}
              </ExtendedText>
              <ExtendedText>
                {t("sections.location.openingHours.saturday")}
              </ExtendedText>
              <ExtendedText>
                {t("sections.location.openingHours.sunday")}
              </ExtendedText>
            </ExtendedFlex>
          </ExtendedFlex>
        </SectionComponent>
      </AnimatedSection>
      <Footer />
    </VStack>
  );
}
