import { Flex, Text, Heading } from "@chakra-ui/react";
import { ExtendedTextProps, ExtendedHeadingProps, ExtendedFlexProps } from "@/lib/types";

const ExtendedText = Text as React.ComponentType<ExtendedTextProps>;
const ExtendedHeading = Heading as React.ComponentType<ExtendedHeadingProps>;
const ExtendedFlex = Flex as React.ComponentType<ExtendedFlexProps>;

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
      <ExtendedFlex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        textAlign={"center"}
        width={"100%"}
        maxW={"6xl"}
        py={16}
      >
        <ExtendedHeading size={"4xl"} pb={1}>
          {headingTitle}
        </ExtendedHeading>
        <ExtendedText textStyle={"sm"} pb={12} maxW={"2xl"} color={"gray.600"}>
          {description}
        </ExtendedText>
        {children}
      </ExtendedFlex>
    </Flex>
  );
}
