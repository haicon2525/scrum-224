import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
  Stack,
  Tooltip,
  Paper,
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LayersIcon from '@mui/icons-material/Layers';
import { portalApi } from '../../api/portalApi';
import type { UnitItem } from '../../types/unit';
import { formatBasePrice, formatDirections } from '../../utils/formatters';
import { BLUR_PREVIEW_UNITS } from './filterConstants';
import { UnitMasterplanCanvas } from './UnitMasterplanCanvas';

export const FloorplanView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const unitCodeFromUrl = searchParams.get('unit') || '';

  const [selectedUnit, setSelectedUnit] = useState<UnitItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(2.2);

  // Load or match unit from URL param or sample list
  useEffect(() => {
    if (!unitCodeFromUrl) {
      // Default to first preview unit if no param
      setSelectedUnit(BLUR_PREVIEW_UNITS[0]);
      return;
    }

    const findUnit = async () => {
      try {
        const res = await portalApi.searchUnits({ unitCode: unitCodeFromUrl, pageSize: 5 });
        if (res.data && res.data.length > 0) {
          const match = res.data.find(
            (u) => u.unitCode.toLowerCase() === unitCodeFromUrl.toLowerCase()
          );
          setSelectedUnit(match || res.data[0]);
          return;
        }
      } catch (err) {
        console.warn('Failed to fetch unit for floorplan from API, using preview match:', err);
      }

      // Fallback to preview units
      const previewMatch = BLUR_PREVIEW_UNITS.find(
        (u) => u.unitCode.toLowerCase() === unitCodeFromUrl.toLowerCase()
      );
      setSelectedUnit(
        previewMatch || {
          id: 999,
          unitCode: unitCodeFromUrl,
          projectName: 'Vinhomes Ocean Park 3',
          phaseName: 'Phân khu Vịnh Tây',
          statusCode: 'AVAILABLE',
          statusName: 'Còn Hàng',
          unitTypeCode: 'SHOPHOUSE',
          unitTypeName: 'Shophouse',
          directionCode: 'SOUTHEAST',
          directions: 'Đông Nam',
          areaLand: 100,
          areaConstruction: 500,
          basePrice: 20200000000,
          isHot: true,
          createdAt: new Date().toISOString(),
        }
      );
    };

    findUnit();
  }, [unitCodeFromUrl]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => setZoomLevel(2.2);

  return (
    <Container maxWidth="xl" sx={{ mt: 2.5, mb: 4 }}>
      {/* Top Action Bar */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          mb: 2,
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/mui?tab=units')}
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '13px',
              borderColor: '#cbd5e1',
              color: '#334155',
              bgcolor: '#ffffff',
              '&:hover': { bgcolor: '#f8fafc', borderColor: '#94a3b8' },
            }}
          >
            Quay lại Quỹ căn
          </Button>

          <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1.25rem' }}>
            MẶT BẰNG QUỸ CĂN
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Chip
            icon={<LayersIcon sx={{ fontSize: '16px !important' }} />}
            label="Sơ đồ phân lô Masterplan 1:500"
            size="small"
            sx={{ bgcolor: '#e0f2fe', color: '#0369a1', fontWeight: 600, fontSize: '12px' }}
          />
          {selectedUnit && (
            <Chip
              icon={<LocationOnIcon sx={{ color: '#ef4444 !important', fontSize: '16px !important' }} />}
              label={`Đang zoom căn: ${selectedUnit.unitCode}`}
              size="small"
              sx={{ bgcolor: '#fee2e2', color: '#b91c1c', fontWeight: 700, fontSize: '12px' }}
            />
          )}
        </Stack>
      </Stack>

      {/* Main Floorplan Canvas Paper */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          height: { xs: '65vh', md: '75vh' },
          position: 'relative',
          bgcolor: '#0f172a',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Floating Zoom & Map Controls */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            bgcolor: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(10px)',
            p: 0.8,
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          <Tooltip title="Phóng to bản đồ (+)" placement="left">
            <IconButton size="small" onClick={handleZoomIn} sx={{ color: '#ffffff' }}>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Thu nhỏ bản đồ (-)" placement="left">
            <IconButton size="small" onClick={handleZoomOut} sx={{ color: '#ffffff' }}>
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Đặt lại góc nhìn chuẩn" placement="left">
            <IconButton size="small" onClick={handleResetZoom} sx={{ color: '#ffffff' }}>
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Floating Unit Information Card */}
        {selectedUnit && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              zIndex: 20,
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              p: 2.2,
              borderRadius: '14px',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              maxWidth: { xs: 'calc(100% - 48px)', sm: 340 },
              boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.8 }}>
              <Chip
                label={selectedUnit.unitCode}
                size="small"
                sx={{
                  bgcolor: '#0284c7',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                }}
              />
              <Chip
                label={selectedUnit.statusName || 'Còn hàng'}
                size="small"
                sx={{
                  bgcolor: selectedUnit.statusCode === 'SOLD' ? '#fee2e2' : '#dcfce7',
                  color: selectedUnit.statusCode === 'SOLD' ? '#b91c1c' : '#15803d',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              />
              {selectedUnit.isHot && (
                <Chip
                  label="HOT"
                  size="small"
                  sx={{ bgcolor: '#fef2f2', color: '#dc2626', fontWeight: 800, fontSize: '0.72rem' }}
                />
              )}
            </Stack>

            <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', color: '#1e293b' }}>
              {formatBasePrice(selectedUnit.basePrice)}
            </Typography>

            <Stack spacing={0.5} sx={{ mt: 1, fontSize: '0.82rem', color: '#475569' }}>
              <div>
                <strong>Dự án:</strong> {selectedUnit.projectName || 'Vinhomes Ocean Park 3'}
              </div>
              <div>
                <strong>Phân khu:</strong> {selectedUnit.phaseName || 'Phân khu 1'}
              </div>
              <div>
                <strong>Loại hình:</strong> {selectedUnit.unitTypeName || selectedUnit.unitTypeCode}
              </div>
              <div>
                <strong>Hướng đất:</strong> {formatDirections(selectedUnit.directions)}
              </div>
              <div>
                <strong>Diện tích đất:</strong> {selectedUnit.areaLand ? `${selectedUnit.areaLand} m²` : '-'}
              </div>
            </Stack>

            <Button
              fullWidth
              variant="contained"
              size="small"
              startIcon={<ApartmentIcon sx={{ fontSize: '16px !important' }} />}
              onClick={() => navigate('/mui?tab=units')}
              sx={{
                mt: 1.8,
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '12px',
                background: 'linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)',
              }}
            >
              Xem trong danh sách quỹ căn
            </Button>
          </Paper>
        )}

        {/* Masterplan Map Canvas using shared component identical to modal */}
        <UnitMasterplanCanvas unit={selectedUnit} zoomLevel={zoomLevel} />
      </Paper>
    </Container>
  );
};

export default FloorplanView;
