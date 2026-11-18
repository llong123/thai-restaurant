"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Stack,
  Text,
  useDisclosure,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { LuChevronRight, LuMenu, LuX, LuChevronsDown } from "react-icons/lu";
import Link from "next/link";
import { merriweather, useThemeColors } from "@/components/fontVars";
import { useLanguage } from "@/hooks/LanguageContext";
import { Language } from "@/lib/types";
import { usePathname } from "next/navigation";
import { NavigationData } from "@/lib/interfaces/navigationData";
import { useAppData } from "@/hooks/AppDataContext";
import { getLocaleString, type LocaleString } from "@/lib/utility";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { BRAND_ORANGE, BRAND_ORANGE_HOVER, BRAND_ORANGE_TEXT } from "@/lib/colors";

const MOBILE_HEADER_HEIGHT = "5rem";

export default function NavigationComponent() {
  const { open, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  const { language, setLanguage } = useLanguage();
  const { bgColor, btnBgColor, borderColor, textColor } = useThemeColors();

  const { navigation, homepage } = useAppData();
  const navData = (navigation ?? null) as NavigationData | null;

  const getText = (field?: LocaleString) => getLocaleString(field, language);
  const announcement = homepage?.alertBanner;
  const announcementText = announcement ? getText(announcement.message).trim() : "";
  const showAnnouncement = Boolean(announcement?.showBanner && announcementText);
  const mobileMenuTop = showAnnouncement ? "8rem" : MOBILE_HEADER_HEIGHT;

  return (
    <Box bg={bgColor} position="sticky" top={0} zIndex={20} w="100%" py={2}>
      <Flex
        maxW="80rem"
        mx="auto"
        h={{ base: 16, md: 20 }}
        align="center"
        justify="space-between"
        gap={{ base: 2, md: 6 }}
        px={{ base: 4, md: 6 }}
      >
        <Box flexShrink={0}>
          <Link href="/" passHref legacyBehavior>
            <Box
              as="a"
              display="inline-block"
              aria-label={navData?.siteTitle || "Home"}
            >
              <Flex align="center" gap={{ base: 2, md: 3 }}>
                <ImageWithSkeleton
                  src={navData?.logoUrl || "/logo.png"}
                  alt={navData?.siteTitle || "Site Logo"}
                  containerProps={{ width: { base: 42, md: 58 }, height: { base: 42, md: 58 } }}
                  imageProps={{ objectFit: "contain", loading: "eager" }}
                />
                <Text
                  fontSize={{ base: "sm", md: "lg" }}
                  fontWeight="bold"
                  letterSpacing="-0.02em"
                  whiteSpace="nowrap"
                  color={textColor}
                >
                  Chao Phraya
                </Text>
              </Flex>
            </Box>
          </Link>
        </Box>

        <HStack
          flex="1"
          justify="flex-end"
          gap={{ base: 1, lg: 3 }}
          align="center"
          display={["none", null, "flex"]}
        >
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
                  px={{ base: 3, lg: 4 }}
                  py={2}
                  rounded="md"
                  fontWeight={isActive ? "bold" : "medium"}
                  bg={isActive ? BRAND_ORANGE : "transparent"}
                  color={isActive ? BRAND_ORANGE_TEXT : textColor}
                  _hover={{
                    bg: isActive ? BRAND_ORANGE_HOVER : btnBgColor,
                    color: isActive ? BRAND_ORANGE_TEXT : textColor,
                    cursor: "pointer",
                  }}
                  fontSize={{ base: "sm", lg: "md" }}
                  whiteSpace="nowrap"
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
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                color={textColor}
                fontWeight="semibold"
                size="sm"
                px={4}
              >
                {language.toUpperCase()}&nbsp;
                <LuChevronsDown />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content
                  minW="9rem"
                  p={1}
                  bg={bgColor}
                  color={textColor}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  boxShadow="xl"
                >
                  {navData?.languages?.map((lang: string) => (
                    <Menu.Item
                      className={merriweather.className}
                      key={lang}
                      value={lang}
                      onClick={() => setLanguage(lang as Language)}
                      bg={language === lang ? BRAND_ORANGE : "transparent"}
                      color={language === lang ? BRAND_ORANGE_TEXT : textColor}
                      borderRadius="md"
                    _hover={{ bg: BRAND_ORANGE_HOVER, color: BRAND_ORANGE_TEXT }}
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
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          display={["flex", null, "none"]}
          onClick={open ? onClose : onOpen}
          variant="ghost"
          flexShrink={0}
          minW="2.75rem"
          h="2.75rem"
          borderRadius="md"
          color={textColor}
          _hover={{ bg: "whiteAlpha.100" }}
        >
          {open ? <LuX /> : <LuMenu />}
        </IconButton>
      </Flex>

      {showAnnouncement && announcement && (
        <Flex
          minH="3rem"
          px={4}
          py={2}
          align="center"
          justify="center"
          textAlign="center"
          bg="#E5484D"
          color="white"
          fontSize={{ base: "lg", md: "2xl" }}
          fontWeight="bold"
          role="status"
        >
          {announcementText}
        </Flex>
      )}

      {/* Mobile menu backdrop */}
      {open && (
        <Box
          position="fixed"
          top={mobileMenuTop}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          zIndex={9}
          onClick={onClose}
        />
      )}

      {/* Mobile menu */}
      <Box
        position="fixed"
        top={mobileMenuTop}
        left={0}
        right={0}
        bg={bgColor}
        shadow="2xl"
        display={["block", null, "none"]}
        zIndex={11}
        maxH={`calc(100dvh - ${mobileMenuTop})`}
        overflowY="auto"
        borderBottomRadius="2xl"
        borderTopWidth="1px"
        borderColor="whiteAlpha.200"
        transform={open ? "translateY(0)" : "translateY(-0.5rem)"}
        opacity={open ? 1 : 0}
        transition="all 0.3s ease-in-out"
        pointerEvents={open ? "auto" : "none"}
        visibility={open ? "visible" : "hidden"}
      >
        <Stack
          gap={2}
          as="nav"
          aria-label="Mobile navigation"
          maxW="32rem"
          mx="auto"
          p={{ base: 4, sm: 5 }}
        >
          <Text
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="0.12em"
            textTransform="uppercase"
            color="whiteAlpha.600"
            px={1}
            pb={1}
          >
            Explore
          </Text>
          {navData?.links?.map((link: any) => {
            const isActive = pathname === link.href;
            return (
              <Link
                className={merriweather.className}
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={onClose}
              >
                <Flex
                  align="center"
                  justify="space-between"
                  minH="3.25rem"
                  px={4}
                  py={3}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={isActive ? "transparent" : "whiteAlpha.200"}
                  bg={isActive ? BRAND_ORANGE : "transparent"}
                  color={isActive ? BRAND_ORANGE_TEXT : textColor}
                  fontWeight={isActive ? "bold" : "medium"}
                  transition="all 160ms ease"
                  _hover={{
                    bg: isActive ? BRAND_ORANGE_HOVER : "whiteAlpha.100",
                    borderColor: isActive ? "transparent" : "whiteAlpha.400",
                  }}
                >
                  <Text fontSize="md">{getText(link.name)}</Text>
                  <LuChevronRight aria-hidden="true" />
                </Flex>
              </Link>
            );
          })}
          {navData?.button && (
            <Link
              className={merriweather.className}
              href={navData.button.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              <Button
                w="full"
                fontWeight={
                  pathname === navData.button.href ? "bold" : "normal"
                }
                bg={BRAND_ORANGE}
                color={BRAND_ORANGE_TEXT}
                borderRadius="md"
                _hover={{ bg: BRAND_ORANGE_HOVER }}
              >
                {getText(navData.button.label)}
              </Button>
            </Link>
          )}
          <Box mt={3} pt={4} borderTopWidth="1px" borderColor="whiteAlpha.200">
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="whiteAlpha.600"
              mb={3}
            >
              Language
            </Text>
            <Flex gap={2}>
              {navData?.languages?.map((lang: string) => {
                const isSelected = language === lang;
                return (
                  <Button
                    key={lang}
                    type="button"
                    flex="1"
                    size="sm"
                    borderRadius="md"
                    aria-pressed={isSelected}
                    variant={isSelected ? "solid" : "outline"}
                    bg={isSelected ? BRAND_ORANGE : "transparent"}
                    color={isSelected ? BRAND_ORANGE_TEXT : textColor}
                    borderColor={isSelected ? "transparent" : "whiteAlpha.300"}
                    _hover={{ bg: BRAND_ORANGE_HOVER, color: BRAND_ORANGE_TEXT, borderColor: "transparent" }}
                    onClick={() => setLanguage(lang as Language)}
                  >
                    {lang.toUpperCase()}
                  </Button>
                );
              })}
            </Flex>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
