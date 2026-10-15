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
import { UnitMasterplanCanvas } from './UnitMasterplanCanvas';

interface UnitMapModalProps {
  open: boolean;
  unit: UnitItem | null;
  onClose: () => void;
}

export const UnitMapModal: React.FC<UnitMapModalProps> = ({ open, unit, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(2);

  if (!unit) return null;

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

        {/* Masterplan Map Canvas using shared component */}
        <UnitMasterplanCanvas unit={unit} zoomLevel={zoomLevel} />
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
