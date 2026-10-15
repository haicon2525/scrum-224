import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  TextField,
  Collapse,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { PhaseItem, MasterDataItem } from '../../api/portalApi';
import { AreaRangePopover } from './AreaRangePopover';
import { PriceRangePopover } from './PriceRangePopover';

interface AdvancedFilterPanelProps {
  open: boolean;
  unitCode: string;
  phaseId: string;
  unitTypeCode: string;
  directionCode: string;
  phases: PhaseItem[];
  unitTypes: MasterDataItem[];
  directions: MasterDataItem[];
  // Area states
  customMinArea: string;
  customMaxArea: string;
  areaPreset: string;
  // Price states
  customMinPrice: string;
  customMaxPrice: string;
  pricePreset: string;
  loading: boolean;
  onUnitCodeChange: (val: string) => void;
  onPhaseIdChange: (val: string) => void;
  onUnitTypeCodeChange: (val: string) => void;
  onDirectionCodeChange: (val: string) => void;
  onMinAreaChange: (val: string) => void;
  onMaxAreaChange: (val: string) => void;
  onAreaPresetChange: (val: string) => void;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onPricePresetChange: (val: string) => void;
  onClose: () => void;
  onApply: () => void;
}

export const AdvancedFilterPanel: React.FC<AdvancedFilterPanelProps> = ({
  open,
  unitCode,
  phaseId,
  unitTypeCode,
  directionCode,
  phases,
  unitTypes,
  directions,
  customMinArea,
  customMaxArea,
  areaPreset,
  customMinPrice,
  customMaxPrice,
  pricePreset,
  loading,
  onUnitCodeChange,
  onPhaseIdChange,
  onUnitTypeCodeChange,
  onDirectionCodeChange,
  onMinAreaChange,
  onMaxAreaChange,
  onAreaPresetChange,
  onMinPriceChange,
  onMaxPriceChange,
  onPricePresetChange,
  onClose,
  onApply,
}) => {
  return (
    <Collapse in={open}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3 },
          mb: 3,
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          bgcolor: '#ffffff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: '#0d6efd',
            fontSize: '15px',
            textTransform: 'uppercase',
            letterSpacing: 0.3,
            mb: 2.5,
          }}
        >
          BỘ LỌC NÂNG CAO
        </Typography>

        {/* 6 Columns Grid matching Figma Image 1 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(6, 1fr)',
            },
            columnGap: 1.5,
            rowGap: 2,
          }}
        >
          {/* ROW 1 - COL 1: Mã căn hộ */}
          <Box>
            <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '13px', mb: 0.8 }}>
              Mã căn hộ
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Nhập mã căn hộ"
              value={unitCode}
              onChange={(e) => onUnitCodeChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onApply()}
              sx={{
                bgcolor: '#ffffff',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  '& fieldset': { borderColor: '#d1d5db' },
                  '&:hover fieldset': { borderColor: '#0288d1' },
                },
              }}
            />
          </Box>

          {/* ROW 1 - COL 2: Phân khu */}
          <Box>
            <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '13px', mb: 0.8 }}>
              Phân khu
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={phaseId}
                onChange={(e) => onPhaseIdChange(e.target.value)}
                displayEmpty
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  bgcolor: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  color: phaseId === 'ALL' ? '#9ca3af' : '#1e293b',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d1d5db' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0288d1' },
                }}
              >
                <MenuItem value="ALL" sx={{ color: '#9ca3af' }}>Chọn phân khu</MenuItem>
                {phases.length > 0 ? (
                  phases.map((ph) => (
                    <MenuItem key={ph.id} value={ph.id} sx={{ color: '#1e293b' }}>
                      {ph.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="ALL_DEFAULT" disabled sx={{ color: '#9ca3af', fontStyle: 'italic' }}>
                    (Dự án chưa có phân khu)
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>

          {/* ROW 1 - COL 3: Loại căn */}
          <Box>
            <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '13px', mb: 0.8 }}>
              Loại căn
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={unitTypeCode}
                onChange={(e) => onUnitTypeCodeChange(e.target.value)}
                displayEmpty
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  bgcolor: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  color: unitTypeCode === 'ALL' ? '#9ca3af' : '#1e293b',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d1d5db' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0288d1' },
                }}
              >
                <MenuItem value="ALL" sx={{ color: '#9ca3af' }}>Chọn loại căn</MenuItem>
                {unitTypes.map((ut) => (
                  <MenuItem key={ut.code} value={ut.code} sx={{ color: '#1e293b' }}>
                    {ut.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* ROW 2 - COL 1: Hướng đất */}
          <Box>
            <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '13px', mb: 0.8 }}>
              Hướng đất
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={directionCode}
                onChange={(e) => onDirectionCodeChange(e.target.value)}
                displayEmpty
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  bgcolor: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  color: directionCode === 'ALL' ? '#9ca3af' : '#1e293b',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d1d5db' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0288d1' },
                }}
              >
                <MenuItem value="ALL" sx={{ color: '#9ca3af' }}>Chọn hướng đất</MenuItem>
                {directions.map((dir) => (
                  <MenuItem key={dir.code} value={dir.code} sx={{ color: '#1e293b' }}>
                    {dir.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* ROW 2 - COL 2: Diện tích Popover */}
          <AreaRangePopover
            customMinArea={customMinArea}
            customMaxArea={customMaxArea}
            areaPreset={areaPreset}
            onMinAreaChange={onMinAreaChange}
            onMaxAreaChange={onMaxAreaChange}
            onPresetChange={onAreaPresetChange}
          />

          {/* ROW 2 - COL 3: Khoảng giá Popover */}
          <PriceRangePopover
            customMinPrice={customMinPrice}
            customMaxPrice={customMaxPrice}
            pricePreset={pricePreset}
            onMinPriceChange={onMinPriceChange}
            onMaxPriceChange={onMaxPriceChange}
            onPresetChange={onPricePresetChange}
          />
        </Box>

        {/* Action buttons: Đóng and Tìm kiếm căn giữa */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1.5,
            mt: 2.5,
          }}
        >
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              textTransform: 'none',
              borderRadius: '6px',
              px: 3.5,
              py: 0.8,
              fontWeight: 500,
              fontSize: '13.5px',
              bgcolor: '#f1f5f9',
              color: '#334155',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#e2e8f0',
                boxShadow: 'none',
              },
            }}
          >
            Đóng
          </Button>
          <Button
            variant="contained"
            onClick={onApply}
            disabled={loading}
            sx={{
              textTransform: 'none',
              borderRadius: '6px',
              px: 4,
              py: 0.8,
              fontWeight: 600,
              fontSize: '13.5px',
              background: 'linear-gradient(135deg, #1d4ed8 0%, #0099e5 100%)',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(29, 78, 216, 0.25)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1e40af 0%, #0284c7 100%)',
                boxShadow: '0 4px 14px rgba(29, 78, 216, 0.35)',
              },
            }}
          >
            {loading ? 'Đang tìm...' : 'Tìm kiếm'}
          </Button>
        </Box>
      </Paper>
    </Collapse>
  );
};
