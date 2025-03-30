import { createSystem, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    colors: {
      brand: {
        500: "tomato",
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
