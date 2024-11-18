import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import { theme } from "./theme";
import { App } from "./App";

import "./index.scss";

function HomePage() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  );
}

export default HomePage;
