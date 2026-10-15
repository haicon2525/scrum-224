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
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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
  const [areaRange, setAreaRange] = useState<string>('ALL');
  const [priceRange, setPriceRange] = useState<string>('ALL');

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
    if (areaRange === '<100') {
      maxArea = 100;
    } else if (areaRange === '100-200') {
      minArea = 100;
      maxArea = 200;
    } else if (areaRange === '>200') {
      minArea = 200;
    }

    let minPrice: number | undefined;
    let maxPrice: number | undefined;
    if (priceRange === '<10') {
      maxPrice = 10000000000;
    } else if (priceRange === '10-20') {
      minPrice = 10000000000;
      maxPrice = 20000000000;
    } else if (priceRange === '>20') {
      minPrice = 20000000000;
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

  const handleResetFilter = () => {
    setUnitCode('');
    setPhaseId('ALL');
    setUnitTypeCode('ALL');
    setDirectionCode('ALL');
    setAreaRange('ALL');
    setPriceRange('ALL');
    onSearch({
      sort,
      statusCode: statusCode !== 'ALL' ? statusCode : undefined,
      page: 1,
    });
  };

  const handleQuickSortChange = (newSort: SortOptionValue) => {
    setSort(newSort);
    onSearch(buildSearchParams({ sort: newSort }));
  };

  const handleQuickStatusChange = (newStatus: string) => {
    setStatusCode(newStatus);
    onSearch(buildSearchParams({ statusCode: newStatus !== 'ALL' ? newStatus : undefined }));
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
              sx={{ bgcolor: '#ffffff', borderRadius: 2, fontSize: '0.85rem' }}
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
              sx={{ bgcolor: '#ffffff', borderRadius: 2, fontSize: '0.85rem' }}
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
              borderRadius: 2,
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

      {/* Advanced Filter Collapse Box - Clean Layout matching Figma 1:1 */}
      <Collapse in={showAdvanced}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            mb: 3,
            borderRadius: 3,
            border: '1px solid #e2e8f0',
            bgcolor: '#ffffff',
            boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 2.5, fontWeight: 700, color: 'primary.main', fontSize: '0.85rem' }}
          >
            BỘ LỌC NÂNG CAO
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(6, 1fr)',
              },
              gap: 2,
            }}
          >
            {/* 1. Mã căn hộ */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', mb: 0.8, display: 'block' }}>
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
                  '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '0.85rem' },
                }}
              />
            </Box>

            {/* 2. Phân khu */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', mb: 0.8, display: 'block' }}>
                Phân khu
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={phaseId}
                  onChange={(e) => setPhaseId(e.target.value)}
                  displayEmpty
                  sx={{ bgcolor: '#ffffff', borderRadius: 2, fontSize: '0.85rem' }}
                >
                  <MenuItem value="ALL">Chọn phân khu</MenuItem>
                  {DEFAULT_PHASES.map((phase) => (
                    <MenuItem key={phase.id} value={phase.id}>
                      {phase.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* 3. Loại căn */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', mb: 0.8, display: 'block' }}>
                Loại căn
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={unitTypeCode}
                  onChange={(e) => setUnitTypeCode(e.target.value)}
                  displayEmpty
                  sx={{ bgcolor: '#ffffff', borderRadius: 2, fontSize: '0.85rem' }}
                >
                  <MenuItem value="ALL">Chọn loại căn</MenuItem>
                  {unitTypes.map((ut) => (
                    <MenuItem key={ut.id} value={ut.code}>
                      {ut.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* 4. Hướng đất */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', mb: 0.8, display: 'block' }}>
                Hướng đất
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={directionCode}
                  onChange={(e) => setDirectionCode(e.target.value)}
                  displayEmpty
                  sx={{ bgcolor: '#ffffff', borderRadius: 2, fontSize: '0.85rem' }}
                >
                  <MenuItem value="ALL">Chọn hướng đất</MenuItem>
                  {directions.map((dir) => (
                    <MenuItem key={dir.id} value={dir.code}>
                      {dir.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* 5. Diện tích */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', mb: 0.8, display: 'block' }}>
                Diện tích
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={areaRange}
                  onChange={(e) => setAreaRange(e.target.value)}
                  displayEmpty
                  sx={{ bgcolor: '#ffffff', borderRadius: 2, fontSize: '0.85rem' }}
                >
                  <MenuItem value="ALL">Chọn diện tích</MenuItem>
                  <MenuItem value="<100">&lt; 100 m²</MenuItem>
                  <MenuItem value="100-200">100 - 200 m²</MenuItem>
                  <MenuItem value=">200">&gt; 200 m²</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* 6. Khoảng giá */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', mb: 0.8, display: 'block' }}>
                Khoảng giá
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  displayEmpty
                  sx={{ bgcolor: '#ffffff', borderRadius: 2, fontSize: '0.85rem' }}
                >
                  <MenuItem value="ALL">Chọn khoảng giá</MenuItem>
                  <MenuItem value="<10">&lt; 10 tỷ</MenuItem>
                  <MenuItem value="10-20">10 - 20 tỷ</MenuItem>
                  <MenuItem value=">20">&gt; 20 tỷ</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Action buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{
              justifyContent: 'flex-end',
              mt: 3,
              pt: 2,
              borderTop: '1px solid #f1f5f9',
            }}
          >
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              startIcon={<RestartAltIcon />}
              onClick={handleResetFilter}
              sx={{ textTransform: 'none', borderRadius: 2, color: 'text.secondary' }}
            >
              Đặt lại
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              startIcon={<CloseIcon />}
              onClick={() => setShowAdvanced(false)}
              sx={{ textTransform: 'none', borderRadius: 2, color: 'text.secondary' }}
            >
              Đóng
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<SearchIcon />}
              onClick={handleApplyFilter}
              disabled={isLoading}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3.5,
                fontWeight: 600,
                background: 'linear-gradient(90deg, #1d4ed8 0%, #0284c7 100%)',
                boxShadow: '0 3px 10px rgba(2, 132, 199, 0.3)',
              }}
            >
              {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
            </Button>
          </Stack>
        </Paper>
      </Collapse>
    </Container>
  );
};
