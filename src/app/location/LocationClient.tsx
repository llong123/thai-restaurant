"use client";

import { Box } from "@chakra-ui/react";
import Footer from "../footer";
import { useLanguage } from "@/hooks/LanguageContext";
import { LocationData } from "@/lib/interfaces/locationData";
import ExtendedHeading from "@/components/ExtendedHeading";
import { RichText } from "@/components/RichText";
import { LocationContent } from "@/components/LocationContent";
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
      <Box textAlign="center" pb={{ base: 8, md: 12 }}>
        <ExtendedHeading as="h2" pb={4}>
          {getText(locationData?.title)}
        </ExtendedHeading>
        <RichText text={getText(locationData?.description)} />
      </Box>

      {locationData && (
        <LocationContent
          locationData={locationData}
          layout="directions"
          includeMoreSections
        />
      )}

      <Box mt="auto" pt={10}>
        <Footer />
      </Box>
    </PageLayout>
  );
}
