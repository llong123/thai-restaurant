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
import { useTranslation } from "@/lib/translations";
import { ExtendedTextProps, ExtendedHeadingProps } from "@/lib/types";

const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <Flex
        w={"100vw"}
        bgColor={"#111827"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex
          maxW={"6xl"}
          w={"full"}
          color={"white"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          direction={"column"}
        >
          <HStack
            w={"full"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            px={8}
            pt={8}
          >
            <VStack alignSelf={"center"}>
              <ExtendedText className={pacifico.className}>
                Chao Phraya
              </ExtendedText>
            </VStack>
            <VStack alignItems={"start"}>
              <ExtendedHeading>{t('footer.quickLinks')}</ExtendedHeading>
              <Link href={"/"}>{t('navigation.home')}</Link>
              <Link href={"/"}>{t('navigation.menu')}</Link>
              <Link href={"/"}>{t('navigation.about')}</Link>
            </VStack>
            <VStack>
              <ExtendedHeading>{t('footer.followUs')}</ExtendedHeading>
              <HStack>
                <IconButton>
                  <LuFacebook></LuFacebook>
                </IconButton>
                <IconButton>
                  <LuX></LuX>
                </IconButton>
                <IconButton>
                  <LuInstagram></LuInstagram>
                </IconButton>
              </HStack>
            </VStack>
          </HStack>
          <ExtendedText
            width={"full"}
            borderTop={"2px solid #1F2937"}
            py={8}
            mt={8}
            textAlign={"center"}
          >
            {t('footer.copyright')}
          </ExtendedText>
        </Flex>
      </Flex>
    </footer>
  );
}
