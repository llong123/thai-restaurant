"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Footer from "./footer";
import SectionComponent from "@/components/section";
import DishCarousel from "@/components/DishCarouselComponent";
import AnimatedSection from "@/components/animated-section";
import { useLanguage } from "@/hooks/LanguageContext";
import { HomepageData } from "@/lib/interfaces/homeData";
import { LocationData } from "@/lib/interfaces/locationData";
import { useAppData } from "@/hooks/AppDataContext";
import ExtendedHeading from "@/components/ExtendedHeading";
import ExtendedText from "@/components/ExtendedText";
import { useTranslation } from "@/lib/translations";
import FullPageLoader from "@/components/FullPageLoader";
import { getLocaleString, type LocaleString } from "@/lib/utility";
import { PageLayout } from "@/components/PageLayout";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { LocationContent } from "@/components/LocationContent";
import { RichText } from "@/components/RichText";
import { useRouter } from "next/navigation";
import { LuArrowRight, LuMapPin } from "react-icons/lu";
import { PageContainer } from "@/components/PageContainer";
import { ActionButton } from "@/components/ActionButton";

export default function Page() {
  const { homepage, location, loading } = useAppData();

  const homeData = (homepage ?? null) as HomepageData | null;
  const locationData = (location ?? null) as LocationData | null;

  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const router = useRouter();

  const getText = (field?: LocaleString) =>
    getLocaleString(field, language);

  if (loading) return <FullPageLoader message={t("loading")} />;
  if (!homeData || !locationData)
    return <ExtendedText>Content not available.</ExtendedText>;

  return (
      <PageLayout>
        {/* Hero Section */}
        <Box
          w="100%"
          height={{ base: "29rem", lg: "37.5rem" }}
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent={{ base: "center", lg: "flex-start" }}
          borderRadius={{ base: "xl", md: "2xl" }}
          overflow="hidden"
        >
          {/* Background Image */}
          {homeData.hero.image && (
            <ImageWithSkeleton
              src={homeData.hero.image}
              alt={getText(homeData.hero.imageCaption) || "Hero image"}
              containerProps={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
              }}
              imageProps={{ objectFit: "cover", loading: "eager" }}
            />
          )}
          {!homeData.hero.image && (
            <Box
              position="absolute"
              inset={0}
              zIndex={1}
              display="grid"
              placeItems="center"
              bg="gray.700"
            >
              <Text fontSize="6xl" aria-hidden="true">🍽️</Text>
            </Box>
          )}

          {/* Overlay */}
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            background="linear-gradient(90deg, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.48) 52%, rgba(0,0,0,0.12) 100%)"
            zIndex={2}
          />

          {/* Hero Text */}
          <Flex
            direction="column"
            gap={4}
            maxW={{ base: "92%", lg: "56%" }}
            color="white"
            zIndex={5}
            px={4}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="#F1C27D"
            >
              Hietalahti Market Hall · Helsinki
            </Text>
            <ExtendedHeading
              as="h1"
              size={{ base: "3xl", lg: "5xl" }}
              lineHeight="short"
            >
              {getText(homeData.hero.title)}
            </ExtendedHeading>
            <RichText text={getText(homeData.hero.description)} color="white" />
            <Flex
              mt={2}
              gap={3}
              wrap="wrap"
              justify={{ base: "center", lg: "flex-start" }}
            >
              <ActionButton
                type="button"
                fontWeight="bold"
                size="lg"
                px={6}
                onClick={() => router.push(homeData.hero.ctaUrl || "/menu")}
              >
                {getText(homeData.hero.cta)}
                <LuArrowRight aria-hidden="true" />
              </ActionButton>
              <ActionButton
                type="button"
                appearance="outline"
                borderColor="whiteAlpha.800"
                color="white"
                fontWeight="semibold"
                size="lg"
                px={6}
                onClick={() => router.push(homeData.hero.locationCtaUrl || "/location")}
                _hover={{ bg: "whiteAlpha.200" }}
              >
                <LuMapPin aria-hidden="true" />
                {getText(homeData.hero.locationCta)}
              </ActionButton>
            </Flex>
          </Flex>
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
          <Box w="full" py={{ base: 12, md: 20 }}>
            <PageContainer
              contentWidth="full"
              gutter={0}
              display="flex"
              alignItems="center"
              flexDirection={{ base: "column-reverse", lg: "row" }}
              gap={{ base: 8, lg: 16 }}
            >
              <Box flex="1" minW={0} textAlign={{ base: "center", lg: "left" }}>
                <ExtendedHeading as="h2" pb={4}>
                  {getText(homeData.about.title)}
                </ExtendedHeading>
                <RichText
                  text={getText(homeData.about.description)}
                  textAlign={{ base: "center", lg: "left" }}
                />
                <ActionButton
                  mt={5}
                  fontWeight="semibold"
                  px={5}
                  onClick={() => router.push("/about")}
                >
                  {t("homepage.readOurStory")}
                  <LuArrowRight aria-hidden="true" />
                </ActionButton>
              </Box>

              <Box flex="1" w="full" display="flex" justifyContent="center">
                {homeData.about.image ? (
                  <ImageWithSkeleton
                    src={homeData.about.image}
                    alt={getText(homeData.about.imageCaption) || getText(homeData.about.title)}
                    containerProps={{
                      width: "full",
                      maxWidth: "40rem",
                      height: { base: "18rem", lg: "25rem" },
                      borderRadius: "2xl",
                    }}
                    imageProps={{ objectFit: "cover", loading: "lazy" }}
                  />
                ) : (
                  <Box
                    width="full"
                    maxWidth="40rem"
                    height={{ base: "18rem", lg: "25rem" }}
                    borderRadius="2xl"
                    bg="blackAlpha.100"
                    display="grid"
                    placeItems="center"
                  >
                    <Text fontSize="5xl" aria-hidden="true">🍽️</Text>
                  </Box>
                )}
              </Box>
            </PageContainer>
          </Box>
        </AnimatedSection>

        {/* Location Section */}
        {locationData && (
          <AnimatedSection animation="slideUp">
            <SectionComponent
              headingTitle={getText(locationData.title)}
              description={getText(locationData.description)}
            >
              <LocationContent locationData={locationData} layout="side-by-side" />
            </SectionComponent>
          </AnimatedSection>
        )}

        <Footer />
      </PageLayout>
    );
  }
