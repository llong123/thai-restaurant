"use client";

import { Box } from "@chakra-ui/react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  fadeInVariants,
  slideUpVariants,
  slideInLeftVariants,
  slideInRightVariants,
  transitionConfig,
} from "@/lib/animationVariants";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: "fadeIn" | "slideUp" | "slideInLeft" | "slideInRight";
  delay?: number;
  className?: string;
}

const animationMap: Record<string, typeof fadeInVariants> = {
  fadeIn: fadeInVariants,
  slideUp: slideUpVariants,
  slideInLeft: slideInLeftVariants,
  slideInRight: slideInRightVariants,
};

const MotionBox = motion(Box);

export default function AnimatedSection({
  children,
  animation = "fadeIn",
  delay = 0,
  className,
}: AnimatedSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation();
  const variants = animationMap[animation] || fadeInVariants;

  return (
    <MotionBox
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{ ...transitionConfig, delay } as any}
    >
      {children}
    </MotionBox>
  );
}
