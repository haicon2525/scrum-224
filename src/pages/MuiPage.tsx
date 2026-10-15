import React, { useState, useEffect, useCallback } from 'react';
import { Box, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { unitApi } from '../api/unitApi';
import type { UnitItem, UnitSearchParams } from '../types/unit';
import { MuiHeader } from '../components/mui/MuiHeader';
import { MuiHeroBanner } from '../components/mui/MuiHeroBanner';
import { MuiNavPills } from '../components/mui/MuiNavPills';
import { MuiUnitFilter } from '../components/mui/MuiUnitFilter';
import { MuiUnitTable } from '../components/mui/MuiUnitTable';
import { MuiFooter } from '../components/mui/MuiFooter';
import { AuthGuardModal } from '../components/common/AuthGuardModal';

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
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [units, setUnits] = useState<UnitItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [filterParams, setFilterParams] = useState<UnitSearchParams>({
    sort: 'isHot:desc,createdAt:desc',
    page: 1,
    pageSize: 10,
  });

  const fetchUnits = useCallback(async (params: UnitSearchParams) => {
    setIsLoading(true);
    try {
      const response = await unitApi.search(params);
      setUnits(response.data);
      setPage(response.page);
      setTotalPages(response.totalPages);
      setTotal(response.total);
    } catch (err) {
      console.error('Error fetching units:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Only trigger API when authenticated! (Auth Guard requirement)
  useEffect(() => {
    if (isAuthenticated) {
      fetchUnits(filterParams);
    }
  }, [isAuthenticated, filterParams, fetchUnits]);

  const handleSearch = (newParams: UnitSearchParams) => {
    const updated = {
      ...filterParams,
      ...newParams,
      page: newParams.page || 1,
    };
    setFilterParams(updated);
  };

  const handlePageChange = (newPage: number) => {
    const updated = {
      ...filterParams,
      page: newPage,
    };
    setFilterParams(updated);
  };

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
          <MuiUnitFilter onSearch={handleSearch} isLoading={isLoading} />
          <MuiUnitTable
            units={units}
            isLoading={isLoading}
            page={page}
            totalPages={totalPages}
            total={total}
            onPageChange={handlePageChange}
          />
        </Box>

        <MuiFooter />

        {/* Auth Guard Modal with background blur */}
        {!isAuthLoading && !isAuthenticated && <AuthGuardModal />}
      </Box>
    </ThemeProvider>
  );
};

export default MuiPage;
