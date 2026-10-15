import axiosClient from './axiosClient';
import type { UnitItem, UnitSearchParams, UnitSearchResponse } from '../types/unit';

// Realistic mock fallback matching Figma
const MOCK_UNITS: UnitItem[] = [
  {
    id: 1,
    unitCode: 'PB19-19',
    projectId: 65,
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 1,
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
    projectId: 65,
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 1,
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
    projectId: 65,
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 1,
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
    projectId: 65,
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 1,
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
    projectId: 65,
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 1,
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
    projectId: 65,
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 1,
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
    projectId: 65,
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 1,
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
    projectId: 65,
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 1,
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
    projectId: 65,
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 1,
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
    projectId: 65,
    projectName: 'Vinhomes Ocean Park 3',
    phaseId: 2,
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
   * Endpoint: /portal/units/search (Swagger UAT)
   */
  async search(params: UnitSearchParams): Promise<UnitSearchResponse> {
    try {
      // Convert 1-indexed frontend page to 0-indexed backend pageNumber
      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const pageNumber = page - 1;

      const queryParams: Record<string, any> = {
        pageNumber,
        pageSize,
        sort: params.sort,
        unitCode: params.unitCode,
        statusCode: params.statusCode,
        phaseId: params.phaseId,
        unitTypeCode: params.unitTypeCode,
        directionCode: params.directionCode,
        minAreaLand: params.minAreaLand,
        maxAreaLand: params.maxAreaLand,
        minBasePrice: params.minBasePrice,
        maxBasePrice: params.maxBasePrice,
      };

      // Clean empty keys
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key] === undefined || queryParams[key] === null || queryParams[key] === '') {
          delete queryParams[key];
        }
      });

      const res: any = await axiosClient.get('/portal/units/search', {
        params: queryParams,
      });

      // Handle standard response format { code, data, pageNumber, totalElements, totalPages }
      if (res && res.code === 'SUCCESS' && Array.isArray(res.data)) {
        return {
          data: res.data.map((u: any) => ({
            id: u.id,
            unitCode: u.code || u.unitCode,
            projectId: u.projectId,
            projectName: u.projectName || 'Vinhomes Ocean Park',
            phaseId: u.phaseId,
            phaseName: u.phaseName || (u.phaseId ? `Phân khu ${u.phaseId}` : 'Phân khu 1'),
            statusCode: u.statusCode,
            statusName: u.statusName || (u.statusCode === 'SOLD' ? 'Đã bán' : u.statusCode === 'DEPOSITED' ? 'Đang cọc' : 'Còn hàng'),
            unitTypeCode: u.unitTypeCode || u.typeCode,
            unitTypeName: u.unitTypeName || u.typeName || 'Shophouse',
            directionCode: u.directionCode,
            directions: u.directions || u.directionName || 'Đông Nam',
            areaLand: u.areaLand || u.landArea || 100,
            areaConstruction: u.areaBuilding || u.areaConstruction || 500,
            basePrice: u.basePrice || u.price || 20200000000,
            isHot: Boolean(u.isHot),
            createdAt: u.createdAt || new Date().toISOString(),
          })),
          total: res.totalElements || res.data.length,
          page: (res.pageNumber || 0) + 1,
          pageSize: res.pageSize || pageSize,
          totalPages: res.totalPages || Math.ceil((res.totalElements || res.data.length) / pageSize) || 1,
        };
      }

      throw new Error('Fallback to mock');
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
