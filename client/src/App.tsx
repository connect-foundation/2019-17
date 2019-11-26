import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import theme from './style/theme';
import GlobalStyles from './style/globalStyles';
import LoginRoutes from './pages/Routes/LoginRoutes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <LoginRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
