import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './style/theme';
import GlobalStyles from './style/globalStyles';
import WritingFeed from './container/WritingFeed';
import Feed from './pages/feed';

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
