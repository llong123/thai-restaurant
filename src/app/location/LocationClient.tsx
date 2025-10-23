"use client";

import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import Footer from "../footer";
import NavigationComponent from "@/components/NavigationComponent";
import { useColorModeValue } from "@/components/ui/color-mode";
import { LocaleString } from "@/lib/interfaces";
import { useLanguage } from "@/hooks/LanguageContext";

// Each section in the "sections" array (e.g., Address, Contact, Opening Hours)
interface Section {
  title: LocaleString;
  info: LocaleString[];
}

// Map embed object
interface MapEmbed {
  embedUrl?: string;
}

// Main VisitUs type
interface VisitUs {
  title: LocaleString;
  sections: Section[];
  moreSections: Section[];
  map?: MapEmbed;
}

export default function LocationClient({ visitUs }: { visitUs: VisitUs }) {
  const maxWidth = "8xl";
  const bgColor = useColorModeValue("white", "gray.800");
  const { language } = useLanguage();

  const getLocale = (field?: LocaleString) =>
    field?.[language] || field?.en || "";

  if (!visitUs) return <p className="p-8">Visit Us data not available.</p>;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bg={bgColor}>
      <NavigationComponent />

      <Box flex="1" w="100%">
        <Box maxWidth={maxWidth} mx="auto" p={8} w="100%">
          {/* Title */}
          <Box textAlign="center" pb={12}>
            <Heading size="2xl">{getLocale(visitUs.title)}</Heading>
          </Box>

          <SimpleGrid columns={[1, null, 2]} gap={12}>
            {/* Left Column */}
            <Box>
              {visitUs.sections.map((section, i) => (
                <Box key={i} pb={8}>
                  <Heading size="lg" pb={4}>
                    {getLocale(section.title)}
                  </Heading>
                  {section.info.map((line, j) => (
                    <Text key={j}>{getLocale(line)}</Text>
                  ))}
                </Box>
              ))}
            </Box>

            {/* Right Column */}
            <Box>
              {/* Map */}
              {visitUs.map?.embedUrl && (
                <Box pb={8} height="300px">
                  <iframe
                    src={visitUs.map.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Box>
              )}

              {/* More Info Sections */}
              {visitUs.moreSections.map((section, i) => (
                <Box key={i} pb={8}>
                  <Heading size="lg" pb={4}>
                    {getLocale(section.title)}
                  </Heading>
                  {section.info.map((line, j) => (
                    <Text key={j}>{getLocale(line)}</Text>
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
