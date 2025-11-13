"use client";

import { Flex, HStack, VStack, Image, IconButton, Box } from "@chakra-ui/react";
import Link from "next/link";
import { LuFacebook, LuInstagram, LuX } from "react-icons/lu";
import { useLanguage } from "@/hooks/LanguageContext";
import { LocaleString } from "@/lib/interfaces";
import { useTranslation } from "@/lib/translations";
import { MAX_WIDTH } from "@/lib/enums";
import { FooterData } from "@/lib/interfaces/footerData";
import { useAppData } from "@/hooks/AppDataContext";
import ExtendedHeading from "@/components/ExtendedHeading";
import ExtendedText from "@/components/ExtendedText";
import FullPageLoader from "@/components/FullPageLoader";

export default function Footer() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  // use centralized app data
  const { footer, loading } = useAppData();
  const footerData = (footer ?? null) as FooterData | null;

  const getLocale = (field?: LocaleString) =>
    field?.[language] || field?.en || "";

  if (loading) return <FullPageLoader message={t("loading")} />;
  if (!footerData)
    return <ExtendedText p={8}>Footer data not available.</ExtendedText>;

  if (!footerData.quickLinks && !footerData.followUs)
    return <ExtendedText p={8}>Footer data not available.</ExtendedText>;

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
            <Box>
              <Link href="/" passHref legacyBehavior>
                <Box
                  as="a"
                  display="inline-block"
                  aria-label={"Chao Phraya Helsinki"}
                  px={8}
                >
                  <Image
                    src={"/logo.png"}
                    alt={"Chao Phraya Helsinki Logo"}
                    width={160}
                    height={40}
                    style={{ objectFit: "contain", display: "block" }}
                  />
                </Box>
              </Link>
            </Box>

            {/* Quick Links */}
            {footerData.quickLinks && (
              <VStack alignItems="start">
                <ExtendedHeading as={"h4"}>Quick Links</ExtendedHeading>
                {footerData.quickLinks?.map((link, index) => (
                  <Link key={index} href={link.url}>
                    {getLocale(link.label)}
                  </Link>
                ))}
              </VStack>
            )}

            {/* Social Links */}
            <VStack>
              <ExtendedHeading as={"h6"} size={{ base: "md", lg: "xl" }}>
                {t("footer.followUs")}
              </ExtendedHeading>
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
