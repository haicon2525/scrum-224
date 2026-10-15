import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { MuiHeader } from '../components/mui/MuiHeader';
import { MuiHeroBanner } from '../components/mui/MuiHeroBanner';
import { MuiNavPills } from '../components/mui/MuiNavPills';
import { MuiFooter } from '../components/mui/MuiFooter';
import { UnitFilterMUI } from './MuiVersion/UnitFilterMUI';
import { FloorplanView } from './MuiVersion/FloorplanView';

// Dedicated clean MUI theme with custom palette
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#0d6efd',
      dark: '#0b5ed7',
      light: '#3d8bfd',
    },
    secondary: {
      main: '#64748b',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: ['"Be Vietnam Pro"', 'Inter', 'sans-serif'].join(','),
  },
});

export const MuiPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'units';

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default',
          position: 'relative',
        }}
      >
        <MuiHeader />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <MuiHeroBanner />
          <MuiNavPills />

          {/* Conditional View: Floorplan Masterplan vs Unit Search & Filter */}
          {currentTab === 'floorplan' ? (
            <FloorplanView />
          ) : (
            <UnitFilterMUI />
          )}
        </Box>

        <MuiFooter />
      </Box>
    </ThemeProvider>
  );
};

export default MuiPage;
