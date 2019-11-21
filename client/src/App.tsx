import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "./style/theme";
import GlobalStyles from "./style/globalStyles";
import Book from "./components/Book";
import Header from "./components/Header";
import Card from "./components/Card";
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Card></Card>
      <Book />
    </ThemeProvider>
  );
};

export default App;
