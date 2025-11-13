import React from "react";
import { Heading } from "@chakra-ui/react";
import type { ExtendedHeadingProps } from "@/lib/types";
import { poppins } from "./fontVars";

// Default responsive sizes — can be overridden via props
const DEFAULT_SIZE: ExtendedHeadingProps["size"] = { base: "2xl", lg: "4xl" };

export default function ExtendedHeading({
  size = DEFAULT_SIZE,
  children,
  ...rest
}: ExtendedHeadingProps) {
  return (
    <Heading className={poppins.className} size={size as any} {...rest}>
      {children}
    </Heading>
  );
}
