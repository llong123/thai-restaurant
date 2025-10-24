"use client";

import { Box, BoxProps } from "@chakra-ui/react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ReactNode } from "react";

interface AnimatedSectionProps extends BoxProps {
  children: ReactNode;
  animation?: "fadeIn" | "slideUp" | "slideInLeft" | "slideInRight";
  delay?: number;
}

export default function AnimatedSection({
  children,
  animation = "fadeIn",
  delay = 0,
  ...props
}: AnimatedSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation();

  const getAnimationStyle = () => {
    if (!isVisible) {
      switch (animation) {
        case "fadeIn":
          return { opacity: 0 };
        case "slideUp":
          return { opacity: 0, transform: "translateY(50px)" };
        case "slideInLeft":
          return { opacity: 0, transform: "translateX(-50px)" };
        case "slideInRight":
          return { opacity: 0, transform: "translateX(50px)" };
        default:
          return { opacity: 0 };
      }
    }

    return {
      opacity: 1,
      transform: "translate(0, 0)",
      transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
    };
  };

  return (
    <Box ref={elementRef as any} {...getAnimationStyle()} {...props}>
      {children}
    </Box>
  );
}
