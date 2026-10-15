import React from 'react';
import { Box, Container, Typography, Stack, Link } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';

export const MuiFooter: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#133e75', color: '#ffffff', py: 6, mt: 'auto' }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 3fr 4fr' },
            gap: 4,
            alignItems: 'flex-start',
          }}
        >
          {/* Company info */}
          <Box>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
              <BusinessIcon sx={{ fontSize: 32, color: '#60a5fa' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                BẤT ĐỘNG SẢN
              </Typography>
            </Stack>

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', mb: 3, pr: { md: 4 } }}>
              Nền tảng công nghệ tiên phong &amp; dẫn đầu lĩnh vực kinh doanh bất động sản tại Việt Nam
            </Typography>

            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <PhoneIcon sx={{ fontSize: 18, color: '#93c5fd' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  0972 72 9999
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <EmailIcon sx={{ fontSize: 18, color: '#93c5fd' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Contact@gmail.com
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                <LocationOnIcon sx={{ fontSize: 18, color: '#93c5fd', mt: 0.3 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  SB24-39, Sao Biển 24, KĐT Vinhomes Ocean Park, Xã Gia Lâm, TP Hà Nội, Việt Nam
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Directory Links */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', mb: 2 }}>
              Danh mục
            </Typography>
            <Stack spacing={1.2}>
              <Link href="#about" underline="hover" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>
                • Giới thiệu
              </Link>
              <Link href="#projects" underline="hover" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>
                • Dự án
              </Link>
              <Link href="#contact" underline="hover" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>
                • Liên hệ
              </Link>
            </Stack>
          </Box>

          {/* Map Preview */}
          <Box>
            <Box
              sx={{
                height: 160,
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
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
      </Container>
    </Box>
  );
};
