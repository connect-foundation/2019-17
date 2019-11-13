import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "./style/theme";
import GlobalStyles from "./style/globalStyles";
import Book from "./components/Book";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Book />
    </ThemeProvider>
  );
};

export default App;
