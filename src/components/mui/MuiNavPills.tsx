import React, { useState } from 'react';
import { Container, Paper, Tabs, Tab } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import PlaceIcon from '@mui/icons-material/Place';
import ExploreIcon from '@mui/icons-material/Explore';
import MapIcon from '@mui/icons-material/Map';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DescriptionIcon from '@mui/icons-material/Description';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const TABS = [
  { value: 'overview', label: 'Tổng quan', icon: <LanguageIcon fontSize="small" /> },
  { value: 'location', label: 'Vị trí', icon: <PlaceIcon fontSize="small" /> },
  { value: 'phases', label: 'Phân khu', icon: <ExploreIcon fontSize="small" /> },
  { value: 'floorplan', label: 'Mặt bằng quỹ căn', icon: <MapIcon fontSize="small" /> },
  { value: 'units', label: 'Quỹ căn', icon: <ApartmentIcon fontSize="small" /> },
  { value: 'policy', label: 'Chính sách bán hàng', icon: <DescriptionIcon fontSize="small" /> },
  { value: 'news', label: 'Tin tức', icon: <NewspaperIcon fontSize="small" /> },
];

export const MuiNavPills: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('units');

  return (
    <Container maxWidth="xl" sx={{ mt: 2.5 }}>
      <Paper elevation={0} sx={{ p: 1, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
        <Tabs
          value={currentTab}
          onChange={(_, val) => setCurrentTab(val)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 44,
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              borderRadius: 50,
              minHeight: 40,
              py: 0.5,
              px: 2,
              mr: 1,
              fontWeight: 600,
              fontSize: '0.875rem',
              color: '#475569',
              transition: 'all 0.2s',
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: '#ffffff',
                boxShadow: '0 4px 10px rgba(37,99,235,0.25)',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              iconPosition="start"
              label={tab.label}
            />
          ))}
        </Tabs>
      </Paper>
    </Container>
  );
};
