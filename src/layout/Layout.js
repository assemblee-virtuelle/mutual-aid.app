import React from 'react';
import { Notification } from 'react-admin';
import { Box, ThemeProvider } from '@mui/material';
import AppBar from './AppBar';
import TopAppBar from './TopAppBar';
import ScrollToTop from './ScrollToTop';

const Layout = ({ logout, theme, children, title }) => (
  <ThemeProvider theme={theme}>
    <ScrollToTop />
    <TopAppBar logout={logout} />
    <Box mt={{ xs: 3, sm: 5 }} mb={{ xs: 2, sm: 5 }}>
      <AppBar title={title} />
      {children}
    </Box>
    {/* Required for react-admin optimistic update */}
    <Notification />
  </ThemeProvider>
);

export default Layout;
