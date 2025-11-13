import { Merriweather_Sans, Pacifico, Poppins } from "next/font/google";
import { useColorModeValue } from "./ui/color-mode";

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

export function useThemeColors() {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.900", "white");
  const btnBgColor = useColorModeValue("gray.200", "gray.900");

  return { bgColor, textColor, borderColor, btnBgColor };
}
