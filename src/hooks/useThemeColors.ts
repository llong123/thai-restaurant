import { useColorModeValue } from "@/components/ui/color-mode";

export function useThemeColors() {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.900", "white");
  const btnBgColor = useColorModeValue("gray.200", "gray.900");

  return { bgColor, textColor, borderColor, btnBgColor };
}
