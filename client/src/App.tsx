import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './style/theme';
import GlobalStyles from './style/globalStyles';
import WritingFeed from './composition/feed/WritingFeed';
import Feed from './composition/feed';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Feed />
      <WritingFeed />
    </ThemeProvider>
  );
};

export default App;
