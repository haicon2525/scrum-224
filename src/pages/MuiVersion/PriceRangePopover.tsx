import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Popover,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PRICE_PRESETS } from './filterConstants';

interface PriceRangePopoverProps {
  customMinPrice: string;
  customMaxPrice: string;
  pricePreset: string;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onPresetChange: (presetId: string) => void;
}

export const PriceRangePopover: React.FC<PriceRangePopoverProps> = ({
  customMinPrice,
  customMaxPrice,
  pricePreset,
  onMinPriceChange,
  onMaxPriceChange,
  onPresetChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const getDisplayLabel = () => {
    if (customMinPrice && customMaxPrice) return `${customMinPrice} - ${customMaxPrice} tỷ`;
    if (customMinPrice) return `≥ ${customMinPrice} tỷ`;
    if (customMaxPrice) return `≤ ${customMaxPrice} tỷ`;
    const preset = PRICE_PRESETS.find((p) => p.id === pricePreset && p.id !== 'ALL');
    return preset ? preset.label : 'Chọn khoảng giá';
  };

  const handleSelectPreset = (presetId: string) => {
    onPresetChange(presetId);
    const item = PRICE_PRESETS.find((p) => p.id === presetId);
    if (item) {
      onMinPriceChange(item.min);
      onMaxPriceChange(item.max);
    }
  };

  return (
    <Box>
      <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '13px', mb: 0.8 }}>
        Khoảng giá
      </Typography>

      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 1.75,
          py: '8.5px',
          borderRadius: '8px',
          border: '1px solid #d1d5db',
          bgcolor: '#ffffff',
          cursor: 'pointer',
          minHeight: '40px',
          boxSizing: 'border-box',
          '&:hover': { borderColor: '#0288d1' },
        }}
      >
        <Typography
          sx={{
            fontSize: '13.5px',
            color: getDisplayLabel() === 'Chọn khoảng giá' ? '#9ca3af' : '#1e293b',
          }}
        >
          {getDisplayLabel()}
        </Typography>
        <KeyboardArrowDownIcon sx={{ color: '#64748b', fontSize: 20 }} />
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              p: 2.2,
              width: 290,
              borderRadius: '10px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '1px solid #e2e8f0',
              mt: 0.8,
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '11px', color: '#64748b', mb: 0.5, fontWeight: 500 }}>
              Thấp nhất
            </Typography>
            <TextField
              size="small"
              type="number"
              placeholder="0"
              value={customMinPrice}
              onChange={(e) => {
                onMinPriceChange(e.target.value);
                onPresetChange('');
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '6px',
                  fontSize: '13px',
                  '& input': { py: 0.7, px: 1 },
                },
              }}
            />
          </Box>
          <Typography sx={{ color: '#64748b', pt: 2, fontWeight: 600 }}>→</Typography>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '11px', color: '#64748b', mb: 0.5, fontWeight: 500 }}>
              Cao nhất
            </Typography>
            <TextField
              size="small"
              type="number"
              placeholder="0"
              value={customMaxPrice}
              onChange={(e) => {
                onMaxPriceChange(e.target.value);
                onPresetChange('');
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '6px',
                  fontSize: '13px',
                  '& input': { py: 0.7, px: 1 },
                },
              }}
            />
          </Box>
        </Box>

        <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', mb: 1 }}>
          Tất cả mức giá
        </Typography>

        <RadioGroup
          value={pricePreset}
          onChange={(e) => handleSelectPreset(e.target.value)}
        >
          {PRICE_PRESETS.map((preset) => (
            <FormControlLabel
              key={preset.id}
              value={preset.id}
              control={
                <Radio
                  size="small"
                  sx={{
                    py: 0.4,
                    color: '#94a3b8',
                    '&.Mui-checked': { color: '#0288d1' },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: '13px', color: '#334155' }}>
                  {preset.label}
                </Typography>
              }
              sx={{ my: 0.1 }}
            />
          ))}
        </RadioGroup>
      </Popover>
    </Box>
  );
};
