'use client';

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
import { useTranslation } from "@/lib/translations";
import { pacifico } from "@/components/fontVars";
import { ExtendedHeadingProps, ExtendedButtonProps, ExtendedFlexProps } from "@/lib/types";
import { useColorModeValue } from "@/components/ui/color-mode";

const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;
const ExtendedButton = Button as React.ComponentType<ExtendedButtonProps>;
const ExtendedFlex = Flex as React.ComponentType<ExtendedFlexProps>;

const NavLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const hoverBg = useColorModeValue("gray.200", "gray.700");
  
  return (
    <Link href={href} passHref>
      <Box
        px={2}
        py={1}
        rounded="md"
        _hover={{
          textDecoration: "none",
          bg: hoverBg,
        }}
      >
        {children}
      </Box>
    </Link>
  );
};

export default function Navigation() {
  const { open, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const bgColor = useColorModeValue('white', 'gray.900');
  const menuBgColor = useColorModeValue('white', 'gray.800');

  const links = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.menu'), href: '/menu' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.location'), href: '/location' },
  ];

  return (
    <Box bg={bgColor} position="sticky" top={0} zIndex={10} shadow="md" w="100vw">
      <ExtendedFlex h={16} alignItems="center" justifyContent="space-between" px={4}>
        <ExtendedHeading
          size={{ base: "2xl", lg: "4xl" }}
          className={pacifico.className}
        >
          Chao Phraya
        </ExtendedHeading>
        <HStack gap={8} alignItems="center" display={["none", null, "flex"]}>
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.name}</NavLink>
          ))}
          <ExtendedButton>{t('navigation.reserve')}</ExtendedButton>
        </HStack>
        <IconButton
          aria-label="Open Menu"
          display={["flex", null, "none"]}
          onClick={open ? onClose : onOpen}
        >
          {open ? <LuX /> : <LuMenu />}
        </IconButton>
      </ExtendedFlex>

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
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.name}</NavLink>
          ))}
          <ExtendedButton w="full">{t('navigation.reserve')}</ExtendedButton>
        </Stack>
      </Box>
    </Box>
  );
} 