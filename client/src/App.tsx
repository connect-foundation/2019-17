import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './style/theme';
import GlobalStyles from './style/globalStyles';
import WritingFeed from './components/WritingFeed';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <WritingFeed />
    </ThemeProvider>
  );
};

export default App;
