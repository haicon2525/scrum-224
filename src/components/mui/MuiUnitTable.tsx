import React from 'react';
import {
  Container,
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
import { formatBasePrice, formatDirections, formatArea } from '../../utils/formatters';

interface MuiUnitTableProps {
  units: UnitItem[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

export const MuiUnitTable: React.FC<MuiUnitTableProps> = ({
  units,
  isLoading,
  page,
  totalPages,
  total,
  onPageChange,
}) => {
  return (
    <Container maxWidth="xl" sx={{ mb: 5 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          bgcolor: '#ffffff',
          boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell align="center" sx={{ width: 80, fontWeight: 700, color: 'primary.main' }}>
                  {/* Icon column */}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem' }}>
                  Mã căn
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem' }}>
                  Giá bán
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem' }}>
                  Loại hình
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem' }}>
                  DT đất
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem' }}>
                  DT xây dựng
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem' }}>
                  Hướng
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem' }}>
                  Phân khu
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem' }}>
                  Tình trạng
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                    <CircularProgress size={36} color="primary" />
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                      Đang tải danh sách quỹ căn...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : units.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                    <SearchOffIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      Không tìm thấy căn hộ nào phù hợp
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Vui lòng thử điều chỉnh lại bộ lọc tìm kiếm
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
                      {/* Hotdeal & Pin icons */}
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                          {unit.isHot ? (
                            <Tooltip title="Căn Hotdeal">
                              <WhatshotIcon sx={{ color: '#ef4444', fontSize: 20 }} />
                            </Tooltip>
                          ) : (
                            <Box sx={{ width: 20 }} />
                          )}

                          <Tooltip title="Xem định vị trên sơ đồ">
                            <IconButton size="small" sx={{ p: 0.5, color: '#3b82f6' }}>
                              <LocationOnIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>

                      {/* Mã căn */}
                      <TableCell align="center">
                        <Chip
                          label={unit.unitCode}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            borderRadius: 1.5,
                            bgcolor: isSold ? '#ffe4e6' : isDeposited ? '#fef3c7' : '#eff6ff',
                            color: isSold ? '#e11d48' : isDeposited ? '#d97706' : '#2563eb',
                            border: '1px solid',
                            borderColor: isSold ? '#fecdd3' : isDeposited ? '#fde68a' : '#bfdbfe',
                          }}
                        />
                      </TableCell>

                      {/* Giá bán formatted xx,xx tỷ */}
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>
                          {formatBasePrice(unit.basePrice)}
                        </Typography>
                      </TableCell>

                      {/* Loại hình */}
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ color: '#475569' }}>
                          {unit.unitTypeName || unit.unitTypeCode}
                        </Typography>
                      </TableCell>

                      {/* DT đất */}
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ color: '#475569' }}>
                          {formatArea(unit.areaLand)}
                        </Typography>
                      </TableCell>

                      {/* DT xây dựng */}
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ color: '#475569' }}>
                          {unit.areaConstruction ? formatArea(unit.areaConstruction) : '-'}
                        </Typography>
                      </TableCell>

                      {/* Hướng formatted with " - " for corner units */}
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ color: '#475569' }}>
                          {formatDirections(unit.directions)}
                        </Typography>
                      </TableCell>

                      {/* Phân khu */}
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ color: '#475569' }}>
                          {unit.phaseName || `Phân khu ${unit.phaseId}`}
                        </Typography>
                      </TableCell>

                      {/* Tình trạng badge */}
                      <TableCell align="center">
                        <Chip
                          label={unit.statusName || (isSold ? 'Đã bán' : isDeposited ? 'Đang cọc' : 'Còn hàng')}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            borderRadius: 50,
                            bgcolor: isSold ? '#fef2f2' : isDeposited ? '#fffbeb' : '#ecfdf5',
                            color: isSold ? '#dc2626' : isDeposited ? '#b45309' : '#059669',
                            border: '1px solid',
                            borderColor: isSold ? '#fecaca' : isDeposited ? '#fef3c7' : '#a7f3d0',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination footer */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2.5,
            borderTop: '1px solid #f1f5f9',
            bgcolor: '#ffffff',
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Trang
            </Typography>
            <FormControl size="small">
              <Select
                value={page}
                onChange={(e) => onPageChange(Number(e.target.value))}
                sx={{ height: 32, fontSize: '0.85rem' }}
              >
                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Của {totalPages || 1} (Tổng {total} căn)
            </Typography>
          </Stack>

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
        </Stack>
      </Paper>
    </Container>
  );
};
