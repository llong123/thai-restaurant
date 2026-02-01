"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Stack,
  Image,
  useDisclosure,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { LuMenu, LuX, LuChevronsDown } from "react-icons/lu";
import Link from "next/link";
import { merriweather, useThemeColors } from "@/components/fontVars";
import { useLanguage } from "@/hooks/LanguageContext";
import { Language } from "@/lib/types";
import { usePathname } from "next/navigation";
import { NavigationData } from "@/lib/interfaces/navigationData";
import { useAppData } from "@/hooks/AppDataContext";
import { getLocaleString, type LocaleString } from "@/lib/utility";

export default function NavigationComponent() {
  const { open, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  const { language, setLanguage } = useLanguage();
  const { bgColor, btnBgColor } = useThemeColors();

  const { navigation } = useAppData();
  const navData = (navigation ?? null) as NavigationData | null;

  const getText = (field?: LocaleString) =>
    getLocaleString(field, language);

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
        <Box>
          <Link href="/" passHref legacyBehavior>
            <Box
              as="a"
              display="inline-block"
              aria-label={navData?.siteTitle || "Home"}
              px={8}
            >
              <Image
                src={"/logo.png"}
                alt={navData?.siteTitle || "Site Logo"}
                width={100}
                height={40}
                style={{ objectFit: "contain", display: "block" }}
              />
            </Box>
          </Link>
        </Box>

        <HStack gap={8} align="center" display={["none", null, "flex"]}>
          {navData?.links?.map((link: any) => {
            const isActive = pathname === link.href; // check if current page
            return (
              <Link
                className={merriweather.className}
                key={link.href}
                href={link.href}
                passHref
              >
                <Box
                  px={4}
                  py={2}
                  rounded="md"
                  fontWeight={isActive ? "bold" : "normal"} // bold for active page
                  bg={isActive ? btnBgColor : "transparent"} // subtle background for active
                  _hover={{
                    bg: btnBgColor,
                    cursor: "pointer",
                  }}
                  fontSize={{ base: "sm", lg: "md" }}
                >
                  {getText(link.name)}
                </Box>
              </Link>
            );
          })}
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                variant="outline"
                border="white"
                borderWidth={2}
                borderStyle={"solid"}
                size="sm"
              >
                {language.toUpperCase()}&nbsp;
                <LuChevronsDown />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {navData?.languages?.map((lang: string) => (
                    <Menu.Item
                      className={merriweather.className}
                      key={lang}
                      value={lang}
                      onClick={() => setLanguage(lang as Language)}
                      _hover={{ bg: "white", color: "gray.800" }}
                    >
                      {lang.toUpperCase()}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          {/* {navData?.button && (
            <Link
              className={merriweather.className}
              href={navData.button.href}
              passHref
              legacyBehavior
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                as="a"
                className={merriweather.className}
                fontWeight={
                  pathname === navData.button.href ? "bold" : "normal"
                }
              >
                {getText(navData.button.label)}
              </Button>
            </Link>
          )} */}
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
        bg={bgColor}
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
              <Link
                className={merriweather.className}
                key={link.href}
                href={link.href}
                passHref
              >
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
                  {getText(link.name)}
                </Box>
              </Link>
            );
          })}
          {navData?.button && (
            <Link
              className={merriweather.className}
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
                {getText(navData.button.label)}
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
