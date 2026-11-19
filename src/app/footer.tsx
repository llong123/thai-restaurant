"use client";

import {
  Box,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuFacebook, LuInstagram, LuX } from "react-icons/lu";
import { useLanguage } from "@/hooks/LanguageContext";
import { useTranslation } from "@/lib/translations";
import { MAX_WIDTH } from "@/lib/enums";
import { FooterData } from "@/lib/interfaces/footerData";
import { useAppData } from "@/hooks/AppDataContext";
import ExtendedText from "@/components/ExtendedText";
import FullPageLoader from "@/components/FullPageLoader";
import { getLocaleString, type LocaleString } from "@/lib/utility";
import { useThemeColors } from "@/components/fontVars";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { PageContainer } from "@/components/PageContainer";

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

  return (
    <footer style={{ marginTop: "auto" }}>
      <Flex w="100%" bgColor={bgColor} justifyContent="center">
        <PageContainer
          contentWidth={MAX_WIDTH.XL}
          gutter={{ base: 6, md: 10 }}
          color="white"
        >
          <Flex
            w="full"
            py={{ base: 4, md: 5 }}
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={{ base: 3, md: 5 }}
          >
            <Box flex="1" display="flex" justifyContent={{ base: "center", md: "flex-start" }} minW={0}>
              <Link href="/" aria-label="Chao Phraya home">
                <ImageWithSkeleton
                  src={footerData.logoUrl || "/logo.png"}
                  alt="Chao Phraya logo"
                  containerProps={{ width: 145, height: 76, maxWidth: "100%" }}
                  imageProps={{ objectFit: "contain", loading: "lazy" }}
                />
              </Link>
            </Box>

            <Text
              flex="1"
              textAlign="center"
              fontSize="sm"
              opacity={0.75}
              whiteSpace="nowrap"
              order={{ base: 3, md: 2 }}
            >
              {getText(footerData.copyright)}
            </Text>

            <Box flex="1" order={{ base: 2, md: 3 }}>
              <Text
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="0.08em"
                textTransform="uppercase"
                textAlign={{ base: "center", md: "right" }}
                opacity={0.75}
                mb={2}
              >
                {t("footer.followUs")}
              </Text>
            <HStack gap={2} justify={{ base: "center", md: "flex-end" }}>
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
                    <Flex
                      as="span"
                      align="center"
                      gap={2}
                      px={3}
                      py={2}
                      borderWidth="1px"
                      borderColor="whiteAlpha.300"
                      borderRadius="md"
                      fontSize="sm"
                      opacity={0.9}
                      _hover={{ bg: "whiteAlpha.100", opacity: 1 }}
                    >
                      <Icon aria-hidden="true" />
                      <Text as="span">{social.platform}</Text>
                    </Flex>
                  </Link>
                );
              })}
            </HStack>
            </Box>
          </Flex>
        </PageContainer>
      </Flex>
    </footer>
  );
}
