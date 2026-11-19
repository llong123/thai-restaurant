"use client";

import { Button } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";
import { useThemeColors } from "@/components/fontVars";
import { BRAND_ORANGE, BRAND_ORANGE_HOVER, BRAND_ORANGE_TEXT } from "@/lib/colors";

type ButtonAppearance = "primary" | "outline";

interface ActionButtonProps extends Omit<ComponentProps<typeof Button>, "children"> {
  children: ReactNode;
  appearance?: ButtonAppearance;
}

export function ActionButton({
  children,
  appearance = "primary",
  ...props
}: ActionButtonProps) {
  const { btnBgColor, borderColor, textColor } = useThemeColors();
  const isPrimary = appearance === "primary";

  return (
    <Button
      borderRadius="md"
      fontWeight="semibold"
      gap={2}
      bg={isPrimary ? BRAND_ORANGE : "transparent"}
      color={isPrimary ? BRAND_ORANGE_TEXT : textColor}
      borderWidth={isPrimary ? 0 : "1px"}
      borderColor={isPrimary ? "transparent" : borderColor}
      transition="all 160ms ease"
      _hover={{
        bg: isPrimary ? BRAND_ORANGE_HOVER : btnBgColor,
        transform: "translateY(-1px)",
      }}
      _active={{ transform: "translateY(0)" }}
      {...props}
    >
      {children}
    </Button>
  );
}
