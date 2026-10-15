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
  total?: number;
  onPageChange: (newPage: number) => void;
}

export const MuiUnitTable: React.FC<MuiUnitTableProps> = ({
  units,
  isLoading,
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <Container maxWidth="xl" sx={{ mb: { xs: 3, md: 5 } }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          bgcolor: '#ffffff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        }}
      >
        <TableContainer>
          <Table sx={{ width: '100%' }}>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell align="center" sx={{ width: { xs: 60, md: 80 }, py: 1.5 }}>
                  {/* Icon column */}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  Mã căn
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  Giá bán
                </TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  Loại hình
                </TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  DT đất
                </TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  DT xây dựng
                </TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  Hướng
                </TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  Phân khu
                </TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
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
                    <SearchOffIcon sx={{ fontSize: 44, color: '#94a3b8', mb: 1 }} />
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
                      <TableCell align="center" sx={{ py: 1 }}>
                        <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                          {unit.isHot ? (
                            <Tooltip title="Căn Hotdeal">
                              <WhatshotIcon sx={{ color: '#ef4444', fontSize: { xs: 17, md: 19 } }} />
                            </Tooltip>
                          ) : (
                            <Box sx={{ width: { xs: 17, md: 19 } }} />
                          )}

                          <Tooltip title="Xem định vị trên sơ đồ">
                            <IconButton size="small" sx={{ p: 0.3, color: '#3b82f6' }}>
                              <LocationOnIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>

                      {/* Mã căn */}
                      <TableCell align="center" sx={{ py: 1 }}>
                        <Chip
                          label={unit.unitCode}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            borderRadius: 1.5,
                            bgcolor: isSold ? '#ffedd5' : isDeposited ? '#fef3c7' : '#e0f2fe',
                            color: isSold ? '#ea580c' : isDeposited ? '#d97706' : '#0284c7',
                            border: '1px solid',
                            borderColor: isSold ? '#fed7aa' : isDeposited ? '#fde68a' : '#bae6fd',
                          }}
                        />
                      </TableCell>

                      {/* Giá bán formatted xx,xx tỷ */}
                      <TableCell align="center" sx={{ py: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', fontSize: '0.82rem' }}>
                          {formatBasePrice(unit.basePrice)}
                        </Typography>
                      </TableCell>

                      {/* Desktop only columns */}
                      <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, py: 1 }}>
                        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.82rem' }}>
                          {unit.unitTypeName || unit.unitTypeCode}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, py: 1 }}>
                        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.82rem' }}>
                          {formatArea(unit.areaLand)}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, py: 1 }}>
                        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.82rem' }}>
                          {unit.areaConstruction ? formatArea(unit.areaConstruction) : '-'}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, py: 1 }}>
                        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.82rem' }}>
                          {formatDirections(unit.directions)}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, py: 1 }}>
                        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.82rem' }}>
                          {unit.phaseName || `Phân khu ${unit.phaseId}`}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' }, py: 1 }}>
                        <Chip
                          label={unit.statusName || (isSold ? 'Đã bán' : isDeposited ? 'Đang cọc' : 'Còn hàng')}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.73rem',
                            borderRadius: 50,
                            bgcolor: isSold ? '#ffe4e6' : isDeposited ? '#fffbeb' : '#ccfbf1',
                            color: isSold ? '#be123c' : isDeposited ? '#b45309' : '#0f766e',
                            border: '1px solid',
                            borderColor: isSold ? '#fecdd3' : isDeposited ? '#fef3c7' : '#99f6e4',
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

        {/* Responsive Pagination footer */}
        <Box sx={{ p: 2, borderTop: '1px solid #f1f5f9', bgcolor: '#ffffff' }}>
          {/* Desktop Layout: side-by-side */}
          <Stack
            direction="row"
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
                Trang
              </Typography>
              <FormControl size="small">
                <Select
                  value={page}
                  onChange={(e) => onPageChange(Number(e.target.value))}
                  sx={{ height: 30, fontSize: '0.82rem' }}
                >
                  {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
                Của {totalPages || 1}
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

          {/* Mobile Layout: Pagination on top, selector on bottom */}
          <Stack
            spacing={1.5}
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              py: 0.5,
            }}
          >
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
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
                Trang
              </Typography>
              <FormControl size="small">
                <Select
                  value={page}
                  onChange={(e) => onPageChange(Number(e.target.value))}
                  sx={{ height: 28, fontSize: '0.82rem' }}
                >
                  {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
                Của {totalPages || 1}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};
