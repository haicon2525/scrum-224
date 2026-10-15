import React from 'react';
import { Box, Container, Typography, Avatar, Chip, Stack } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useAuth } from '../../contexts/AuthContext';

export const MuiHeader: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <Box sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e2e8f0', py: 1.5 }}>
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              bgcolor: 'primary.main',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BusinessIcon />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main', lineHeight: 1.1 }}>
              BẤT ĐỘNG SẢN
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              VINHOMES PORTAL
            </Typography>
          </Box>
        </Stack>

        {/* Center Title Badge */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Chip
            label="GIỚI THIỆU DỰ ÁN"
            variant="outlined"
            color="primary"
            sx={{ fontWeight: 700, letterSpacing: 1, fontSize: '0.75rem', px: 1 }}
          />
        </Box>

        {/* Online Status & User Profile */}
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Chip
            icon={<FiberManualRecordIcon color="success" sx={{ fontSize: '12px !important' }} />}
            label="100 người đang Online"
            size="small"
            sx={{ bgcolor: '#f1f5f9', fontWeight: 500, fontSize: '0.8rem', color: '#475569' }}
          />

          <Avatar
            alt={user?.name || 'User'}
            src={user?.avatar}
            sx={{
              width: 38,
              height: 38,
              bgcolor: isAuthenticated ? 'primary.main' : '#94a3b8',
              cursor: 'pointer',
              border: '2px solid #e2e8f0',
            }}
          >
            {user?.name ? user.name[0] : 'U'}
          </Avatar>
        </Stack>
      </Container>
    </Box>
  );
};
