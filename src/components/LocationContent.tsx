"use client";

import { AspectRatio, Box, Flex, SimpleGrid, Stack } from "@chakra-ui/react";
import { useLanguage } from "@/hooks/LanguageContext";
import type { LocationData } from "@/lib/interfaces/locationData";
import type { LocaleString } from "@/lib/interfaces";
import { getLocaleString } from "@/lib/utility";
import ExtendedHeading from "@/components/ExtendedHeading";
import { RichText } from "@/components/RichText";

interface LocationContentProps {
  locationData: LocationData;
  layout: "side-by-side" | "stacked" | "directions";
  includeMoreSections?: boolean;
}

function isOpeningHours(title: LocaleString): boolean {
  return Object.values(title).some((value) =>
    /^(opening hours|aukioloajat|öppettider|เวลาเปิดทำการ)$/i.test(value?.trim() || ""),
  );
}

function isContactSection(title: LocaleString): boolean {
  return Object.values(title).some((value) =>
    /^(contact information|yhteystiedot|kontaktinformation|ข้อมูลติดต่อ)$/i.test(
      value?.trim() || "",
    ),
  );
}

export function LocationContent({
  locationData,
  layout,
  includeMoreSections = false,
}: LocationContentProps) {
  const { language } = useLanguage();
  const getText = (field?: LocaleString) => getLocaleString(field, language);

  const map = locationData.map?.embedUrl ? (
    <AspectRatio
      ratio={16 / 9}
      w="full"
      maxH="24rem"
      overflow="hidden"
      borderRadius="xl"
    >
      <iframe
        src={locationData.map.embedUrl}
        title="Map to Chao Phraya Thai Restaurant"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </AspectRatio>
  ) : null;

  const renderSections = (sections: LocationData["sections"]) => (
    <Stack gap={6} flex="1" minW={0} textAlign="left">
      {sections.map((section, sectionIndex) => (
        <Box key={`${getText(section.title)}-${sectionIndex}`}>
          <ExtendedHeading size="lg" pb={3}>
            {getText(section.title)}
          </ExtendedHeading>

          {isOpeningHours(section.title) ? (
            <Box>
              <Stack gap={1} w={{ base: "18rem", sm: "20rem" }} maxW="full">
                {section.info.map((line, lineIndex) => {
                  const match = getText(line).match(/^([^:：]+)[:：]\s*(.+)$/);
                  if (!match) return null;
                  return (
                    <Flex key={lineIndex} w="full" gap={4} align="baseline">
                      <Box
                        as="span"
                        w={{ base: "8.5rem", sm: "9.5rem" }}
                        flexShrink={0}
                        textAlign="left"
                      >
                        {match[1]}:
                      </Box>
                      <Box as="span" textAlign="left">{match[2]}</Box>
                    </Flex>
                  );
                })}
              </Stack>
              {section.info.map((line, lineIndex) => {
                const text = getText(line);
                if (/^[^:：]+[:：]\s*.+$/.test(text)) return null;
                return (
                  <Flex
                    key={lineIndex}
                    mt={3}
                    w="full"
                    gap={2}
                    align="flex-start"
                    px={3}
                    py={2.5}
                    borderLeftWidth="3px"
                    borderLeftColor="#D4A13A"
                    borderRadius="md"
                    bg="rgba(212, 161, 58, 0.14)"
                    color="#E9C46A"
                    fontWeight="semibold"
                  >
                    <Box as="span" aria-hidden="true" color="#E2B34D">
                      !
                    </Box>
                    {text}
                  </Flex>
                );
              })}
            </Box>
          ) : isContactSection(section.title) ? (
            <Stack gap={1}>
              {section.info.map((line, lineIndex) => (
                <Box as="p" key={lineIndex}>
                  {getText(line)}
                </Box>
              ))}
            </Stack>
          ) : (
            <RichText text={section.info.map(getText).join("\n")} />
          )}
        </Box>
      ))}
    </Stack>
  );
  const mainDetails = renderSections(locationData.sections);
  const moreDetails = renderSections(
    includeMoreSections ? locationData.moreSections || [] : [],
  );

  if (layout === "directions") {
    return (
      <SimpleGrid columns={[1, null, 2]} gap={{ base: 8, lg: 12 }} alignItems="start">
        <Stack gap={{ base: 8, md: 10 }} minW={0}>
          {map}
          {mainDetails}
        </Stack>
        {includeMoreSections && <Box minW={0}>{moreDetails}</Box>}
      </SimpleGrid>
    );
  }

  if (layout === "stacked") {
    return (
      <Stack gap={{ base: 8, md: 10 }}>
        {map}
        {mainDetails}
        {includeMoreSections && moreDetails}
      </Stack>
    );
  }

  return (
    <Flex
      direction={{ base: "column-reverse", lg: "row" }}
      align="flex-start"
      gap={{ base: 8, lg: 12 }}
      w="full"
    >
      <Box flex="1" w="full" minW={0}>
        {map}
      </Box>
      {mainDetails}
    </Flex>
  );
}
