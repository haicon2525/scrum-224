import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import type { UnitItem } from '../../types/unit';
import { formatBasePrice, formatDirections } from '../../utils/formatters';

interface UnitMapModalProps {
  open: boolean;
  unit: UnitItem | null;
  onClose: () => void;
}

export const UnitMapModal: React.FC<UnitMapModalProps> = ({ open, unit, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(2);

  if (!unit) return null;

  // Derive pseudo coordinates from unit ID/Code to place pin accurately on masterplan
  const codeStr = String(unit.unitCode || 'UNIT');
  const hash = codeStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const pinX = 35 + (hash % 35); // 35% to 70%
  const pinY = 30 + ((hash * 7) % 40); // 30% to 70%

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setZoomLevel(2);

  const handleOpenNewTab = () => {
    // Open tab / new window pointing to floorplan with unit query param
    const url = `${window.location.origin}/mui?tab=floorplan&unit=${encodeURIComponent(unit.unitCode)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {/* Map Header */}
      <DialogTitle
        sx={{
          p: 2,
          bgcolor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <LocationOnIcon sx={{ color: '#ef4444', fontSize: 24 }} />
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#ffffff' }}>
                Mặt bằng quỹ căn - Vị trí căn
              </Typography>
              <Chip
                label={unit.unitCode}
                size="small"
                sx={{
                  bgcolor: '#0284c7',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                }}
              />
            </Stack>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              {unit.projectName || 'Vinhomes Ocean Park 3'} {unit.phaseName ? `• ${unit.phaseName}` : ''}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<OpenInNewIcon fontSize="small" />}
            onClick={handleOpenNewTab}
            sx={{
              color: '#ffffff',
              borderColor: 'rgba(255,255,255,0.3)',
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '0.8rem',
              '&:hover': { borderColor: '#ffffff', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Mở tab mới
          </Button>
          <IconButton onClick={onClose} sx={{ color: '#ffffff' }}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      {/* Interactive Map Viewport */}
      <DialogContent
        sx={{
          p: 0,
          flexGrow: 1,
          bgcolor: '#1e293b',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Floating Zoom & Control Toolbar */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            bgcolor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            p: 0.8,
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <Tooltip title="Phóng to (Zoom In)" placement="left">
            <IconButton size="small" onClick={handleZoomIn} sx={{ color: '#ffffff' }}>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Thu nhỏ (Zoom Out)" placement="left">
            <IconButton size="small" onClick={handleZoomOut} sx={{ color: '#ffffff' }}>
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Đặt lại góc nhìn" placement="left">
            <IconButton size="small" onClick={handleResetZoom} sx={{ color: '#ffffff' }}>
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Floating Unit Card Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            zIndex: 20,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            p: 2,
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            border: '1px solid #e2e8f0',
            maxWidth: 320,
          }}
        >
          <Typography sx={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Tọa độ căn trên sơ đồ
          </Typography>
          <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', color: '#1e293b', mt: 0.3 }}>
            {unit.unitCode} - {formatBasePrice(unit.basePrice)}
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: '#475569', mt: 0.5 }}>
            {unit.unitTypeName || 'Shophouse'} • {formatDirections(unit.directions)}
          </Typography>
          <Chip
            size="small"
            label="Đang được định vị & phóng to"
            sx={{ mt: 1.2, bgcolor: '#fef2f2', color: '#dc2626', fontWeight: 600, fontSize: '0.72rem' }}
          />
        </Box>

        {/* Masterplan Map Canvas with smooth Zoom & Transform */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              backgroundImage: 'radial-gradient(#334155 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
              bgcolor: '#0f172a',
              transform: `scale(${zoomLevel})`,
              transformOrigin: `${pinX}% ${pinY}%`,
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* SVG Masterplan Blueprint Artwork */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1000 700"
              style={{ width: '100%', height: '100%', opacity: 0.85 }}
            >
              {/* Lake / Canal curves */}
              <path
                d="M 50,350 Q 250,200 500,320 T 950,300"
                fill="none"
                stroke="#0284c7"
                strokeWidth="45"
                opacity="0.4"
              />
              <path
                d="M 200,600 Q 400,450 650,550 T 900,450"
                fill="none"
                stroke="#0284c7"
                strokeWidth="35"
                opacity="0.3"
              />

              {/* Sub-divisions / Phases blocks */}
              <rect x="150" y="120" width="180" height="140" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
              <text x="240" y="200" fill="#94a3b8" fontSize="18" textAnchor="middle" fontWeight="bold">PHÂN KHU 1</text>

              <rect x="380" y="100" width="220" height="160" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
              <text x="490" y="190" fill="#94a3b8" fontSize="18" textAnchor="middle" fontWeight="bold">PHÂN KHU 2</text>

              <rect x="650" y="140" width="200" height="130" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
              <text x="750" y="215" fill="#94a3b8" fontSize="18" textAnchor="middle" fontWeight="bold">PHÂN KHU 3</text>

              <rect x="250" y="380" width="240" height="160" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
              <text x="370" y="470" fill="#94a3b8" fontSize="18" textAnchor="middle" fontWeight="bold">PHÂN KHU ÁNH DƯƠNG</text>

              <rect x="540" y="370" width="260" height="170" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
              <text x="670" y="465" fill="#94a3b8" fontSize="18" textAnchor="middle" fontWeight="bold">PHÂN KHU VỊNH TÂY</text>
            </svg>

            {/* Glowing Pulsing Pin Target on Specific Unit Coordinates */}
            <Box
              sx={{
                position: 'absolute',
                top: `${pinY}%`,
                left: `${pinX}%`,
                transform: 'translate(-50%, -100%)',
                zIndex: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Unit Badge on Map */}
              <Box
                sx={{
                  bgcolor: '#dc2626',
                  color: '#ffffff',
                  px: 1.2,
                  py: 0.3,
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '11px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.5)',
                  mb: 0.3,
                  animation: 'pulse 1.8s infinite',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                  },
                }}
              >
                {unit.unitCode}
              </Box>

              {/* Pin Icon */}
              <LocationOnIcon sx={{ color: '#ef4444', fontSize: 32, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }} />

              {/* Ground ripple circle effect */}
              <Box
                sx={{
                  width: 14,
                  height: 6,
                  bgcolor: 'rgba(239, 68, 68, 0.6)',
                  borderRadius: '50%',
                  mt: -0.5,
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 1.5, bgcolor: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Button
          onClick={onClose}
          sx={{ color: '#94a3b8', textTransform: 'none', '&:hover': { color: '#ffffff' } }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnitMapModal;
