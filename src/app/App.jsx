import React from 'react';
import { ThemeProvider } from '@mui/material';

import theme from 'styles/mui/generalCustomTheme';
import AppRoutes from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
