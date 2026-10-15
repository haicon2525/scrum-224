import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link, Button, Stack } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const MuiHeroBanner: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 2.5 }}>
      {/* Breadcrumb */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" sx={{ color: '#94a3b8' }} />}
        aria-label="breadcrumb"
        sx={{ mb: 1.5, fontSize: '0.85rem' }}
      >
        <Link underline="hover" color="primary" href="#projects">
          Dự án
        </Link>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
          Vinhomes Ocean Park 3
        </Typography>
      </Breadcrumbs>

      {/* Title & Share Button */}
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: '-0.5px' }}>
            VINHOMES OCEAN PARK 3
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án VINHOMES OCEAN PARK 3.
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<ShareIcon />}
          sx={{ textTransform: 'none', borderRadius: 2, px: 2, py: 0.8, boxShadow: '0 2px 8px rgba(37,99,235,0.2)' }}
        >
          Chia sẻ
        </Button>
      </Stack>

      {/* Banner */}
      <Box
        sx={{
          height: { xs: 260, md: 380 },
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%), url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', p: { xs: 2, md: 4 }, textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              color: '#ffffff',
              fontStyle: 'italic',
              fontWeight: 400,
              textShadow: '0 2px 4px rgba(0,0,0,0.6)',
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Siêu quần thể đô thị biển
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: '#facc15',
              fontWeight: 800,
              textTransform: 'uppercase',
              textShadow: '0 3px 8px rgba(0,0,0,0.7)',
              fontSize: { xs: '1.4rem', md: '2.2rem' },
              mt: 0.5,
            }}
          >
            VINHOMES OCEAN PARK 2 & 3
          </Typography>
        </Box>

        {/* Carousel indicators */}
        <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>
          <Box sx={{ width: 28, height: 6, borderRadius: 3, bgcolor: 'primary.main' }} />
          <Box sx={{ width: 8, height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.7)' }} />
          <Box sx={{ width: 8, height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.7)' }} />
          <Box sx={{ width: 8, height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.7)' }} />
        </Stack>
      </Box>
    </Container>
  );
};
