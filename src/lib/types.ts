import {
  TextProps,
  HeadingProps,
  ButtonProps,
  FlexProps,
} from "@chakra-ui/react";

export type TranslationKey = string;

export type ExtendedTextProps = TextProps & {
  children: React.ReactNode;
  className?: string;
  width?: string;
  borderTop?: string;
  py?: number;
  mt?: number;
  textAlign?: string;
  fontSize?: number | { base: number; lg: number };
  pl?: number | { base: number; lg: number };
  pb?: number | { base: number; lg: number };
  color?: string;
  textStyle?: string;
  maxW?: string | { base: string; lg: string };
  w?: string | { base: string; lg: string };
};

export type ExtendedHeadingProps = HeadingProps & {
  children: React.ReactNode;
  className?: string;
  size?: string | { base: string; lg: string };
  w?: string | { base: string; lg: string };
  pb?: number | { base: number; lg: number };
};

export type ExtendedButtonProps = ButtonProps & {
  children: React.ReactNode;
  size?: string;
  mt?: number | { base: number; lg: number };
};

export type ExtendedFlexProps = FlexProps & {
  direction?: string | { base: string; lg: string };
  paddingX?: number | { base: number; lg: number };
  maxW?: string | { base: string; lg: string };
  w?: string | { base: string; lg: string };
  gap?: number | string;
  alignItems?: string;
  justifyContent?: string;
  marginLeft?: string;
  marginRight?: string;
  flexBasis?: string;
  textAlign?: string;
};

export type Language = "en" | "fi" | "sv";
