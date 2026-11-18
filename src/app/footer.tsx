"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuFacebook, LuInstagram, LuX } from "react-icons/lu";
import { useLanguage } from "@/hooks/LanguageContext";
import { useTranslation } from "@/lib/translations";
import { MAX_WIDTH } from "@/lib/enums";
import { FooterData } from "@/lib/interfaces/footerData";
import { useAppData } from "@/hooks/AppDataContext";
import ExtendedHeading from "@/components/ExtendedHeading";
import ExtendedText from "@/components/ExtendedText";
import FullPageLoader from "@/components/FullPageLoader";
import { getLocaleString, type LocaleString } from "@/lib/utility";
import { useThemeColors } from "@/components/fontVars";

export default function Footer() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const { bgColor } = useThemeColors();

  // use centralized app data
  const { footer, loading } = useAppData();
  const footerData = (footer ?? null) as FooterData | null;

  const getText = (field?: LocaleString) => getLocaleString(field, language);

  if (loading) return <FullPageLoader message={t("loading")} />;
  if (!footerData)
    return <ExtendedText p={8}>Footer data not available.</ExtendedText>;

  if (!footerData.quickLinks && !footerData.followUs)
    return <ExtendedText p={8}>Footer data not available.</ExtendedText>;

  return (
    <footer>
      <Flex w="100%" bgColor={bgColor} justifyContent="center">
        <Box maxW={MAX_WIDTH.XL} w="full" color="white" px={{ base: 6, md: 10 }}>
          <Flex
            w="full"
            py={{ base: 8, md: 10 }}
            direction={{ base: "column", md: "row" }}
            align={{ base: "center", md: "center" }}
            justify="space-between"
            gap={{ base: 8, md: 6 }}
          >
            <Box flex="1" display="flex" justifyContent={{ base: "center", md: "flex-start" }}>
              <Link href="/" aria-label="Chao Phraya home">
                <Image
                  src={footerData.logoUrl || "/logo.png"}
                  alt="Chao Phraya logo"
                  width={180}
                  height={100}
                  objectFit="contain"
                  maxW="100%"
                />
              </Link>
            </Box>

            {footerData.quickLinks?.length > 0 && (
              <VStack
                as="nav"
                aria-label="Footer navigation"
                flex="1"
                alignItems={{ base: "center", md: "flex-start" }}
                gap={2}
              >
                <ExtendedHeading as="h4" size="md" mb={1}>
                  Quick Links
                </ExtendedHeading>
                {footerData.quickLinks.map((link, index) => (
                  <Link key={`${link.url}-${index}`} href={link.url}>
                    <Box
                      as="span"
                      py={1}
                      opacity={0.85}
                      _hover={{ opacity: 1, textDecoration: "underline" }}
                    >
                      {getText(link.label)}
                    </Box>
                  </Link>
                ))}
              </VStack>
            )}

            <VStack
              flex="1"
              alignItems={{ base: "center", md: "flex-end" }}
              gap={2}
            >
              <ExtendedHeading as="h4" size="md">
                {t("footer.followUs")}
              </ExtendedHeading>
              <HStack gap={2}>
                {footerData.followUs?.map((social, index) => {
                  let Icon;
                  switch (social.platform.toLowerCase()) {
                    case "facebook":
                      Icon = LuFacebook;
                      break;
                    case "instagram":
                      Icon = LuInstagram;
                      break;
                    case "x":
                      Icon = LuX;
                      break;
                    default:
                      Icon = LuFacebook;
                  }
                  return (
                    <Link
                      key={`${social.platform}-${index}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                    >
                      <IconButton aria-label={social.platform} variant="ghost" color="white">
                        <Icon />
                      </IconButton>
                    </Link>
                  );
                })}
              </HStack>
            </VStack>
          </Flex>

          <ExtendedText
            width="full"
            borderTop="1px solid"
            borderColor="whiteAlpha.300"
            py={5}
            textAlign="center"
            opacity={0.8}
          >
            {getText(footerData.copyright)}
          </ExtendedText>
        </Box>
      </Flex>
    </footer>
  );
}
