import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "./style/theme";
import GlobalStyles from "./style/globalStyles";
import SignUpContainer from "./pages/SignUp";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SignUpContainer />
    </ThemeProvider>
  );
};

export default App;
