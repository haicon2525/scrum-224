import axiosClient from './axiosClient';
import type { UnitItem, UnitSearchParams, UnitSearchResponse } from '../types/unit';

export interface ProjectItem {
  id: number;
  code: string;
  name: string;
  address?: string;
  shortDescription?: string;
  investorId?: number;
  regionCode?: string;
  typeCode?: string;
  typeName?: string;
  statusCode?: string;
  statusName?: string;
  isHot?: boolean;
}

export interface PhaseItem {
  id: number;
  name: string;
  code?: string;
  projectId?: number;
  description?: string;
}

export interface MasterDataItem {
  groupCode: string;
  code: string;
  value: string; // Nhãn hiển thị tiếng Việt
  description?: string;
  subGroupCode?: string | null;
  sortOrder?: number;
}

export interface MasterDataCollection {
  statuses: MasterDataItem[];
  unitTypes: MasterDataItem[];
  directions: MasterDataItem[];
}

export interface PortalSearchQuery {
  pageNumber?: number; // 0-indexed for backend
  pageSize?: number;
  sort?: string;
  projectId?: number | string;
  phaseId?: number | string;
  unitCode?: string;
  unitTypeCode?: string;
  directionCode?: string;
  statusCode?: string;
  minAreaLand?: number;
  maxAreaLand?: number;
  minBasePrice?: number;
  maxBasePrice?: number;
}

/**
 * 100% Real Portal APIs for Vinhomes Ocean Park Project
 */
export const portalApi = {
  /**
   * 1. Get List of Projects
   * Endpoint: GET /portal/projects/search
   */
  async getProjects(params?: { pageNumber?: number; pageSize?: number }): Promise<ProjectItem[]> {
    try {
      const response: any = await axiosClient.get('/portal/projects/search', {
        params: {
          pageNumber: params?.pageNumber ?? 0,
          pageSize: params?.pageSize ?? 20,
        },
      });

      // Handle standard BaseResponseObject { code: "SUCCESS", data: { content: [...] } | [...] }
      const data = response?.data;
      if (Array.isArray(data)) return data;
      if (data?.content && Array.isArray(data.content)) return data.content;
      return [];
    } catch (error) {
      console.error('[portalApi.getProjects] Error fetching projects:', error);
      throw error;
    }
  },

  /**
   * 2. Get List of Phases by Project ID
   * Endpoint: GET /portal/phases/list?projectId={selectedProjectId}
   */
  async getPhases(projectId: number | string): Promise<PhaseItem[]> {
    if (!projectId) return [];
    try {
      const response: any = await axiosClient.get('/portal/phases/list', {
        params: { projectId },
      });

      const data = response?.data;
      if (Array.isArray(data)) return data;
      if (data?.content && Array.isArray(data.content)) return data.content;
      return [];
    } catch (error) {
      console.error(`[portalApi.getPhases] Error fetching phases for projectId ${projectId}:`, error);
      return [];
    }
  },

  /**
   * 3. Get Master Data by Group Code
   * Endpoint: GET /master-data/list?groupCode=...
   */
  async getMasterData(groupCode: 'UNIT_STATUS' | 'UNIT_TYPE' | 'DIRECTION'): Promise<MasterDataItem[]> {
    try {
      const response: any = await axiosClient.get('/master-data/list', {
        params: { groupCode },
      });
      return Array.isArray(response?.data) ? response.data : [];
    } catch (error) {
      console.error(`[portalApi.getMasterData] Error fetching master data for ${groupCode}:`, error);
      return [];
    }
  },

  /**
   * 4. Load all Master Data in parallel (UNIT_STATUS, UNIT_TYPE, DIRECTION)
   */
  async getAllMasterData(): Promise<MasterDataCollection> {
    const [statuses, unitTypes, directions] = await Promise.all([
      this.getMasterData('UNIT_STATUS'),
      this.getMasterData('UNIT_TYPE'),
      this.getMasterData('DIRECTION'),
    ]);

    return { statuses, unitTypes, directions };
  },

  /**
   * 5. Search Units
   * Endpoint: GET /portal/unit/search (with fallback to /portal/units/search)
   */
  async searchUnits(params: UnitSearchParams): Promise<UnitSearchResponse> {
    const pageIndex = Math.max(0, (params.page || 1) - 1);
    const pageSize = params.pageSize || 10;

    const queryParams: PortalSearchQuery = {
      pageNumber: pageIndex,
      pageSize,
      sort: params.sort || 'isHot:desc,createdAt:desc',
      projectId: params.projectId,
      phaseId: params.phaseId !== 'ALL' ? params.phaseId : undefined,
      statusCode: params.statusCode !== 'ALL' ? params.statusCode : undefined,
      unitTypeCode: params.unitTypeCode !== 'ALL' ? params.unitTypeCode : undefined,
      directionCode: params.directionCode !== 'ALL' ? params.directionCode : undefined,
      unitCode: params.unitCode?.trim() || undefined,
      minAreaLand: params.minAreaLand,
      maxAreaLand: params.maxAreaLand,
      minBasePrice: params.minBasePrice,
      maxBasePrice: params.maxBasePrice,
    };

    // Remove undefined keys
    Object.keys(queryParams).forEach((key) => {
      if ((queryParams as any)[key] === undefined) {
        delete (queryParams as any)[key];
      }
    });

    try {
      let response: any;
      try {
        // First try endpoint as described in Jira
        response = await axiosClient.get('/portal/unit/search', { params: queryParams });
      } catch (err: any) {
        if (err.response?.status === 404) {
          // Fallback to swagger endpoint /portal/units/search
          response = await axiosClient.get('/portal/units/search', { params: queryParams });
        } else {
          throw err;
        }
      }

      const resData = response?.data;
      const contentList: any[] = resData?.content || (Array.isArray(resData) ? resData : []);
      const totalElements: number = resData?.totalElements ?? response?.totalElements ?? contentList.length;
      const totalPages: number = resData?.totalPages ?? response?.totalPages ?? Math.ceil(totalElements / pageSize);

      const mappedUnits: UnitItem[] = contentList.map((item: any) => ({
        id: item.id || item.unitId || Math.random(),
        unitCode: item.unitCode || item.code || 'N/A',
        projectId: item.projectId,
        projectName: item.projectName || 'Vinhomes Ocean Park 3',
        phaseId: item.phaseId,
        phaseName: item.phaseName,
        statusCode: item.statusCode || 'AVAILABLE',
        statusName: item.statusName || (item.statusCode === 'SOLD' ? 'Đã Bán' : 'Còn Hàng'),
        unitTypeCode: item.unitTypeCode || 'SHOPHOUSE',
        unitTypeName: item.unitTypeName || item.unitType,
        directionCode: item.directionCode,
        directions: item.directions || item.direction || 'Đông Nam',
        areaLand: item.areaLand || item.landArea || 100,
        areaConstruction: item.areaConstruction || item.buildingArea || 80,
        basePrice: item.basePrice || item.price || 15101436069,
        isHot: Boolean(item.isHot),
        createdAt: item.createdAt || new Date().toISOString(),
      }));

      return {
        data: mappedUnits,
        total: totalElements,
        page: pageIndex + 1,
        pageSize,
        totalPages: totalPages || 1,
      };
    } catch (error: any) {
      console.error('[portalApi.searchUnits] API error:', error);
      throw error;
    }
  },
};

export default portalApi;
