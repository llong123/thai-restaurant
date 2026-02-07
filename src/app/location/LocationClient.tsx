"use client";

import { Box, SimpleGrid } from "@chakra-ui/react";
import Footer from "../footer";
import { useLanguage } from "@/hooks/LanguageContext";
import { LocationData } from "@/lib/interfaces/locationData";
import ExtendedHeading from "@/components/ExtendedHeading";
import ExtendedText from "@/components/ExtendedText";
import { useTranslation } from "@/lib/translations";
import FullPageLoader from "@/components/FullPageLoader";
import { getLocaleString, type LocaleString } from "@/lib/utility";
import { PageLayout } from "@/components/PageLayout";

export default function LocationClient({
  locationData,
  loading,
}: {
  locationData: LocationData | undefined;
  loading: boolean;
}) {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const getText = (field?: LocaleString) => getLocaleString(field, language);

  if (loading) return <FullPageLoader message={t("loading")} />;

  return (
    <PageLayout>
      <Box textAlign="center" pb={12}>
        <ExtendedHeading as={"h2"}>
          {getText(locationData?.title)}
        </ExtendedHeading>
      </Box>
      <SimpleGrid columns={[1, null, 2]} gap={12}>
        <Box>
          {locationData?.map?.embedUrl && (
            <Box pb={8} height="18.75rem">
              <iframe
                src={locationData.map.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          )}
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
        <Box>
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
      <Box mt="auto">
        <Footer />
      </Box>
    </PageLayout>
  );
}
