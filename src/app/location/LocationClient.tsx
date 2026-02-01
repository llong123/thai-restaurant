"use client";

import { Box, SimpleGrid } from "@chakra-ui/react";
import Footer from "../footer";
import NavigationComponent from "@/components/NavigationComponent";
import { useLanguage } from "@/hooks/LanguageContext";
import { MAX_WIDTH } from "@/lib/enums";
import { LocationData } from "@/lib/interfaces/locationData";
import { useThemeColors } from "@/components/fontVars";
import ExtendedHeading from "@/components/ExtendedHeading";
import ExtendedText from "@/components/ExtendedText";
import { useTranslation } from "@/lib/translations";
import FullPageLoader from "@/components/FullPageLoader";
import { getLocaleString, type LocaleString } from "@/lib/utility";

export default function LocationClient({
  locationData,
  loading,
}: {
  locationData: LocationData | undefined;
  loading: boolean;
}) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const { bgColor } = useThemeColors();

  const getText = (field?: LocaleString) => getLocaleString(field, language);

  if (loading) return <FullPageLoader message={t("loading")} />;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bg={bgColor}
      px={16}
    >
      <Box flex="1" w="100%" maxWidth={MAX_WIDTH.XL}>
        <NavigationComponent />
        <Box mx="auto" p={8} w="100%">
          {/* Title */}
          <Box textAlign="center" pb={12}>
            <ExtendedHeading as={"h2"}>
              {getText(locationData?.title)}
            </ExtendedHeading>
          </Box>

          <SimpleGrid columns={[1, null, 2]} gap={12}>
            {/* Left Column */}
            <Box>
              {/* Map */}
              {locationData?.map?.embedUrl && (
                <Box pb={8} height="300px">
                  <iframe
                    src={locationData.map.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Box>
              )}
              {/* Info Sections */}
              {locationData?.sections?.map((section, i) => (
                <Box key={i} pb={8}>
                  <ExtendedHeading size="lg" pb={4}>
                    {getText(section.title)}
                  </ExtendedHeading>
                  {section.info.map((line, j) => (
                    <ExtendedText key={j}>{getText(line)}</ExtendedText>
                  ))}
                </Box>
              ))}
            </Box>

            {/* Right Column */}
            <Box>
              {/* More Info Sections */}
              {locationData?.moreSections?.map((section, i) => (
                <Box key={i} pb={8}>
                  <ExtendedHeading size="lg" pb={4}>
                    {getText(section.title)}
                  </ExtendedHeading>
                  {section.info.map((line, j) => (
                    <ExtendedText key={j}>{getText(line)}</ExtendedText>
                  ))}
                </Box>
              ))}
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      <Box mt="auto">
        <Footer />
      </Box>
    </Box>
  );
}
