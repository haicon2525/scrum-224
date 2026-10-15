import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Collapse,
  Stack,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { masterDataApi } from '../../api/masterDataApi';
import type { MasterDataItem, ProjectItem } from '../../types/masterData';
import type { UnitSearchParams, SortOptionValue } from '../../types/unit';

interface MuiUnitFilterProps {
  onSearch: (params: UnitSearchParams) => void;
  isLoading?: boolean;
}

export const MuiUnitFilter: React.FC<MuiUnitFilterProps> = ({ onSearch, isLoading }) => {
  const [showAdvanced, setShowAdvanced] = useState(true);

  // Master data states
  const [statuses, setStatuses] = useState<MasterDataItem[]>([]);
  const [unitTypes, setUnitTypes] = useState<MasterDataItem[]>([]);
  const [directions, setDirections] = useState<MasterDataItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  // Filter form state
  const [sort, setSort] = useState<SortOptionValue>('isHot:desc,createdAt:desc');
  const [statusCode, setStatusCode] = useState<string>('ALL');
  const [unitCode, setUnitCode] = useState<string>('');
  const [phaseId, setPhaseId] = useState<string>('ALL');
  const [unitTypeCode, setUnitTypeCode] = useState<string>('ALL');
  const [directionCode, setDirectionCode] = useState<string>('ALL');
  const [areaRange, setAreaRange] = useState<string>('ALL');
  const [priceRange, setPriceRange] = useState<string>('ALL');

  useEffect(() => {
    // Call Master Data APIs
    const fetchMasterData = async () => {
      try {
        const [stList, utList, dirList, projList] = await Promise.all([
          masterDataApi.getByGroupCode('UNIT_STATUS'),
          masterDataApi.getByGroupCode('UNIT_TYPE'),
          masterDataApi.getByGroupCode('DIRECTION'),
          masterDataApi.getProjects(),
        ]);
        setStatuses(stList);
        setUnitTypes(utList);
        setDirections(dirList);
        setProjects(projList);
      } catch (err) {
        console.error('Failed to load master data:', err);
      }
    };

    fetchMasterData();
  }, []);

  const handleApplyFilter = () => {
    const params: UnitSearchParams = {
      sort,
      statusCode: statusCode !== 'ALL' ? statusCode : undefined,
      unitCode: unitCode.trim() || undefined,
      phaseId: phaseId !== 'ALL' ? phaseId : undefined,
      unitTypeCode: unitTypeCode !== 'ALL' ? unitTypeCode : undefined,
      directionCode: directionCode !== 'ALL' ? directionCode : undefined,
      page: 1,
    };
    onSearch(params);
  };

  const handleQuickSortChange = (newSort: SortOptionValue) => {
    setSort(newSort);
    onSearch({
      sort: newSort,
      statusCode: statusCode !== 'ALL' ? statusCode : undefined,
      unitCode: unitCode.trim() || undefined,
      phaseId: phaseId !== 'ALL' ? phaseId : undefined,
      unitTypeCode: unitTypeCode !== 'ALL' ? unitTypeCode : undefined,
      directionCode: directionCode !== 'ALL' ? directionCode : undefined,
      page: 1,
    });
  };

  const handleQuickStatusChange = (newStatus: string) => {
    setStatusCode(newStatus);
    onSearch({
      sort,
      statusCode: newStatus !== 'ALL' ? newStatus : undefined,
      unitCode: unitCode.trim() || undefined,
      phaseId: phaseId !== 'ALL' ? phaseId : undefined,
      unitTypeCode: unitTypeCode !== 'ALL' ? unitTypeCode : undefined,
      directionCode: directionCode !== 'ALL' ? directionCode : undefined,
      page: 1,
    });
  };

  const currentPhases = projects[0]?.phases || [];

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      {/* Title & Quick Controls Bar */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
          BẢNG HÀNG
        </Typography>

        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Sort selector */}
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select
              value={sort}
              onChange={(e) => handleQuickSortChange(e.target.value as SortOptionValue)}
              displayEmpty
              sx={{ bgcolor: '#ffffff', borderRadius: 2 }}
            >
              <MenuItem value="isHot:desc,createdAt:desc">Sắp xếp theo mặc định</MenuItem>
              <MenuItem value="createdAt:desc">Mới nhất</MenuItem>
              <MenuItem value="createdAt:asc">Cũ nhất</MenuItem>
              <MenuItem value="basePrice:asc">Giá tăng dần</MenuItem>
              <MenuItem value="basePrice:desc">Giá giảm dần</MenuItem>
            </Select>
          </FormControl>

          {/* Status quick select */}
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value={statusCode}
              onChange={(e) => handleQuickStatusChange(e.target.value)}
              displayEmpty
              sx={{ bgcolor: '#ffffff', borderRadius: 2 }}
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
            startIcon={<FilterAltIcon />}
            onClick={() => setShowAdvanced(!showAdvanced)}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
              py: 0.9,
              fontWeight: 600,
            }}
          >
            Bộ lọc
          </Button>
        </Stack>
      </Stack>

      {/* Advanced Filter Collapse Box */}
      <Collapse in={showAdvanced}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: '1px solid #e2e8f0',
            bgcolor: '#ffffff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 2, fontWeight: 700, color: 'primary.main' }}
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
            {/* Mã căn hộ */}
            <FormControl fullWidth size="small">
              <InputLabel shrink htmlFor="unit-code-input">
                Mã căn hộ
              </InputLabel>
              <TextField
                id="unit-code-input"
                size="small"
                placeholder="Nhập mã căn hộ"
                value={unitCode}
                onChange={(e) => setUnitCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyFilter()}
              />
            </FormControl>

            {/* Phân khu */}
            <FormControl fullWidth size="small">
              <InputLabel id="phase-select-label">Phân khu</InputLabel>
              <Select
                labelId="phase-select-label"
                label="Phân khu"
                value={phaseId}
                onChange={(e) => setPhaseId(e.target.value)}
              >
                <MenuItem value="ALL">Chọn phân khu</MenuItem>
                {currentPhases.map((phase) => (
                  <MenuItem key={phase.id} value={phase.code || phase.id}>
                    {phase.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Loại căn */}
            <FormControl fullWidth size="small">
              <InputLabel id="unittype-select-label">Loại căn</InputLabel>
              <Select
                labelId="unittype-select-label"
                label="Loại căn"
                value={unitTypeCode}
                onChange={(e) => setUnitTypeCode(e.target.value)}
              >
                <MenuItem value="ALL">Chọn loại căn</MenuItem>
                {unitTypes.map((ut) => (
                  <MenuItem key={ut.id} value={ut.code}>
                    {ut.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Hướng đất */}
            <FormControl fullWidth size="small">
              <InputLabel id="direction-select-label">Hướng đất</InputLabel>
              <Select
                labelId="direction-select-label"
                label="Hướng đất"
                value={directionCode}
                onChange={(e) => setDirectionCode(e.target.value)}
              >
                <MenuItem value="ALL">Chọn hướng đất</MenuItem>
                {directions.map((dir) => (
                  <MenuItem key={dir.id} value={dir.code}>
                    {dir.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Diện tích */}
            <FormControl fullWidth size="small">
              <InputLabel id="area-select-label">Diện tích</InputLabel>
              <Select
                labelId="area-select-label"
                label="Diện tích"
                value={areaRange}
                onChange={(e) => setAreaRange(e.target.value)}
              >
                <MenuItem value="ALL">Chọn diện tích</MenuItem>
                <MenuItem value="<100">&lt; 100 m²</MenuItem>
                <MenuItem value="100-200">100 - 200 m²</MenuItem>
                <MenuItem value=">200">&gt; 200 m²</MenuItem>
              </Select>
            </FormControl>

            {/* Khoảng giá */}
            <FormControl fullWidth size="small">
              <InputLabel id="price-select-label">Khoảng giá</InputLabel>
              <Select
                labelId="price-select-label"
                label="Khoảng giá"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <MenuItem value="ALL">Chọn khoảng giá</MenuItem>
                <MenuItem value="<10">&lt; 10 tỷ</MenuItem>
                <MenuItem value="10-20">10 - 20 tỷ</MenuItem>
                <MenuItem value=">20">&gt; 20 tỷ</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Action buttons */}
          <Stack
            direction="row"
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
              sx={{ textTransform: 'none', borderRadius: 2, px: 3, fontWeight: 600 }}
            >
              {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
            </Button>
          </Stack>
        </Paper>
      </Collapse>
    </Container>
  );
};
