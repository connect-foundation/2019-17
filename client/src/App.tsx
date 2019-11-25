import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import theme from './style/theme';
import GlobalStyles from './style/globalStyles';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Login />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
