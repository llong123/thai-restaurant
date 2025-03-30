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

export default function Footer() {
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
              <Text className={pacifico.className}>Chao Phraya</Text>
            </VStack>
            <VStack alignItems={"start"}>
              <Heading>Quick Links</Heading>
              <Link href={"/"}>Home</Link>
              <Link href={"/"}>Menu</Link>
              <Link href={"/"}>About</Link>
            </VStack>
            <VStack>
              <Heading>Follow us</Heading>
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
          <Text
            width={"full"}
            borderTop={"2px solid #1F2937"}
            py={8}
            mt={8}
            textAlign={"center"}
          >
            © 2025 Chao Phraya. All rights reserved.
          </Text>
        </Flex>
      </Flex>
    </footer>
  );
}
