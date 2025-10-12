"use client";

import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import Footer from "../footer";
import content from "@/data/content.json";
import { ExtendedTextProps, ExtendedHeadingProps } from "@/lib/types";
import Navigation from "@/components/navigation";
import { useColorModeValue } from "@/components/ui/color-mode";

// Create extended components with proper types
const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;

export default function LocationPage() {
  const maxWidth = "8xl";
  const { location } = content;
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bg={bgColor}>
      <Navigation />

      {/* Main Content */}
      <Box flex="1" w="100%">
        <Box maxWidth={maxWidth} mx="auto" p={8} w="100%">
          {/* Title Section */}
          <Box textAlign="center" pb={12}>
            <ExtendedHeading size="2xl">{location.title}</ExtendedHeading>
          </Box>

          <SimpleGrid columns={[1, null, 2]} gap={12}>
            {/* Left Column - Address and Contact */}
            <Box>
              {/* Address */}
              <Box pb={8}>
                <ExtendedHeading size="lg" pb={4}>
                  Address
                </ExtendedHeading>
                <ExtendedText pb={2}>{location.address.street}</ExtendedText>
                <ExtendedText pb={2}>
                  {location.address.postalCode} {location.address.city}
                </ExtendedText>
                <ExtendedText>{location.address.country}</ExtendedText>
              </Box>

              {/* Contact */}
              <Box pb={8}>
                <ExtendedHeading size="lg" pb={4}>
                  Contact
                </ExtendedHeading>
                <ExtendedText pb={2}>{location.contact.phone}</ExtendedText>
                <ExtendedText>{location.contact.email}</ExtendedText>
              </Box>

              {/* Hours */}
              <Box pb={8}>
                <ExtendedHeading size="lg" pb={4}>
                  Opening Hours
                </ExtendedHeading>
                <ExtendedText pb={2}>{location.hours.weekdays}</ExtendedText>
                <ExtendedText pb={2}>{location.hours.saturday}</ExtendedText>
                <ExtendedText>{location.hours.sunday}</ExtendedText>
              </Box>
            </Box>

            {/* Right Column - Map and Directions */}
            <Box>
              {/* Map */}
              <Box pb={8} height="300px">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.9515746665063!2d24.952672178088346!3d60.18153377503828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920bd5bc995bc1%3A0x785b19e065883db0!2sH%C3%A4meentie%207%2C%2000530%20Helsinki!5e0!3m2!1sfi!2sfi!4v1742577370577!5m2!1sfi!2sfi"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>

              {/* Directions */}
              <Box pb={8}>
                <ExtendedHeading size="lg" pb={4}>
                  {location.directions.fromAirport.title}
                </ExtendedHeading>
                <Box as="ul" pb={6}>
                  {location.directions.fromAirport.steps.map((step, index) => (
                    <Box as="li" key={index} pb={2}>
                      <ExtendedText>{step}</ExtendedText>
                    </Box>
                  ))}
                </Box>

                <ExtendedHeading size="lg" pb={4}>
                  {location.directions.fromStation.title}
                </ExtendedHeading>
                <Box as="ul" pb={6}>
                  {location.directions.fromStation.steps.map((step, index) => (
                    <Box as="li" key={index} pb={2}>
                      <ExtendedText>{step}</ExtendedText>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Parking */}
              <Box>
                <ExtendedHeading size="lg" pb={4}>
                  {location.parking.title}
                </ExtendedHeading>
                <ExtendedText>{location.parking.description}</ExtendedText>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      {/* Footer */}
      <Box mt="auto">
        <Footer />
      </Box>
    </Box>
  );
}
