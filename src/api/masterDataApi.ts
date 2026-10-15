import axiosClient from './axiosClient';
import type { MasterDataItem, ProjectItem } from '../types/masterData';

// Fallback master data in case network fails
export const FALLBACK_UNIT_STATUS: MasterDataItem[] = [
  { id: '1', code: 'AVAILABLE', name: 'Còn hàng', groupCode: 'UNIT_STATUS' },
  { id: '2', code: 'DEPOSITED', name: 'Đang cọc', groupCode: 'UNIT_STATUS' },
  { id: '3', code: 'SOLD', name: 'Đã bán', groupCode: 'UNIT_STATUS' },
];

export const FALLBACK_UNIT_TYPES: MasterDataItem[] = [
  { id: '1', code: 'SHOPHOUSE', name: 'Shophouse', groupCode: 'UNIT_TYPE' },
  { id: '2', code: 'VILLA_SINGLE', name: 'Biệt thự đơn lập', groupCode: 'UNIT_TYPE' },
  { id: '3', code: 'VILLA_DUPLEX', name: 'Biệt thự song lập', groupCode: 'UNIT_TYPE' },
  { id: '4', code: 'TOWNHOUSE', name: 'Liền kề', groupCode: 'UNIT_TYPE' },
  { id: '5', code: 'APARTMENT', name: 'Căn hộ chung cư', groupCode: 'UNIT_TYPE' },
];

export const FALLBACK_DIRECTIONS: MasterDataItem[] = [
  { id: '1', code: 'EAST', name: 'Đông', groupCode: 'DIRECTION' },
  { id: '2', code: 'WEST', name: 'Tây', groupCode: 'DIRECTION' },
  { id: '3', code: 'SOUTH', name: 'Nam', groupCode: 'DIRECTION' },
  { id: '4', code: 'NORTH', name: 'Bắc', groupCode: 'DIRECTION' },
  { id: '5', code: 'SOUTHEAST', name: 'Đông Nam', groupCode: 'DIRECTION' },
  { id: '6', code: 'NORTHEAST', name: 'Đông Bắc', groupCode: 'DIRECTION' },
  { id: '7', code: 'SOUTHWEST', name: 'Tây Nam', groupCode: 'DIRECTION' },
  { id: '8', code: 'NORTHWEST', name: 'Tây Bắc', groupCode: 'DIRECTION' },
];

export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: 65,
    code: 'DA-063',
    name: 'Vinhomes Ocean Park 2 & 3',
    phases: [
      { id: 1, code: 'PHASE_1', name: 'Phân khu 1 (Thời Đại)', projectId: 65 },
      { id: 2, code: 'PHASE_2', name: 'Phân khu 2 (Vịnh Thiên Đường)', projectId: 65 },
      { id: 3, code: 'PHASE_3', name: 'Phân khu 3 (Phố Biển)', projectId: 65 },
      { id: 4, code: 'PHASE_4', name: 'Phân khu 4 (Ánh Dương)', projectId: 65 },
    ],
  },
];

export const masterDataApi = {
  /**
   * Fetch Master Data list by groupCode: UNIT_STATUS, UNIT_TYPE, DIRECTION
   * Endpoint: /master-data/list?groupCode=...
   */
  async getByGroupCode(groupCode: 'UNIT_STATUS' | 'UNIT_TYPE' | 'DIRECTION'): Promise<MasterDataItem[]> {
    try {
      const res: any = await axiosClient.get(`/master-data/list?groupCode=${groupCode}`);
      const rawList = res?.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(rawList) && rawList.length > 0) {
        return rawList.map((item: any, idx: number) => ({
          id: item.id || item.code || idx,
          code: item.code,
          name: item.value || item.name || item.description || item.code,
          groupCode: item.groupCode || groupCode,
          orderNumber: item.sortOrder,
        }));
      }
      throw new Error('Empty master data list');
    } catch {
      if (groupCode === 'UNIT_STATUS') return FALLBACK_UNIT_STATUS;
      if (groupCode === 'UNIT_TYPE') return FALLBACK_UNIT_TYPES;
      if (groupCode === 'DIRECTION') return FALLBACK_DIRECTIONS;
      return [];
    }
  },

  /**
   * Fetch Project & Phase List
   * Endpoint: /portal/projects/search
   */
  async getProjects(): Promise<ProjectItem[]> {
    try {
      const res: any = await axiosClient.get('/portal/projects/search?pageNumber=0&pageSize=20');
      const projects = res?.data || [];
      if (Array.isArray(projects) && projects.length > 0) {
        return projects.map((p: any) => ({
          id: p.id,
          code: p.code,
          name: p.name,
          phases: [
            { id: 1, code: 'PHASE_1', name: 'Phân khu 1', projectId: p.id },
            { id: 2, code: 'PHASE_2', name: 'Phân khu 2', projectId: p.id },
            { id: 3, code: 'PHASE_3', name: 'Phân khu 3', projectId: p.id },
          ],
        }));
      }
      return FALLBACK_PROJECTS;
    } catch {
      return FALLBACK_PROJECTS;
    }
  },

  /**
   * Fetch Phases by projectId
   * Endpoint: /portal/phases/list?projectId=...
   */
  async getPhasesByProjectId(projectId: string | number) {
    try {
      const res: any = await axiosClient.get(`/portal/phases/list?projectId=${projectId}`);
      return res?.data || [];
    } catch {
      return [];
    }
  },
};
