import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "./style/theme";
import GlobalStyles from "./style/globalStyles";
import Book from "./components/Book";
import FeedContainer from "./composition/Feed";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <FeedContainer />
    </ThemeProvider>
  );
};

export default App;
