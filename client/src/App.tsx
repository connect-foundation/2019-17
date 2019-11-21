import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "./style/theme";
import GlobalStyles from "./style/globalStyles";
import Book from "./components/Book";
import Header from "./components/Header";
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Book />
    </ThemeProvider>
  );
};

export default App;
