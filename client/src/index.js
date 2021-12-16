import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./styles.css";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { UserProvider } from "./context/userContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider resetCSS theme={theme}>
        <App />
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
