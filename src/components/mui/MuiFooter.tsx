import React from 'react';
import { Box, Container, Typography, Stack, Link } from '@mui/material';

export const MuiFooter: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(180deg, #0284c7 0%, #0369a1 40%, #0c4a6e 100%)',
        color: '#ffffff',
        pt: { xs: 4, md: 5 },
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 3.5fr 3.5fr' },
            gap: { xs: 3.5, md: 4 },
            alignItems: 'flex-start',
          }}
        >
          {/* Company info */}
          <Box>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 1.5 }}>
              <svg width="30" height="30" viewBox="0 0 34 34" fill="none">
                <rect x="4" y="14" width="6" height="16" rx="3" fill="#ffffff" fillOpacity="0.8" />
                <rect x="13" y="6" width="6" height="24" rx="3" fill="#ffffff" />
                <rect x="22" y="10" width="7" height="20" rx="3.5" fill="#bae6fd" />
              </svg>
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5, fontSize: '1.15rem' }}>
                BẤT ĐỘNG SẢN
              </Typography>
            </Stack>

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2.5, pr: { md: 4 }, fontSize: '0.82rem', lineHeight: 1.5 }}>
              Nền tảng công nghệ tiên phong &amp; dẫn đầu lĩnh vực kinh doanh bất động sản tại Việt Nam
            </Typography>

            <Stack spacing={1.2}>
              <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
                <Typography sx={{ fontSize: '0.85rem' }}>📱</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.82rem' }}>
                  0972 72 9999
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
                <Typography sx={{ fontSize: '0.85rem' }}>✉️</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.82rem' }}>
                  Contact@gmail.com
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.2} sx={{ alignItems: 'flex-start' }}>
                <Typography sx={{ fontSize: '0.85rem', mt: 0.2 }}>📍</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.82rem' }}>
                  SB24-39, Sao Biển 24, KĐT Vinhomes Ocean Park, Xã Gia Lâm, TP Hà Nội, Việt Nam
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Directory & Social Links */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', mb: 1.5, fontSize: '0.8rem', letterSpacing: 0.5 }}>
              Danh mục
            </Typography>
            <Stack spacing={0.8} sx={{ mb: 2.5 }}>
              <Link href="#about" underline="hover" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem' }}>
                • Giới thiệu
              </Link>
              <Link href="#projects" underline="hover" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem' }}>
                • Dự án
              </Link>
              <Link href="#contact" underline="hover" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem' }}>
                • Liên hệ
              </Link>
            </Stack>

            <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', mb: 1.2, fontSize: '0.8rem', letterSpacing: 0.5 }}>
              Kết nối
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Box
                component="a"
                href="#fb"
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: '#ffffff',
                  color: '#1d4ed8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                f
              </Box>
              <Box
                component="a"
                href="#yt"
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: '#ffffff',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                }}
              >
                ▶
              </Box>
              <Box
                component="a"
                href="#in"
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: '#ffffff',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                in
              </Box>
              <Box
                component="a"
                href="#tt"
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: '#ffffff',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                }}
              >
                🎵
              </Box>
              <Box
                component="a"
                href="#x"
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: '#ffffff',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                𝕏
              </Box>
            </Stack>
          </Box>

          {/* Mini Map Preview */}
          <Box>
            <Box
              sx={{
                height: 150,
                borderRadius: 2.5,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                bgcolor: '#ffffff',
              }}
            >
              <iframe
                title="Google Map Vinhomes Ocean Park"
                src="https://maps.google.com/maps?q=Vinhomes%20Ocean%20Park&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            pt: 3.5,
            mt: 3,
            borderTop: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.75rem',
          }}
        >
          © 2026 - Realestate. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};
