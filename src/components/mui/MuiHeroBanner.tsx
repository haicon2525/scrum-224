import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link, Button, Stack } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const MuiHeroBanner: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: { xs: 1.5, md: 2.5 } }}>
      {/* Breadcrumb */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" sx={{ color: '#94a3b8' }} />}
        aria-label="breadcrumb"
        sx={{ mb: 1, fontSize: '0.82rem' }}
      >
        <Link underline="hover" color="primary" href="#projects">
          Dự án
        </Link>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
          Vinhomes Ocean Park 3
        </Typography>
      </Breadcrumbs>

      {/* Title & Share Button */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          gap: 1.5,
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', fontSize: { xs: '1.35rem', md: '1.6rem' }, letterSpacing: '-0.3px' }}>
            VINHOMES OCEAN PARK 3
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem', mt: 0.3 }}>
            Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án VINHOMES OCEAN PARK 3.
          </Typography>
        </Box>

        {/* Share Button (Full width on mobile) */}
        <Button
          variant="contained"
          size="small"
          startIcon={<ShareIcon sx={{ fontSize: '16px !important' }} />}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: 2.5,
            py: 0.8,
            width: { xs: '100%', md: 'auto' },
            background: 'linear-gradient(90deg, #1d4ed8 0%, #0284c7 100%)',
            boxShadow: '0 3px 10px rgba(2, 132, 199, 0.3)',
            fontWeight: 600,
          }}
        >
          Chia sẻ
        </Button>
      </Stack>

      {/* Banner using exact Figma Banner image */}
      <Box
        sx={{
          borderRadius: { xs: 3, md: 4 },
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          width: '100%',
          bgcolor: '#ffffff',
        }}
      >
        <Box
          component="img"
          src="/figma-banner.png"
          alt="Siêu quần thể đô thị biển Vinhomes Ocean Park 2 & 3"
          sx={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: { xs: 3, md: 4 },
          }}
        />
      </Box>
    </Container>
  );
};
