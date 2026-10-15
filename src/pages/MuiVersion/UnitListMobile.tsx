import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Typography,
  CircularProgress,
  Stack,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Tooltip,
} from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import type { UnitItem } from '../../types/unit';
import { formatBasePrice } from '../../utils/formatters';
import { UnitDetailModal } from './UnitDetailModal';
import { UnitMapModal } from './UnitMapModal';

interface UnitListMobileProps {
  units: UnitItem[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  total?: number;
  onPageChange: (newPage: number) => void;
}

export const UnitListMobile: React.FC<UnitListMobileProps> = ({
  units,
  isLoading,
  page,
  totalPages,
  onPageChange,
}) => {
  const [selectedDetailUnit, setSelectedDetailUnit] = useState<UnitItem | null>(null);
  const [selectedMapUnit, setSelectedMapUnit] = useState<UnitItem | null>(null);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2.5,
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          bgcolor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}
      >
        <TableContainer>
          <Table sx={{ width: '100%' }}>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell align="center" sx={{ width: 60, py: 1.2, px: 1 }}>
                  {/* Icons */}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.82rem', py: 1.2 }}>
                  Mã căn
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.82rem', py: 1.2 }}>
                  Giá bán
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={32} color="primary" />
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1.5 }}>
                      Đang tải danh sách quỹ căn...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : units.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                    <SearchOffIcon sx={{ fontSize: 38, color: '#94a3b8', mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      Không tìm thấy căn hộ phù hợp
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Vui lòng điều chỉnh lại bộ lọc
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                units.map((unit) => {
                  const isSold = unit.statusCode === 'SOLD';
                  const isDeposited = unit.statusCode === 'DEPOSITED';

                  return (
                    <TableRow
                      key={unit.id}
                      hover
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: 'background-color 0.15s ease',
                      }}
                    >
                      {/* Cột 1: Icons (Hotdeal ngọn lửa đỏ + Pin vị trí) */}
                      <TableCell align="center" sx={{ py: 1, px: 0.8 }}>
                        <Stack direction="row" spacing={0.3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                          {unit.isHot ? (
                            <Tooltip title="Căn Hotdeal">
                              <WhatshotIcon sx={{ color: '#ef4444', fontSize: 17 }} />
                            </Tooltip>
                          ) : (
                            <Box sx={{ width: 17 }} />
                          )}

                          <Tooltip title="Xem định vị trên sơ đồ mặt bằng quỹ căn">
                            <IconButton
                              size="small"
                              onClick={() => setSelectedMapUnit(unit)}
                              sx={{
                                p: 0.2,
                                color: '#3b82f6',
                                '&:hover': { bgcolor: '#eff6ff', transform: 'scale(1.15)' },
                                transition: 'all 0.15s',
                              }}
                            >
                              <LocationOnIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>

                      {/* Cột 2: Mã căn Badge (Nhấn vào xem chi tiết) */}
                      <TableCell align="center" sx={{ py: 1, px: 1 }}>
                        <Tooltip title="Nhấn để xem chi tiết thông tin căn">
                          <Chip
                            label={unit.unitCode}
                            size="small"
                            onClick={() => setSelectedDetailUnit(unit)}
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              borderRadius: 1.5,
                              cursor: 'pointer',
                              bgcolor: isSold ? '#ffedd5' : isDeposited ? '#fef3c7' : '#e0f2fe',
                              color: isSold ? '#ea580c' : isDeposited ? '#d97706' : '#0284c7',
                              border: '1px solid',
                              borderColor: isSold ? '#fed7aa' : isDeposited ? '#fde68a' : '#bae6fd',
                              '&:hover': {
                                boxShadow: '0 2px 6px rgba(2, 132, 199, 0.25)',
                              },
                              transition: 'all 0.15s',
                            }}
                          />
                        </Tooltip>
                      </TableCell>

                      {/* Cột 3: Giá bán formatted xx,xx tỷ */}
                      <TableCell align="center" sx={{ py: 1, px: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.8rem' }}>
                          {formatBasePrice(unit.basePrice)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Mobile Pagination Footer */}
        <Box sx={{ p: 1.8, borderTop: '1px solid #f1f5f9', bgcolor: '#ffffff' }}>
          <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
            <Pagination
              count={totalPages || 1}
              page={page}
              onChange={(_, val) => onPageChange(val)}
              color="primary"
              shape="rounded"
              size="small"
              showFirstButton
              showLastButton
            />

            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Trang
              </Typography>
              <FormControl size="small">
                <Select
                  value={page}
                  onChange={(e) => onPageChange(Number(e.target.value))}
                  sx={{ height: 26, fontSize: '0.78rem' }}
                >
                  {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Của {totalPages || 1}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Paper>

      {/* 1. Modal Xem chi tiết thông tin căn khi nhấn vào mã căn */}
      <UnitDetailModal
        open={Boolean(selectedDetailUnit)}
        unit={selectedDetailUnit}
        onClose={() => setSelectedDetailUnit(null)}
        onOpenMap={(u) => {
          setSelectedDetailUnit(null);
          setSelectedMapUnit(u);
        }}
      />

      {/* 2. Modal/Tab Mặt bằng quỹ căn chỉ đến tọa độ căn và zoom vị trí lên khi nhấn icon vị trí */}
      <UnitMapModal
        open={Boolean(selectedMapUnit)}
        unit={selectedMapUnit}
        onClose={() => setSelectedMapUnit(null)}
      />
    </>
  );
};

export default UnitListMobile;
