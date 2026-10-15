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
  { value: 'overview', label: 'Tổng quan', icon: <LanguageIcon sx={{ fontSize: '16px !important' }} /> },
  { value: 'location', label: 'Vị trí', icon: <PlaceIcon sx={{ fontSize: '16px !important' }} /> },
  { value: 'phases', label: 'Phân khu', icon: <ExploreIcon sx={{ fontSize: '16px !important' }} /> },
  { value: 'floorplan', label: 'Mặt bằng quỹ căn', icon: <MapIcon sx={{ fontSize: '16px !important' }} /> },
  { value: 'units', label: 'Quỹ căn', icon: <ApartmentIcon sx={{ fontSize: '16px !important' }} /> },
  { value: 'policy', label: 'Chính sách bán hàng', icon: <DescriptionIcon sx={{ fontSize: '16px !important' }} /> },
  { value: 'news', label: 'Tin tức', icon: <NewspaperIcon sx={{ fontSize: '16px !important' }} /> },
];

export const MuiNavPills: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('units');

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper
        elevation={0}
        sx={{
          p: 0.6,
          borderRadius: 3,
          background: 'linear-gradient(90deg, #1e40af 0%, #0369a1 100%)',
          boxShadow: '0 2px 8px rgba(3, 105, 161, 0.25)',
        }}
      >
        <Tabs
          value={currentTab}
          onChange={(_, val) => setCurrentTab(val)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 38,
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              borderRadius: 50,
              minHeight: 36,
              py: 0.4,
              px: 1.8,
              mr: 0.5,
              fontWeight: 500,
              fontSize: '0.82rem',
              color: 'rgba(255, 255, 255, 0.85)',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              '&.Mui-selected': {
                bgcolor: '#0284c7',
                color: '#ffffff',
                boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
                fontWeight: 600,
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
