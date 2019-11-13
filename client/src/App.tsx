import React from "react";
import styled, { ThemeProvider } from "styled-components";

import theme from "./style/theme";
import GlobalStyles from "./style/globalStyles";

const Text = styled.span`
  color: ${props => props.theme.facebookBlue};
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Text>hello boostbook!</Text>
    </ThemeProvider>
  );
};

export default App;
