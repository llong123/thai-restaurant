import { Flex } from "@chakra-ui/react";
import { ExtendedFlexProps } from "@/lib/types";
import { useThemeColors } from "./fontVars";
import ExtendedHeading from "./ExtendedHeading";
import ExtendedText from "./ExtendedText";

const ExtendedFlex = Flex as React.ComponentType<ExtendedFlexProps>;

export default function SectionComponent({
  children,
  headingTitle,
  description,
}: {
  children: React.ReactNode;
  headingTitle: string;
  description: string;
}) {
  const { bgColor, textColor } = useThemeColors();

  return (
    <Flex
      width={"100vw"}
      alignItems={"center"}
      justifyContent={"center"}
      bgColor={bgColor}
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
        <ExtendedHeading pb={1} color={textColor}>
          {headingTitle}
        </ExtendedHeading>
        <ExtendedText
          fontSize={{ base: 10, lg: 12 }}
          fontStyle="italic"
          pb={12}
          maxW={"2xl"}
          color={textColor}
        >
          {description}
        </ExtendedText>
        {children}
      </ExtendedFlex>
    </Flex>
  );
}
