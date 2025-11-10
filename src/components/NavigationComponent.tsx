"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Stack,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { LuMenu, LuX } from "react-icons/lu";
import Link from "next/link";
import { pacifico } from "@/components/fontVars";
import { useColorModeValue } from "@/components/ui/color-mode";
import { LocaleString } from "@/lib/interfaces";
import { useLanguage } from "@/hooks/LanguageContext";
import { Language } from "@/lib/types";
import { usePathname } from "next/navigation";
import { NavigationData } from "@/lib/interfaces/navigationData";
import { useAppData } from "@/hooks/AppDataContext";

export default function NavigationComponent() {
  const { open, onOpen, onClose } = useDisclosure();
  const pathname = usePathname(); // get current URL path
  const bgColor = useColorModeValue("white", "gray.900");
  const menuBgColor = useColorModeValue("white", "gray.800");

  const { language, setLanguage } = useLanguage();

  // use centralized app data
  const { navigation } = useAppData();
  const navData = (navigation ?? null) as NavigationData | null;

  // Utility for localized strings
  const getLocaleString = (field?: LocaleString) =>
    field?.[language as keyof LocaleString] || field?.en || "";

  return (
    <Box
      bg={bgColor}
      position="sticky"
      top={0}
      zIndex={10}
      shadow={{ base: "md", xl: "none" }}
      w="100%"
      py={2}
    >
      <Flex h={16} align="center" justify="space-between" px={4}>
        <Heading
          size={{ base: "2xl", lg: "4xl" }}
          className={pacifico.className}
        >
          {navData?.siteTitle || "Site Title"}
        </Heading>

        <HStack gap={8} align="center" display={["none", null, "flex"]}>
          <Box>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "1px solid #ccc",
                background: "white",
              }}
            >
              {navData?.languages?.map((lang: string) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </Box>

          {navData?.links?.map((link: any) => {
            const isActive = pathname === link.href; // check if current page
            return (
              <Link key={link.href} href={link.href} passHref>
                <Box
                  px={2}
                  py={1}
                  rounded="md"
                  fontWeight={isActive ? "bold" : "normal"} // bold for active page
                  bg={isActive ? "gray.200" : "transparent"} // subtle background for active
                  _hover={{
                    fontWeight: "bold", // bold on hover
                    bg: "gray.100",
                    cursor: "pointer",
                  }}
                >
                  {getLocaleString(link.name)}
                </Box>
              </Link>
            );
          })}

          {navData?.button && (
            <Link
              href={navData.button.href}
              passHref
              legacyBehavior
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                as="a"
                fontWeight={
                  pathname === navData.button.href ? "bold" : "normal"
                }
              >
                {getLocaleString(navData.button.label)}
              </Button>
            </Link>
          )}
        </HStack>

        <IconButton
          aria-label="Open Menu"
          display={["flex", null, "none"]}
          onClick={open ? onClose : onOpen}
        >
          {open ? <LuX /> : <LuMenu />}
        </IconButton>
      </Flex>

      {/* Mobile menu */}
      <Box
        position="fixed"
        top="64px"
        left={0}
        right={0}
        bg={menuBgColor}
        shadow="lg"
        display={["block", null, "none"]}
        zIndex={10}
        transform={open ? "translateY(0)" : "translateY(-100%)"}
        opacity={open ? 1 : 0}
        transition="all 0.3s ease-in-out"
        pointerEvents={open ? "auto" : "none"}
      >
        <Stack gap={4} as="nav" p={4}>
          {navData?.links?.map((link: any) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} passHref>
                <Box
                  px={2}
                  py={1}
                  rounded="md"
                  fontWeight={isActive ? "bold" : "normal"}
                  bg={isActive ? "gray.200" : "transparent"}
                  _hover={{
                    fontWeight: "bold",
                    bg: "gray.100",
                    cursor: "pointer",
                  }}
                >
                  {getLocaleString(link.name)}
                </Box>
              </Link>
            );
          })}
          {navData?.button && (
            <Link
              href={navData.button.href}
              passHref
              legacyBehavior
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                as="a"
                fontWeight={
                  pathname === navData.button.href ? "bold" : "normal"
                }
              >
                {getLocaleString(navData.button.label)}
              </Button>
            </Link>
          )}
          <Box>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "1px solid #ccc",
                background: "white",
              }}
            >
              {navData?.languages?.map((lang: string) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}