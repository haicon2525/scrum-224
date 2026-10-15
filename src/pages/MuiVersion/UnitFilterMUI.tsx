import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  Stack,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { portalApi, type ProjectItem, type PhaseItem, type MasterDataItem } from '../../api/portalApi';
import type { UnitItem, UnitSearchParams, SortOptionValue } from '../../types/unit';
import { UnitTable } from './UnitTable';
import { UnitListMobile } from './UnitListMobile';
import { useAuth } from '../../contexts/AuthContext';
import { AuthGuardModal } from '../../components/common/AuthGuardModal';
import { BLUR_PREVIEW_UNITS } from './filterConstants';
import { AdvancedFilterPanel } from './AdvancedFilterPanel';

export const UnitFilterMUI: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // State: Projects & Phases
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | ''>('');
  const [phases, setPhases] = useState<PhaseItem[]>([]);

  // State: Master Data
  const [statuses, setStatuses] = useState<MasterDataItem[]>([]);
  const [unitTypes, setUnitTypes] = useState<MasterDataItem[]>([]);
  const [directions, setDirections] = useState<MasterDataItem[]>([]);

  // State: Filter criteria
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [sort, setSort] = useState<SortOptionValue>('isHot:desc,createdAt:desc');
  const [statusCode, setStatusCode] = useState<string>('ALL');
  const [unitCode, setUnitCode] = useState<string>('');
  const [phaseId, setPhaseId] = useState<string>('ALL');
  const [unitTypeCode, setUnitTypeCode] = useState<string>('ALL');
  const [directionCode, setDirectionCode] = useState<string>('ALL');

  // Filter Area & Price states
  const [areaPreset, setAreaPreset] = useState<string>('ALL');
  const [customMinArea, setCustomMinArea] = useState<string>('');
  const [customMaxArea, setCustomMaxArea] = useState<string>('');

  const [pricePreset, setPricePreset] = useState<string>('ALL');
  const [customMinPrice, setCustomMinPrice] = useState<string>('');
  const [customMaxPrice, setCustomMaxPrice] = useState<string>('');

  // State: Units list, pagination, and status
  const [units, setUnits] = useState<UnitItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  // 1. Load Projects on Mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projList = await portalApi.getProjects({ pageNumber: 0, pageSize: 20 });
        setProjects(projList);

        if (projList.length > 0) {
          const matchProject = projList.find(
            (p) =>
              p.name.toLowerCase().includes('ocean park 3') ||
              p.name.toLowerCase().includes('ocean park 2 & 3') ||
              p.name.toLowerCase().includes('ocean park')
          );
          setSelectedProjectId(matchProject ? matchProject.id : projList[0].id);
        }
      } catch (err: any) {
        console.error('Failed to load projects:', err);
      }
    };

    fetchProjects();
  }, []);

  // 2. Load Phases whenever selectedProjectId changes
  useEffect(() => {
    if (!selectedProjectId) {
      setPhases([]);
      return;
    }

    const fetchPhases = async () => {
      try {
        const phaseList = await portalApi.getPhases(selectedProjectId);
        setPhases(phaseList);
        setPhaseId('ALL');
      } catch (err: any) {
        console.error('Failed to load phases:', err);
        setPhases([]);
      }
    };

    fetchPhases();
  }, [selectedProjectId]);

  // 3. Load Master Data (UNIT_STATUS, UNIT_TYPE, DIRECTION in parallel)
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const { statuses: st, unitTypes: ut, directions: dir } = await portalApi.getAllMasterData();
        setStatuses(st);
        setUnitTypes(ut);
        setDirections(dir);
      } catch (err: any) {
        console.error('Failed to load master data:', err);
      }
    };

    fetchMasterData();
  }, []);

  // Compute Area / Price numbers for API payload
  const computedAreaRange = useMemo(() => {
    let minArea: number | undefined;
    let maxArea: number | undefined;
    if (customMinArea) minArea = parseFloat(customMinArea);
    if (customMaxArea) maxArea = parseFloat(customMaxArea);
    return { minArea, maxArea };
  }, [customMinArea, customMaxArea]);

  const computedPriceRange = useMemo(() => {
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
    return { minPrice, maxPrice };
  }, [customMinPrice, customMaxPrice]);

  // 4. Fetch Units Function
  const fetchUnits = useCallback(
    async (currentPage: number, overrides?: Partial<UnitSearchParams>) => {
      if (!selectedProjectId && projects.length > 0) return;

      setLoading(true);
      setError(null);

      const params: UnitSearchParams = {
        projectId: undefined,
        phaseId: phaseId !== 'ALL' ? phaseId : undefined,
        statusCode: statusCode !== 'ALL' ? statusCode : undefined,
        unitTypeCode: unitTypeCode !== 'ALL' ? unitTypeCode : undefined,
        directionCode: directionCode !== 'ALL' ? directionCode : undefined,
        unitCode: unitCode.trim() || undefined,
        minAreaLand: computedAreaRange.minArea,
        maxAreaLand: computedAreaRange.maxArea,
        minBasePrice: computedPriceRange.minPrice,
        maxBasePrice: computedPriceRange.maxPrice,
        sort,
        page: currentPage,
        pageSize: 10,
        ...overrides,
      };

      try {
        const res = await portalApi.searchUnits(params);
        setUnits(res.data);
        setPage(res.page);
        setTotalPages(res.totalPages);
        setTotal(res.total);
      } catch (err: any) {
        console.error('Error fetching units from API:', err);
        if (err.response?.status === 401) {
          setError('Phiên làm việc đã hết hạn hoặc bạn cần đăng nhập để xem dữ liệu quỹ căn.');
        } else {
          setError('Không thể tải dữ liệu quỹ căn từ máy chủ. Vui lòng thử lại sau.');
        }
      } finally {
        setLoading(false);
      }
    },
    [
      selectedProjectId,
      projects.length,
      phaseId,
      statusCode,
      unitTypeCode,
      directionCode,
      unitCode,
      computedAreaRange,
      computedPriceRange,
      sort,
    ]
  );

  // Trigger search on projectId change or when authenticated
  useEffect(() => {
    if (selectedProjectId && isAuthenticated) {
      fetchUnits(1);
    }
  }, [selectedProjectId, isAuthenticated, fetchUnits]);

  // Quick Handlers
  const handleQuickSortChange = (newSort: SortOptionValue) => {
    setSort(newSort);
    fetchUnits(1, { sort: newSort });
  };

  const handleQuickStatusChange = (newStatus: string) => {
    setStatusCode(newStatus);
    fetchUnits(1, { statusCode: newStatus !== 'ALL' ? newStatus : undefined });
  };

  // Preview units behind blur when unauthenticated
  const displayUnits = !isAuthenticated && units.length === 0 ? BLUR_PREVIEW_UNITS : units;

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: 2.5, md: 3.5 },
        mb: 4,
        position: 'relative',
        minHeight: !isAuthenticated ? 700 : 'auto',
      }}
    >
      {/* Content wrapper with blur filter when unauthenticated */}
      <Box
        sx={{
          filter: !isAuthenticated ? 'blur(8px)' : 'none',
          opacity: !isAuthenticated ? 0.75 : 1,
          pointerEvents: !isAuthenticated ? 'none' : 'auto',
          userSelect: !isAuthenticated ? 'none' : 'auto',
          transition: 'filter 0.3s ease, opacity 0.3s ease',
        }}
      >
        {/* Title & Quick Controls Bar */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            width: '100%',
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: 'primary.main',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            BẢNG HÀNG
          </Typography>

          {/* Quick controls: Sort + Status + Toggle Button */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={1.5}
            sx={{
              alignItems: 'stretch',
              justifyContent: 'flex-end',
              width: { xs: '100%', md: 'auto' },
              ml: { md: 'auto' },
            }}
          >
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

            <FormControl size="small" sx={{ width: { xs: '100%', md: 170 } }}>
              <Select
                value={statusCode}
                onChange={(e) => handleQuickStatusChange(e.target.value)}
                displayEmpty
                sx={{ bgcolor: '#ffffff', borderRadius: '8px', fontSize: '0.85rem' }}
              >
                <MenuItem value="ALL">Tất cả trạng thái</MenuItem>
                {statuses.map((st) => (
                  <MenuItem key={st.code} value={st.code}>
                    {st.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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

        {/* 6 Columns Advanced Filter Panel */}
        <AdvancedFilterPanel
          open={showAdvanced}
          unitCode={unitCode}
          phaseId={phaseId}
          unitTypeCode={unitTypeCode}
          directionCode={directionCode}
          phases={phases}
          unitTypes={unitTypes}
          directions={directions}
          customMinArea={customMinArea}
          customMaxArea={customMaxArea}
          areaPreset={areaPreset}
          customMinPrice={customMinPrice}
          customMaxPrice={customMaxPrice}
          pricePreset={pricePreset}
          loading={loading}
          onUnitCodeChange={setUnitCode}
          onPhaseIdChange={setPhaseId}
          onUnitTypeCodeChange={setUnitTypeCode}
          onDirectionCodeChange={setDirectionCode}
          onMinAreaChange={setCustomMinArea}
          onMaxAreaChange={setCustomMaxArea}
          onAreaPresetChange={setAreaPreset}
          onMinPriceChange={setCustomMinPrice}
          onMaxPriceChange={setCustomMaxPrice}
          onPricePresetChange={setPricePreset}
          onClose={() => setShowAdvanced(false)}
          onApply={() => fetchUnits(1)}
        />

        {/* Error Alert */}
        {error && (
          <Alert severity="warning" sx={{ mb: 2.5, borderRadius: '8px' }}>
            {error}
          </Alert>
        )}

        {/* Responsive View Switcher: Desktop -> UnitTable, Mobile -> UnitListMobile */}
        {isMobile ? (
          <UnitListMobile
            units={displayUnits}
            isLoading={loading}
            page={page}
            totalPages={totalPages}
            total={total || displayUnits.length}
            onPageChange={(p) => fetchUnits(p)}
          />
        ) : (
          <UnitTable
            units={displayUnits}
            isLoading={loading}
            page={page}
            totalPages={totalPages}
            total={total || displayUnits.length}
            onPageChange={(p) => fetchUnits(p)}
          />
        )}
      </Box>

      {/* AuthGuard Modal overlay if not authenticated */}
      {!isAuthLoading && !isAuthenticated && <AuthGuardModal />}
    </Container>
  );
};

export default UnitFilterMUI;
