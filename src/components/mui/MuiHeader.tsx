import React, { useState } from 'react';
import { Box, Container, Typography, Avatar, Chip, Stack, IconButton, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useAuth } from '../../contexts/AuthContext';

export const MuiHeader: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e2e8f0', py: 1.2, position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <Container maxWidth="xl">
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo 3 bars */}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <rect x="4" y="14" width="6" height="16" rx="3" fill="#1e40af" />
              <rect x="13" y="6" width="6" height="24" rx="3" fill="#2563eb" />
              <rect x="22" y="10" width="7" height="20" rx="3.5" fill="#0ea5e9" />
            </svg>
          </Box>

          {/* Desktop Center Links */}
          <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Typography
              component="a"
              href="#intro"
              sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#64748b', textDecoration: 'none', letterSpacing: 0.5, '&:hover': { color: 'primary.main' } }}
            >
              GIỚI THIỆU
            </Typography>
            <Typography sx={{ color: '#cbd5e1' }}>|</Typography>
            <Typography
              component="a"
              href="#projects"
              sx={{ fontWeight: 700, fontSize: '0.85rem', color: 'primary.main', textDecoration: 'none', letterSpacing: 0.5 }}
            >
              DỰ ÁN
            </Typography>
          </Stack>

          {/* Right Controls */}
          <Stack direction="row" spacing={{ xs: 1, sm: 2 }} sx={{ alignItems: 'center' }}>
            {/* Online Status */}
            <Chip
              icon={<FiberManualRecordIcon color="success" sx={{ fontSize: '10px !important' }} />}
              label="100 người đang Online"
              size="small"
              sx={{ bgcolor: '#f1f5f9', fontWeight: 500, fontSize: '0.75rem', color: '#475569' }}
            />

            {/* Desktop Avatar */}
            <Avatar
              alt={user?.name || 'User'}
              src={user?.avatar}
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: 36,
                height: 36,
                bgcolor: isAuthenticated ? 'primary.main' : '#94a3b8',
                cursor: 'pointer',
              }}
            >
              {user?.name ? user.name[0] : 'U'}
            </Avatar>

            {/* Mobile Hamburger Menu button */}
            <IconButton
              size="small"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* Mobile menu dropdown */}
        <Collapse in={mobileMenuOpen}>
          <Box sx={{ pt: 2, pb: 1, borderTop: '1px solid #f1f5f9', mt: 1, display: { xs: 'block', md: 'none' } }}>
            <Stack spacing={1}>
              <Typography component="a" href="#intro" sx={{ py: 0.5, fontWeight: 600, color: 'text.secondary', textDecoration: 'none' }}>
                Giới thiệu
              </Typography>
              <Typography component="a" href="#projects" sx={{ py: 0.5, fontWeight: 600, color: 'primary.main', textDecoration: 'none' }}>
                Dự án
              </Typography>
              <Typography component="a" href="#contact" sx={{ py: 0.5, fontWeight: 600, color: 'text.secondary', textDecoration: 'none' }}>
                Liên hệ
              </Typography>
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};
