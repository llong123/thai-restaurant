import { Flex, Text, Heading } from "@chakra-ui/react";

export default function SectionComponent({
  children,
  headingTitle,
  description,
  darkBg = false,
}: {
  children: React.ReactNode;
  headingTitle: string;
  description: string;
  darkBg?: boolean;
}) {
  return (
    <Flex
      width={"100vw"}
      alignItems={"center"}
      justifyContent={"center"}
      bgColor={darkBg ? "gray.50" : "Background"}
    >
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        textAlign={"center"}
        width={"100%"}
        maxW={"6xl"}
        py={16}
      >
        <Heading size={"4xl"} pb={1}>
          {headingTitle}
        </Heading>
        <Text textStyle={"sm"} pb={12} maxW={"2xl"} color={"gray.600"}>
          {description}
        </Text>
        {children}
      </Flex>
    </Flex>
  );
}
