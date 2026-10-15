import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  TextField,
  Collapse,
  Stack,
  Popover,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { masterDataApi } from '../../api/masterDataApi';
import type { MasterDataItem } from '../../types/masterData';
import type { UnitSearchParams, SortOptionValue } from '../../types/unit';

interface MuiUnitFilterProps {
  onSearch: (params: UnitSearchParams) => void;
  isLoading?: boolean;
}

const DEFAULT_PHASES = [
  { id: 1, name: 'Phân khu 1' },
  { id: 2, name: 'Phân khu 2' },
  { id: 3, name: 'Phân khu 3' },
  { id: 4, name: 'Phân khu 4' },
];

const AREA_PRESETS = [
  { id: 'ALL', label: 'Tất cả mức giá', min: '', max: '' },
  { id: 'below50', label: 'Dưới 50m²', min: '', max: '50' },
  { id: '50to70', label: '50m² đến 70m²', min: '50', max: '70' },
  { id: '70to90', label: '70m² đến 90m²', min: '70', max: '90' },
  { id: '90to120', label: '90m² đến 120m²', min: '90', max: '120' },
  { id: 'above120', label: 'Trên 120m2', min: '120', max: '' },
];

const PRICE_PRESETS = [
  { id: 'ALL', label: 'Tất cả mức giá', min: '', max: '' },
  { id: 'below5', label: 'Dưới 5 tỷ', min: '', max: '5' },
  { id: '5to10', label: '5 tới 10 tỷ', min: '5', max: '10' },
  { id: '10to15', label: '10 tới 15 tỷ', min: '10', max: '15' },
  { id: '15to20', label: '15 tới 20 tỷ', min: '15', max: '20' },
  { id: 'above20', label: 'Trên 20 tỷ', min: '20', max: '' },
];

export const MuiUnitFilter: React.FC<MuiUnitFilterProps> = ({ onSearch, isLoading }) => {
  const [showAdvanced, setShowAdvanced] = useState(true);

  // Master data lists
  const [statuses, setStatuses] = useState<MasterDataItem[]>([]);
  const [unitTypes, setUnitTypes] = useState<MasterDataItem[]>([]);
  const [directions, setDirections] = useState<MasterDataItem[]>([]);

  // Filter criteria states
  const [sort, setSort] = useState<SortOptionValue>('isHot:desc,createdAt:desc');
  const [statusCode, setStatusCode] = useState<string>('ALL');
  const [unitCode, setUnitCode] = useState<string>('');
  const [phaseId, setPhaseId] = useState<string>('ALL');
  const [unitTypeCode, setUnitTypeCode] = useState<string>('ALL');
  const [directionCode, setDirectionCode] = useState<string>('ALL');

  // Popover state for Area
  const [areaAnchor, setAreaAnchor] = useState<HTMLElement | null>(null);
  const [areaPreset, setAreaPreset] = useState<string>('ALL');
  const [customMinArea, setCustomMinArea] = useState<string>('');
  const [customMaxArea, setCustomMaxArea] = useState<string>('');

  // Popover state for Price
  const [priceAnchor, setPriceAnchor] = useState<HTMLElement | null>(null);
  const [pricePreset, setPricePreset] = useState<string>('ALL');
  const [customMinPrice, setCustomMinPrice] = useState<string>('');
  const [customMaxPrice, setCustomMaxPrice] = useState<string>('');

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const [stList, utList, dirList] = await Promise.all([
          masterDataApi.getByGroupCode('UNIT_STATUS'),
          masterDataApi.getByGroupCode('UNIT_TYPE'),
          masterDataApi.getByGroupCode('DIRECTION'),
        ]);
        setStatuses(stList);
        setUnitTypes(utList);
        setDirections(dirList);
      } catch (err) {
        console.error('Failed to load master data:', err);
      }
    };

    fetchMasterData();
  }, []);

  // Helper to build search params from current state
  const buildSearchParams = (overrides?: Partial<UnitSearchParams>): UnitSearchParams => {
    let minArea: number | undefined;
    let maxArea: number | undefined;

    if (customMinArea) {
      minArea = parseFloat(customMinArea);
    }
    if (customMaxArea) {
      maxArea = parseFloat(customMaxArea);
    }

    let minPrice: number | undefined;
    let maxPrice: number | undefined;

    if (customMinPrice) {
      const p = parseFloat(customMinPrice);
      minPrice = p < 1000 ? p * 1_000_000_000 : p;
    }
    if (customMaxPrice) {
      const p = parseFloat(customMaxPrice);
      maxPrice = p < 1000 ? p * 1_000_000_000 : p;
    }

    return {
      sort,
      statusCode: statusCode !== 'ALL' ? statusCode : undefined,
      unitCode: unitCode.trim() || undefined,
      phaseId: phaseId !== 'ALL' ? phaseId : undefined,
      unitTypeCode: unitTypeCode !== 'ALL' ? unitTypeCode : undefined,
      directionCode: directionCode !== 'ALL' ? directionCode : undefined,
      minAreaLand: minArea,
      maxAreaLand: maxArea,
      minBasePrice: minPrice,
      maxBasePrice: maxPrice,
      page: 1,
      ...overrides,
    };
  };

  const handleApplyFilter = () => {
    onSearch(buildSearchParams());
  };

  const handleQuickSortChange = (newSort: SortOptionValue) => {
    setSort(newSort);
    onSearch(buildSearchParams({ sort: newSort }));
  };

  const handleQuickStatusChange = (newStatus: string) => {
    setStatusCode(newStatus);
    onSearch(buildSearchParams({ statusCode: newStatus !== 'ALL' ? newStatus : undefined }));
  };

  // Preset handlers
  const handleSelectAreaPreset = (presetId: string) => {
    setAreaPreset(presetId);
    const item = AREA_PRESETS.find((p) => p.id === presetId);
    if (item) {
      setCustomMinArea(item.min);
      setCustomMaxArea(item.max);
    }
  };

  const handleSelectPricePreset = (presetId: string) => {
    setPricePreset(presetId);
    const item = PRICE_PRESETS.find((p) => p.id === presetId);
    if (item) {
      setCustomMinPrice(item.min);
      setCustomMaxPrice(item.max);
    }
  };

  // Label display for Area trigger
  const getAreaDisplayLabel = () => {
    if (customMinArea && customMaxArea) return `${customMinArea} - ${customMaxArea} m²`;
    if (customMinArea) return `≥ ${customMinArea} m²`;
    if (customMaxArea) return `≤ ${customMaxArea} m²`;
    const preset = AREA_PRESETS.find((p) => p.id === areaPreset && p.id !== 'ALL');
    return preset ? preset.label : 'Chọn diện tích';
  };

  // Label display for Price trigger
  const getPriceDisplayLabel = () => {
    if (customMinPrice && customMaxPrice) return `${customMinPrice} - ${customMaxPrice} tỷ`;
    if (customMinPrice) return `≥ ${customMinPrice} tỷ`;
    if (customMaxPrice) return `≤ ${customMaxPrice} tỷ`;
    const preset = PRICE_PRESETS.find((p) => p.id === pricePreset && p.id !== 'ALL');
    return preset ? preset.label : 'Chọn khoảng giá';
  };

  return (
    <Container maxWidth="xl" sx={{ mt: { xs: 2.5, md: 3.5 } }}>
      {/* Title & Quick Controls Bar */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
          BẢNG HÀNG
        </Typography>

        {/* Controls: Stacked on mobile, row on desktop */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.5}
          sx={{ alignItems: 'stretch', width: { xs: '100%', md: 'auto' } }}
        >
          {/* Sort selector */}
          <FormControl size="small" sx={{ width: { xs: '100%', md: 200 } }}>
            <Select
              value={sort}
              onChange={(e) => handleQuickSortChange(e.target.value as SortOptionValue)}
              displayEmpty
              sx={{ bgcolor: '#ffffff', borderRadius: '8px', fontSize: '0.85rem' }}
            >
              <MenuItem value="isHot:desc,createdAt:desc">Sắp xếp theo mặc định</MenuItem>
              <MenuItem value="createdAt:desc">Mới nhất</MenuItem>
              <MenuItem value="createdAt:asc">Cũ nhất</MenuItem>
              <MenuItem value="basePrice:asc">Giá tăng dần</MenuItem>
              <MenuItem value="basePrice:desc">Giá giảm dần</MenuItem>
            </Select>
          </FormControl>

          {/* Status quick select */}
          <FormControl size="small" sx={{ width: { xs: '100%', md: 170 } }}>
            <Select
              value={statusCode}
              onChange={(e) => handleQuickStatusChange(e.target.value)}
              displayEmpty
              sx={{ bgcolor: '#ffffff', borderRadius: '8px', fontSize: '0.85rem' }}
            >
              <MenuItem value="ALL">Tất cả trạng thái</MenuItem>
              {statuses.map((st) => (
                <MenuItem key={st.id} value={st.code}>
                  {st.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Toggle advanced filter button */}
          <Button
            variant="contained"
            size="small"
            startIcon={<FilterAltIcon sx={{ fontSize: '18px !important' }} />}
            onClick={() => setShowAdvanced(!showAdvanced)}
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              px: 2.5,
              py: 0.9,
              fontWeight: 600,
              width: { xs: '100%', md: 'auto' },
              background: 'linear-gradient(90deg, #1d4ed8 0%, #0284c7 100%)',
              boxShadow: '0 3px 10px rgba(2, 132, 199, 0.3)',
            }}
          >
            Bộ lọc
          </Button>
        </Stack>
      </Stack>

      {/* Advanced Filter Box - Exact 1:1 Match with Figma Frame 215 */}
      <Collapse in={showAdvanced}>
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
          {/* Header title */}
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

          {/* 3 Columns x 2 Rows Grid matching Figma */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(3, 1fr)',
              },
              columnGap: 2.5,
              rowGap: 2.5,
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
                onChange={(e) => setUnitCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyFilter()}
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
                  onChange={(e) => setPhaseId(e.target.value)}
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
                  {DEFAULT_PHASES.map((phase) => (
                    <MenuItem key={phase.id} value={phase.id} sx={{ color: '#1e293b' }}>
                      {phase.name}
                    </MenuItem>
                  ))}
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
                  onChange={(e) => setUnitTypeCode(e.target.value)}
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
                    <MenuItem key={ut.id} value={ut.code} sx={{ color: '#1e293b' }}>
                      {ut.name}
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
                  onChange={(e) => setDirectionCode(e.target.value)}
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
                    <MenuItem key={dir.id} value={dir.code} sx={{ color: '#1e293b' }}>
                      {dir.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* ROW 2 - COL 2: Diện tích (Dropdown Popover) */}
            <Box>
              <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '13px', mb: 0.8 }}>
                Diện tích
              </Typography>
              <Box
                onClick={(e) => setAreaAnchor(e.currentTarget)}
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
                    color: getAreaDisplayLabel() === 'Chọn diện tích' ? '#9ca3af' : '#1e293b',
                  }}
                >
                  {getAreaDisplayLabel()}
                </Typography>
                <KeyboardArrowDownIcon sx={{ color: '#64748b', fontSize: 20 }} />
              </Box>

              {/* Area Popover */}
              <Popover
                open={Boolean(areaAnchor)}
                anchorEl={areaAnchor}
                onClose={() => setAreaAnchor(null)}
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
                {/* Min - Max row */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '11px', color: '#64748b', mb: 0.5, fontWeight: 500 }}>
                      Thấp nhất
                    </Typography>
                    <TextField
                      size="small"
                      type="number"
                      placeholder="0"
                      value={customMinArea}
                      onChange={(e) => {
                        setCustomMinArea(e.target.value);
                        setAreaPreset('');
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
                      value={customMaxArea}
                      onChange={(e) => {
                        setCustomMaxArea(e.target.value);
                        setAreaPreset('');
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

                {/* Radio list header */}
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', mb: 1 }}>
                  Tất cả mức giá
                </Typography>

                <RadioGroup
                  value={areaPreset}
                  onChange={(e) => handleSelectAreaPreset(e.target.value)}
                >
                  {AREA_PRESETS.map((preset) => (
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

            {/* ROW 2 - COL 3: Khoảng giá (Dropdown Popover) */}
            <Box>
              <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '13px', mb: 0.8 }}>
                Khoảng giá
              </Typography>
              <Box
                onClick={(e) => setPriceAnchor(e.currentTarget)}
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
                    color: getPriceDisplayLabel() === 'Chọn khoảng giá' ? '#9ca3af' : '#1e293b',
                  }}
                >
                  {getPriceDisplayLabel()}
                </Typography>
                <KeyboardArrowDownIcon sx={{ color: '#64748b', fontSize: 20 }} />
              </Box>

              {/* Price Popover */}
              <Popover
                open={Boolean(priceAnchor)}
                anchorEl={priceAnchor}
                onClose={() => setPriceAnchor(null)}
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
                {/* Min - Max row */}
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
                        setCustomMinPrice(e.target.value);
                        setPricePreset('');
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
                        setCustomMaxPrice(e.target.value);
                        setPricePreset('');
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

                {/* Radio list header */}
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', mb: 1 }}>
                  Tất cả mức giá
                </Typography>

                <RadioGroup
                  value={pricePreset}
                  onChange={(e) => handleSelectPricePreset(e.target.value)}
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
          </Box>

          {/* Action buttons (Frame 215: Đóng and Tìm kiếm) */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 1.5,
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              onClick={() => setShowAdvanced(false)}
              sx={{
                textTransform: 'none',
                borderRadius: '6px',
                px: 3.5,
                py: 0.9,
                fontWeight: 600,
                fontSize: '13.5px',
                bgcolor: '#c2cad4',
                color: '#334155',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#b0b8c2',
                  boxShadow: 'none',
                },
              }}
            >
              Đóng
            </Button>
            <Button
              variant="contained"
              onClick={handleApplyFilter}
              disabled={isLoading}
              sx={{
                textTransform: 'none',
                borderRadius: '6px',
                px: 3.5,
                py: 0.9,
                fontWeight: 600,
                fontSize: '13.5px',
                bgcolor: '#0288d1',
                color: '#ffffff',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#0277bd',
                  boxShadow: 'none',
                },
              }}
            >
              {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
            </Button>
          </Box>
        </Paper>
      </Collapse>
    </Container>
  );
};
