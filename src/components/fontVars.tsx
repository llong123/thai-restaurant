import { Merriweather_Sans, Pacifico, Poppins } from "next/font/google";
import { useThemeColors as _useThemeColors } from "@/hooks/useThemeColors";

export const pacifico = Pacifico({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
});

export const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const merriweather = Merriweather_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export { _useThemeColors as useThemeColors };
