import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    100: "#f9c451",
    200: "#fcae02",
  },
  text: {
    100: "#514f4f",
    200: "#161617",
  },
};

const styles = {
  global: (props) => ({
    body: {
      color: "text.200",
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, colors, styles });

export default theme;
