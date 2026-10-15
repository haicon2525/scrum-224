import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Divider,
  CircularProgress,
  IconButton,
  Stack,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import ExploreIcon from '@mui/icons-material/Explore';
import type { UnitItem } from '../../types/unit';
import { portalApi } from '../../api/portalApi';
import { formatBasePrice, formatArea, formatDirections } from '../../utils/formatters';

interface UnitDetailModalProps {
  open: boolean;
  unit: UnitItem | null;
  onClose: () => void;
  onOpenMap: (unit: UnitItem) => void;
}

export const UnitDetailModal: React.FC<UnitDetailModalProps> = ({
  open,
  unit,
  onClose,
  onOpenMap,
}) => {
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);

  useEffect(() => {
    if (open && unit?.id) {
      setLoading(true);
      portalApi
        .getUnitDetail(unit.id)
        .then((data) => {
          setDetailData(data);
        })
        .catch(() => {
          setDetailData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDetailData(null);
    }
  }, [open, unit]);

  if (!unit) return null;

  const current = detailData || unit;
  const isSold = current.statusCode === 'SOLD';
  const isDeposited = current.statusCode === 'DEPOSITED';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          },
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          p: 2.5,
          background: 'linear-gradient(135deg, #1e40af 0%, #0284c7 100%)',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.8 }}>
              <Chip
                label={unit.unitCode}
                sx={{
                  bgcolor: '#ffffff',
                  color: '#1e40af',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  borderRadius: '8px',
                }}
              />
              {current.isHot && (
                <Chip
                  icon={<WhatshotIcon sx={{ color: '#ef4444 !important', fontSize: 18 }} />}
                  label="Căn Hotdeal"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    fontWeight: 600,
                  }}
                />
              )}
              <Chip
                label={current.statusName || (isSold ? 'Đã bán' : isDeposited ? 'Đang cọc' : 'Còn hàng')}
                size="small"
                sx={{
                  bgcolor: isSold ? '#ffe4e6' : isDeposited ? '#fef3c7' : '#ccfbf1',
                  color: isSold ? '#be123c' : isDeposited ? '#b45309' : '#0f766e',
                  fontWeight: 700,
                }}
              />
            </Stack>

            <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff', fontSize: '1.1rem' }}>
              {current.projectName || 'Vinhomes Ocean Park 3'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem' }}>
              {current.phaseName ? `Phân khu: ${current.phaseName}` : current.agencyName ? `Đại lý: ${current.agencyName}` : 'Dự án đại đô thị đẳng cấp quốc tế'}
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              color: '#ffffff',
              bgcolor: 'rgba(255,255,255,0.15)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <CircularProgress size={36} color="primary" />
            <Typography sx={{ color: '#64748b', mt: 1.5, fontSize: '0.85rem' }}>
              Đang tải chi tiết căn hộ...
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2.5}>
            {/* Price Highlight Banner */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '12px',
                bgcolor: '#f0f9ff',
                border: '1px solid #bae6fd',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 1.5,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '0.78rem', color: '#0369a1', fontWeight: 600, textTransform: 'uppercase' }}>
                  Giá bán công khai
                </Typography>
                <Typography sx={{ fontSize: '1.6rem', fontWeight: 800, color: '#0284c7' }}>
                  {formatBasePrice(current.basePrice)}
                </Typography>
              </Box>

              {current.loanPrice && (
                <Box sx={{ textAlign: { sm: 'right' } }}>
                  <Typography sx={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>
                    Hỗ trợ vay ngân hàng
                  </Typography>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
                    {formatBasePrice(current.loanPrice)}
                  </Typography>
                </Box>
              )}
            </Paper>

            {/* Specifications Grid */}
            <Box>
              <Typography sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem', mb: 1.5 }}>
                Thông số chi tiết căn hộ
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5, mb: 1.5 }}>
                {/* Loại hình */}
                <Paper elevation={0} sx={{ p: 1.5, borderRadius: '8px', border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
                    <HomeWorkIcon sx={{ fontSize: 18, color: '#0284c7' }} />
                    <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>Loại hình bất động sản</Typography>
                  </Stack>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                    {current.unitTypeName || current.unitTypeCode || 'Chưa cập nhật'}
                  </Typography>
                </Paper>

                {/* Hướng đất */}
                <Paper elevation={0} sx={{ p: 1.5, borderRadius: '8px', border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
                    <ExploreIcon sx={{ fontSize: 18, color: '#0284c7' }} />
                    <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>Hướng đất</Typography>
                  </Stack>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                    {formatDirections(current.directions)}
                  </Typography>
                </Paper>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 1.5 }}>
                {/* Diện tích đất */}
                <Paper elevation={0} sx={{ p: 1.5, borderRadius: '8px', border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                  <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center', mb: 0.5 }}>
                    <SquareFootIcon sx={{ fontSize: 17, color: '#0284c7' }} />
                    <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>DT đất</Typography>
                  </Stack>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                    {formatArea(current.areaLand)}
                  </Typography>
                </Paper>

                {/* Diện tích xây dựng */}
                <Paper elevation={0} sx={{ p: 1.5, borderRadius: '8px', border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                  <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center', mb: 0.5 }}>
                    <SquareFootIcon sx={{ fontSize: 17, color: '#0284c7' }} />
                    <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>DT sàn XD</Typography>
                  </Stack>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                    {current.areaBuilding || current.areaConstruction ? formatArea(current.areaBuilding || current.areaConstruction) : '-'}
                  </Typography>
                </Paper>

                {/* DT thông thủy */}
                <Paper elevation={0} sx={{ p: 1.5, borderRadius: '8px', border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                  <Typography sx={{ fontSize: '0.75rem', color: '#64748b', mb: 0.5 }}>DT thông thủy</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                    {current.areaNet ? formatArea(current.areaNet) : '-'}
                  </Typography>
                </Paper>

                {/* DT tim tường */}
                <Paper elevation={0} sx={{ p: 1.5, borderRadius: '8px', border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
                  <Typography sx={{ fontSize: '0.75rem', color: '#64748b', mb: 0.5 }}>DT tim tường</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                    {current.areaGross ? formatArea(current.areaGross) : '-'}
                  </Typography>
                </Paper>
              </Box>
            </Box>

            <Divider />

            {/* Additional Policies & Bank support */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
              {current.handoverTypeName && (
                <Box>
                  <Typography sx={{ fontSize: '0.78rem', color: '#64748b', mb: 0.3 }}>Tiêu chuẩn bàn giao</Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#1e293b' }}>
                    {current.handoverTypeName}
                  </Typography>
                </Box>
              )}

              {current.bankName && (
                <Box>
                  <Typography sx={{ fontSize: '0.78rem', color: '#64748b', mb: 0.3 }}>Ngân hàng giải ngân ưu đãi</Typography>
                  <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center' }}>
                    <AccountBalanceIcon sx={{ fontSize: 17, color: '#0284c7' }} />
                    <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#1e293b' }}>
                      {current.bankName}
                    </Typography>
                  </Stack>
                </Box>
              )}

              {current.adminName && (
                <Box>
                  <Typography sx={{ fontSize: '0.78rem', color: '#64748b', mb: 0.3 }}>Chuyên viên phụ trách quỹ căn</Typography>
                  <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center' }}>
                    <PersonIcon sx={{ fontSize: 17, color: '#0284c7' }} />
                    <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#1e293b' }}>
                      {current.adminName}
                    </Typography>
                  </Stack>
                </Box>
              )}

              {current.adminPhone && (
                <Box>
                  <Typography sx={{ fontSize: '0.78rem', color: '#64748b', mb: 0.3 }}>Hotline tư vấn</Typography>
                  <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center' }}>
                    <PhoneIcon sx={{ fontSize: 17, color: '#16a34a' }} />
                    <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#16a34a' }}>
                      {current.adminPhone}
                    </Typography>
                  </Stack>
                </Box>
              )}
            </Box>
          </Stack>
        )}
      </DialogContent>

      {/* Dialog Footer Actions */}
      <DialogActions sx={{ p: 2.5, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onClose}
          sx={{ borderRadius: '8px', textTransform: 'none', px: 2.5 }}
        >
          Đóng
        </Button>
        <Button
          variant="contained"
          startIcon={<LocationOnIcon />}
          onClick={() => {
            onClose();
            onOpenMap(unit);
          }}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            px: 3,
            fontWeight: 600,
            bgcolor: '#0284c7',
            '&:hover': { bgcolor: '#0369a1' },
          }}
        >
          Xem vị trí trên mặt bằng quỹ căn
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnitDetailModal;
