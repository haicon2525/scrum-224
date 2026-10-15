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
import { formatBasePrice, formatDirections, formatArea } from '../../utils/formatters';
import { UnitDetailModal } from './UnitDetailModal';
import { UnitMapModal } from './UnitMapModal';

interface UnitTableProps {
  units: UnitItem[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  total?: number;
  onPageChange: (newPage: number) => void;
}

export const UnitTable: React.FC<UnitTableProps> = ({
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
                <TableCell align="center" sx={{ width: 70, py: 1.5 }}>
                  {/* Hotdeal & Action Icons */}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  Mã căn
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  Giá bán
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  Loại hình
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  DT đất
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  DT xây dựng
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  Hướng
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
                  Phân khu
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '0.85rem', py: 1.5 }}>
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
                              <WhatshotIcon sx={{ color: '#ef4444', fontSize: 19 }} />
                            </Tooltip>
                          ) : (
                            <Box sx={{ width: 19 }} />
                          )}

                          <Tooltip title="Xem định vị trên sơ đồ mặt bằng quỹ căn">
                            <IconButton
                              size="small"
                              onClick={() => setSelectedMapUnit(unit)}
                              sx={{
                                p: 0.3,
                                color: '#3b82f6',
                                '&:hover': { bgcolor: '#eff6ff', transform: 'scale(1.15)' },
                                transition: 'all 0.15s',
                              }}
                            >
                              <LocationOnIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>

                      {/* Mã căn Badge (Clickable to view detail) */}
                      <TableCell align="center" sx={{ py: 1 }}>
                        <Tooltip title="Nhấn để xem chi tiết thông tin căn">
                          <Chip
                            label={unit.unitCode}
                            size="small"
                            onClick={() => setSelectedDetailUnit(unit)}
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              borderRadius: 1.5,
                              cursor: 'pointer',
                              bgcolor: isSold ? '#ffedd5' : isDeposited ? '#fef3c7' : '#e0f2fe',
                              color: isSold ? '#ea580c' : isDeposited ? '#d97706' : '#0284c7',
                              border: '1px solid',
                              borderColor: isSold ? '#fed7aa' : isDeposited ? '#fde68a' : '#bae6fd',
                              '&:hover': {
                                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)',
                                transform: 'translateY(-1px)',
                              },
                              transition: 'all 0.15s',
                            }}
                          />
                        </Tooltip>
                      </TableCell>

                      {/* Giá bán formatted xx,xx tỷ */}
                      <TableCell align="center" sx={{ py: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>
                          {formatBasePrice(unit.basePrice)}
                        </Typography>
                      </TableCell>

                      {/* Loại hình */}
                      <TableCell align="center" sx={{ py: 1 }}>
                        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.82rem' }}>
                          {unit.unitTypeName || unit.unitTypeCode}
                        </Typography>
                      </TableCell>

                      {/* Diện tích đất */}
                      <TableCell align="center" sx={{ py: 1 }}>
                        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.82rem' }}>
                          {formatArea(unit.areaLand)}
                        </Typography>
                      </TableCell>

                      {/* Diện tích xây dựng */}
                      <TableCell align="center" sx={{ py: 1 }}>
                        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.82rem' }}>
                          {unit.areaConstruction ? formatArea(unit.areaConstruction) : '-'}
                        </Typography>
                      </TableCell>

                      {/* Hướng đất (nối " - " nếu nhiều hướng) */}
                      <TableCell align="center" sx={{ py: 1 }}>
                        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.82rem' }}>
                          {formatDirections(unit.directions)}
                        </Typography>
                      </TableCell>

                      {/* Phân khu */}
                      <TableCell align="center" sx={{ py: 1 }}>
                        <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.82rem' }}>
                          {unit.phaseName || (unit.phaseId ? `Phân khu ${unit.phaseId}` : '-')}
                        </Typography>
                      </TableCell>

                      {/* Tình trạng */}
                      <TableCell align="center" sx={{ py: 1 }}>
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

        {/* Pagination Footer */}
        <Box sx={{ p: 2, borderTop: '1px solid #f1f5f9', bgcolor: '#ffffff' }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
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

export default UnitTable;
