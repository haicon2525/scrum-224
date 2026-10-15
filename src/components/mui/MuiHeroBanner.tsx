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

      {/* Banner */}
      <Box
        sx={{
          height: 'clamp(190px, 28vw, 360px)',
          borderRadius: { xs: 3, md: 4 },
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%), url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', p: { xs: 2, md: 4 }, textAlign: 'center' }}>
          <Typography
            sx={{
              color: '#ffffff',
              fontStyle: 'italic',
              fontWeight: 400,
              textShadow: '0 2px 4px rgba(0,0,0,0.6)',
              fontSize: 'clamp(13px, 2vw, 18px)',
            }}
          >
            Siêu quần thể đô thị biển
          </Typography>
          <Typography
            sx={{
              color: '#facc15',
              fontWeight: 800,
              textTransform: 'uppercase',
              textShadow: '0 3px 8px rgba(0,0,0,0.7)',
              fontSize: 'clamp(18px, 3.5vw, 32px)',
              mt: 0.5,
            }}
          >
            VINHOMES OCEAN PARK 2 & 3
          </Typography>
        </Box>

        {/* Carousel indicators */}
        <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: { xs: 10, md: 16 }, left: '50%', transform: 'translateX(-50%)' }}>
          <Box sx={{ width: 24, height: 5, borderRadius: 3, bgcolor: 'primary.main' }} />
          <Box sx={{ width: 6, height: 5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.7)' }} />
          <Box sx={{ width: 6, height: 5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.7)' }} />
          <Box sx={{ width: 6, height: 5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.7)' }} />
        </Stack>
      </Box>
    </Container>
  );
};
