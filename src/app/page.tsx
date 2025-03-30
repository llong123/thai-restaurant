import {
  VStack,
  Flex,
  Heading,
  AspectRatio,
  Text,
  Button,
  HStack,
  Link,
} from "@chakra-ui/react";
import Dish from "@/components/dish";
import Footer from "./footer";
import SectionComponent from "@/components/section";
import { pacifico } from "@/components/fontVars";
import Image from "next/image";

export default async function Page() {
  const maxWidth = "8xl";
  return (
    <VStack maxW={maxWidth} mx="auto" gap={0}>
      {/* Header */}
      <HStack
        position={"sticky"}
        top={0}
        bgColor={"Background"}
        zIndex={10}
        w={"100vw"}
        height={"5vh"}
        justifyContent={"center"}
        shadow={"md"}
      >
        <Flex
          maxW={maxWidth}
          w={"100%"}
          paddingX={{ base: 4, lg: 16 }}
          gap={4}
          alignItems={"center"}
        >
          <Heading
            size={{ base: "2xl", lg: "4xl" }}
            className={pacifico.className}
          >
            Chao Phraya
          </Heading>
          <Flex
            marginLeft={"auto"}
            marginRight={"auto"}
            gap={8}
            justifyContent={"center"}
          >
            <Link>Home</Link>
            <Link>Menu</Link>
            <Link>About</Link>
            <Link>Location</Link>
          </Flex>
          <Button>Reserve a table</Button>
        </Flex>
      </HStack>

      {/* Hero Section */}
      <VStack
        backgroundImage={
          "linear-gradient(to right, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0) 70%),url('https://thumbor.thebear.group/unsafe/1110x555/https://directus-deskthebear.s3.ap-southeast-1.amazonaws.com/uploads/7481fb8c-94a9-4d50-9db7-08092b7b4b62.jpeg')"
        }
        backgroundSize={"cover"}
        width={"100vw"}
        h={"fit-content"}
        alignItems={"center"}
        justifyContent={"center"}
        paddingX={16}
        color={"white"}
      >
        <Flex direction={"column"} maxW={maxWidth} gap={4} py={32}>
          <Heading size={{ base: "2xl", lg: "4xl" }} w={"50%"}>
            Experience Authentic Thai Cuisine in Helsinki
          </Heading>
          <Text fontSize={{ base: "md", lg: "xl" }} w={"50%"}>
            Discover the perfect blend of traditional flavors and modern dining
            at Chao Phraya. Every dish tells a story of Thailand's rich culinary
            heritage.
          </Text>
          <Flex gap={4}>
            <Button size={"lg"}>View Menu</Button>
            <Button size={"lg"}>Book a table</Button>
          </Flex>
        </Flex>
      </VStack>

      {/* Popular dishes */}
      <SectionComponent
        darkBg
        headingTitle="Our Signature Dishes"
        description="Savor the authentic flavors of Thailand with our carefully curated selection of dishes, prepared by our master chefs using traditional recipes and the finest ingredients."
      >
        <Flex gap={4}>
          <Dish name="Pad Thai" />
          <Dish name="Tom Yum Goong" />
          <Dish name="Som Tum" />
        </Flex>
        <Button mt={8}>View Full Menu</Button>
      </SectionComponent>

      <SectionComponent headingTitle="About Us" description="">
        <HStack>
          <Flex direction={"column"} maxW={maxWidth} gap={4} py={32}>
            <Heading size={{ base: "2xl", lg: "4xl" }} w={"50%"}>
              Experience Authentic Thai Cuisine in Helsinki
            </Heading>
            <Text fontSize={{ base: "md", lg: "xl" }} w={"50%"}>
              Discover the perfect blend of traditional flavors and modern
              dining at Chao Phraya. Every dish tells a story of Thailand's rich
              culinary heritage.
            </Text>
          </Flex>

          <Image
            src={""}
            alt="About us restaurant image"
            width={500}
            height={100}
          />
        </HStack>
      </SectionComponent>

      {/* Our Menu */}
      <SectionComponent
        headingTitle="Our Menu"
        description="Explore our extensive selection of authentic Thai dishes"
      >
        <Flex gap="2" wrap="wrap" justify="center">
          <Dish name="Pad Thai" />
          <Dish name="Tom Yum Goong" />
          <Dish name="Som Tum" />
          <Dish name="Larb" />
          <Dish name="Massaman Curry" />
          <Dish name="Khao Pad" />
        </Flex>
      </SectionComponent>

      {/* Find Us */}
      <SectionComponent
        darkBg
        headingTitle="Visit Us"
        description="Located in the heart of Helsinki, we're easily accessible from all major locations."
      >
        <Flex
          maxW={maxWidth}
          width={"100%"}
          gap={16}
          paddingX={8}
          direction={{ base: "column-reverse", lg: "row" }}
        >
          <AspectRatio
            borderRadius={16}
            overflow={"hidden"}
            width={"100%"}
            maxH={"300px"}
            ratio={1 / 1}
            flexBasis={"50%"}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.9515746665063!2d24.952672178088346!3d60.18153377503828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920bd5bc995bc1%3A0x785b19e065883db0!2sH%C3%A4meentie%207%2C%2000530%20Helsinki!5e0!3m2!1sfi!2sfi!4v1742577370577!5m2!1sfi!2sfi"
              width="600"
              height="200"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </AspectRatio>
          <Flex direction="column" flexBasis={"50%"} textAlign={"left"}>
            <Heading size="lg">Address</Heading>
            <Text pl={4} pb={4} color={"gray.500"}>
              Hämeentie 7, 00530 Helsinki
            </Text>
            <Heading size="lg">From Helsinki Airport</Heading>
            <Text>
              Take the Ring Rail Line to Helsinki Central Station, then tram 4
              or 10 to Mannerheimintie stop.
            </Text>
            <Heading size="lg">From Central Railway Station</Heading>
            <Text>10 minutes walk or take tram 4, 7, or 10 for two stops.</Text>
            <Heading size="lg">Opening Hours</Heading>
            <Text>Monday - Friday: 11:00 - 22:00</Text>
            <Text>Saturday: 12:00 - 23:00</Text>
            <Text>Sunday: 12:00 - 21:00</Text>
          </Flex>
        </Flex>
      </SectionComponent>
      <Footer />
    </VStack>
  );
}
