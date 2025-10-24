"use client";

import {
  Flex,
  Text,
  HStack,
  VStack,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuFacebook, LuInstagram, LuX } from "react-icons/lu";
import { pacifico } from "@/components/fontVars";
import { ExtendedTextProps, ExtendedHeadingProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/LanguageContext";
import { LocaleString } from "@/lib/interfaces";
import { useTranslation } from "@/lib/translations";
import { MAX_WIDTH } from "@/lib/enums";
import { FooterData } from "@/lib/interfaces/footerData";

const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;

export default function Footer() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    async function fetchFooter() {
      const res = await fetch("/api/footer");
      const data: FooterData = await res.json();
      setFooterData(data);
    }

    fetchFooter();
  }, []);
  const getLocale = (field?: LocaleString) =>
    field?.[language] || field?.en || "";

  if (!footerData) return <Text p={8}>Loading Footer...</Text>;

  if (!footerData.quickLinks && !footerData.followUs)
    return <Text p={8}>Footer data not available.</Text>;

  return (
    <footer>
      <Flex
        w="100vw"
        bgColor="#111827"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          maxW={MAX_WIDTH.XL}
          w="full"
          color="white"
          justifyContent="center"
          alignItems="flex-start"
          direction="column"
        >
          <HStack
            w="full"
            alignItems="flex-start"
            justifyContent="space-between"
            px={16}
            pt={8}
          >
            {/* Logo */}
            <VStack alignSelf="center">
              <ExtendedText className={pacifico.className}>
                Chao Phraya
              </ExtendedText>
            </VStack>

            {/* Quick Links */}
            {footerData.quickLinks && (
              <VStack alignItems="start">
                <ExtendedHeading>Quick Links</ExtendedHeading>
                {footerData.quickLinks?.map((link, index) => (
                  <Link key={index} href={link.url}>
                    {getLocale(link.label)}
                  </Link>
                ))}
              </VStack>
            )}

            {/* Social Links */}
            <VStack>
              <ExtendedHeading>{t("footer.followUs")}</ExtendedHeading>
              <HStack>
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
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconButton
                        aria-label={social.platform}
                        variant="ghost"
                        color="white"
                      >
                        <Icon />
                      </IconButton>
                    </Link>
                  );
                })}
              </HStack>
            </VStack>
          </HStack>

          {/* Copyright */}
          <ExtendedText
            width="full"
            borderTop="2px solid #1F2937"
            py={8}
            mt={8}
            textAlign="center"
          >
            {getLocale(footerData.copyright)}
          </ExtendedText>
        </Flex>
      </Flex>
    </footer>
  );
}
