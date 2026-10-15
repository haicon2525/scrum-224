import axiosClient from './axiosClient';
import type { UnitItem, UnitSearchParams, UnitSearchResponse } from '../types/unit';

// Realistic mock data reflecting the Figma table
const MOCK_UNITS: UnitItem[] = [
  {
    id: 1,
    unitCode: 'PB19-19',
    projectId: 'vh-op3',
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 'phase-1',
    phaseName: 'Phân khu 1',
    statusCode: 'AVAILABLE',
    statusName: 'Còn hàng',
    unitTypeCode: 'SHOPHOUSE',
    unitTypeName: 'Shophouse',
    directionCode: 'SOUTHEAST',
    directions: ['Đông Nam', 'Nam'],
    areaLand: 100,
    areaConstruction: 500,
    basePrice: 20200000000,
    isHot: true,
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: 2,
    unitCode: 'PB19-20',
    projectId: 'vh-op3',
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 'phase-1',
    phaseName: 'Phân khu 1',
    statusCode: 'AVAILABLE',
    statusName: 'Còn hàng',
    unitTypeCode: 'SHOPHOUSE',
    unitTypeName: 'Shophouse',
    directionCode: 'SOUTHEAST',
    directions: ['Đông Nam'],
    areaLand: 100,
    areaConstruction: 500,
    basePrice: 20200000000,
    isHot: true,
    createdAt: '2025-01-14T09:30:00Z',
  },
  {
    id: 3,
    unitCode: 'PB19-21',
    projectId: 'vh-op3',
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 'phase-1',
    phaseName: 'Phân khu 1',
    statusCode: 'AVAILABLE',
    statusName: 'Còn hàng',
    unitTypeCode: 'SHOPHOUSE',
    unitTypeName: 'Shophouse',
    directionCode: 'SOUTHEAST',
    directions: ['Đông Nam'],
    areaLand: 100,
    areaConstruction: 500,
    basePrice: 20200000000,
    isHot: false,
    createdAt: '2025-01-13T10:00:00Z',
  },
  {
    id: 4,
    unitCode: 'PB19-22',
    projectId: 'vh-op3',
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 'phase-1',
    phaseName: 'Phân khu 1',
    statusCode: 'AVAILABLE',
    statusName: 'Còn hàng',
    unitTypeCode: 'SHOPHOUSE',
    unitTypeName: 'Shophouse',
    directionCode: 'SOUTHEAST',
    directions: ['Đông Nam'],
    areaLand: 100,
    areaConstruction: 500,
    basePrice: 20200000000,
    isHot: false,
    createdAt: '2025-01-12T11:00:00Z',
  },
  {
    id: 5,
    unitCode: 'PB19-23',
    projectId: 'vh-op3',
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 'phase-1',
    phaseName: 'Phân khu 1',
    statusCode: 'AVAILABLE',
    statusName: 'Còn hàng',
    unitTypeCode: 'SHOPHOUSE',
    unitTypeName: 'Shophouse',
    directionCode: 'SOUTHEAST',
    directions: ['Đông Nam'],
    areaLand: 100,
    areaConstruction: 500,
    basePrice: 20200000000,
    isHot: false,
    createdAt: '2025-01-11T14:20:00Z',
  },
  {
    id: 6,
    unitCode: 'PB19-24',
    projectId: 'vh-op3',
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 'phase-1',
    phaseName: 'Phân khu 1',
    statusCode: 'AVAILABLE',
    statusName: 'Còn hàng',
    unitTypeCode: 'SHOPHOUSE',
    unitTypeName: 'Shophouse',
    directionCode: 'SOUTHEAST',
    directions: ['Đông Nam'],
    areaLand: 100,
    areaConstruction: 500,
    basePrice: 20200000000,
    isHot: false,
    createdAt: '2025-01-10T16:00:00Z',
  },
  {
    id: 7,
    unitCode: 'PB19-25',
    projectId: 'vh-op3',
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 'phase-1',
    phaseName: 'Phân khu 1',
    statusCode: 'AVAILABLE',
    statusName: 'Còn hàng',
    unitTypeCode: 'SHOPHOUSE',
    unitTypeName: 'Shophouse',
    directionCode: 'SOUTHEAST',
    directions: ['Đông Nam'],
    areaLand: 100,
    areaConstruction: 500,
    basePrice: 20200000000,
    isHot: false,
    createdAt: '2025-01-09T08:15:00Z',
  },
  {
    id: 8,
    unitCode: 'PB19-26',
    projectId: 'vh-op3',
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 'phase-1',
    phaseName: 'Phân khu 1',
    statusCode: 'SOLD',
    statusName: 'Đã bán',
    unitTypeCode: 'SHOPHOUSE',
    unitTypeName: 'Shophouse',
    directionCode: 'SOUTHEAST',
    directions: ['Đông Nam'],
    areaLand: 100,
    areaConstruction: 500,
    basePrice: 20200000000,
    isHot: false,
    createdAt: '2025-01-08T10:45:00Z',
  },
  {
    id: 9,
    unitCode: 'PB19-27',
    projectId: 'vh-op3',
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 'phase-1',
    phaseName: 'Phân khu 1',
    statusCode: 'SOLD',
    statusName: 'Đã bán',
    unitTypeCode: 'SHOPHOUSE',
    unitTypeName: 'Shophouse',
    directionCode: 'SOUTHEAST',
    directions: ['Đông Nam'],
    areaLand: 100,
    areaConstruction: 500,
    basePrice: 20200000000,
    isHot: false,
    createdAt: '2025-01-07T11:20:00Z',
  },
  {
    id: 10,
    unitCode: 'TD12-08',
    projectId: 'vh-op3',
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 'phase-2',
    phaseName: 'Phân khu 2',
    statusCode: 'DEPOSITED',
    statusName: 'Đang cọc',
    unitTypeCode: 'VILLA_SINGLE',
    unitTypeName: 'Biệt thự đơn lập',
    directionCode: 'SOUTHWEST',
    directions: ['Tây Nam', 'Tây'],
    areaLand: 280,
    areaConstruction: 620,
    basePrice: 38500000000,
    isHot: true,
    createdAt: '2025-01-06T15:00:00Z',
  },
];

export const unitApi = {
  /**
   * Search units by criteria
   * Endpoint: /portal/unit/search
   */
  async search(params: UnitSearchParams): Promise<UnitSearchResponse> {
    try {
      const res = await axiosClient.get<any, UnitSearchResponse>('/portal/unit/search', {
        params,
      });
      return res;
    } catch {
      // Mock search & filter handling
      let result = [...MOCK_UNITS];

      if (params.unitCode) {
        const q = params.unitCode.toLowerCase().trim();
        result = result.filter((u) => u.unitCode.toLowerCase().includes(q));
      }

      if (params.statusCode && params.statusCode !== 'ALL') {
        result = result.filter((u) => u.statusCode === params.statusCode);
      }

      if (params.phaseId && params.phaseId !== 'ALL') {
        result = result.filter((u) => String(u.phaseId) === String(params.phaseId));
      }

      if (params.unitTypeCode && params.unitTypeCode !== 'ALL') {
        result = result.filter((u) => u.unitTypeCode === params.unitTypeCode);
      }

      if (params.directionCode && params.directionCode !== 'ALL') {
        result = result.filter((u) => u.directionCode === params.directionCode);
      }

      // Sorting
      if (params.sort) {
        switch (params.sort) {
          case 'isHot:desc,createdAt:desc':
            result.sort((a, b) => (b.isHot === a.isHot ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : b.isHot ? 1 : -1));
            break;
          case 'createdAt:desc':
            result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'createdAt:asc':
            result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
          case 'basePrice:asc':
            result.sort((a, b) => a.basePrice - b.basePrice);
            break;
          case 'basePrice:desc':
            result.sort((a, b) => b.basePrice - a.basePrice);
            break;
        }
      }

      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const total = result.length;
      const totalPages = Math.ceil(total / pageSize) || 1;
      const paginatedData = result.slice((page - 1) * pageSize, page * pageSize);

      return {
        data: paginatedData,
        total,
        page,
        pageSize,
        totalPages,
      };
    }
  },
};
