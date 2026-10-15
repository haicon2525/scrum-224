import axiosClient from './axiosClient';
import type { MasterDataItem, ProjectItem } from '../types/masterData';

// Fallback mock master data for dev / offline demo
export const MOCK_UNIT_STATUS: MasterDataItem[] = [
  { id: '1', code: 'AVAILABLE', name: 'Còn hàng', groupCode: 'UNIT_STATUS' },
  { id: '2', code: 'DEPOSITED', name: 'Đang cọc', groupCode: 'UNIT_STATUS' },
  { id: '3', code: 'SOLD', name: 'Đã bán', groupCode: 'UNIT_STATUS' },
  { id: '4', code: 'HOLD', name: 'Giữ chỗ', groupCode: 'UNIT_STATUS' },
];

export const MOCK_UNIT_TYPES: MasterDataItem[] = [
  { id: '1', code: 'SHOPHOUSE', name: 'Shophouse', groupCode: 'UNIT_TYPE' },
  { id: '2', code: 'VILLA_SINGLE', name: 'Biệt thự đơn lập', groupCode: 'UNIT_TYPE' },
  { id: '3', code: 'VILLA_DUPLEX', name: 'Biệt thự song lập', groupCode: 'UNIT_TYPE' },
  { id: '4', code: 'TOWNHOUSE', name: 'Liền kề', groupCode: 'UNIT_TYPE' },
  { id: '5', code: 'APARTMENT', name: 'Căn hộ chung cư', groupCode: 'UNIT_TYPE' },
];

export const MOCK_DIRECTIONS: MasterDataItem[] = [
  { id: '1', code: 'EAST', name: 'Đông', groupCode: 'DIRECTION' },
  { id: '2', code: 'WEST', name: 'Tây', groupCode: 'DIRECTION' },
  { id: '3', code: 'SOUTH', name: 'Nam', groupCode: 'DIRECTION' },
  { id: '4', code: 'NORTH', name: 'Bắc', groupCode: 'DIRECTION' },
  { id: '5', code: 'SOUTHEAST', name: 'Đông Nam', groupCode: 'DIRECTION' },
  { id: '6', code: 'NORTHEAST', name: 'Đông Bắc', groupCode: 'DIRECTION' },
  { id: '7', code: 'SOUTHWEST', name: 'Tây Nam', groupCode: 'DIRECTION' },
  { id: '8', code: 'NORTHWEST', name: 'Tây Bắc', groupCode: 'DIRECTION' },
];

export const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: 'vh-op3',
    code: 'VH_OP3',
    name: 'Vinhomes Ocean Park 3',
    phases: [
      { id: 'phase-1', code: 'PHASE_1', name: 'Phân khu 1 (Thời Đại)', projectId: 'vh-op3' },
      { id: 'phase-2', code: 'PHASE_2', name: 'Phân khu 2 (Vịnh Thiên Đường)', projectId: 'vh-op3' },
      { id: 'phase-3', code: 'PHASE_3', name: 'Phân khu 3 (Phố Biển)', projectId: 'vh-op3' },
      { id: 'phase-4', code: 'PHASE_4', name: 'Phân khu 4 (Ánh Dương)', projectId: 'vh-op3' },
      { id: 'phase-5', code: 'PHASE_5', name: 'Phân khu 5 (Vịnh Tây)', projectId: 'vh-op3' },
    ],
  },
];

export const masterDataApi = {
  /**
   * Fetch Master Data list by groupCode: UNIT_STATUS, UNIT_TYPE, DIRECTION
   */
  async getByGroupCode(groupCode: 'UNIT_STATUS' | 'UNIT_TYPE' | 'DIRECTION'): Promise<MasterDataItem[]> {
    try {
      const res = await axiosClient.get<any, MasterDataItem[]>(`/master-data/list?groupCode=${groupCode}`);
      return res;
    } catch {
      // Mock fallback
      if (groupCode === 'UNIT_STATUS') return MOCK_UNIT_STATUS;
      if (groupCode === 'UNIT_TYPE') return MOCK_UNIT_TYPES;
      if (groupCode === 'DIRECTION') return MOCK_DIRECTIONS;
      return [];
    }
  },

  /**
   * Fetch Project & Phase List
   */
  async getProjects(): Promise<ProjectItem[]> {
    try {
      const res = await axiosClient.get<any, ProjectItem[]>('/admin/projects/list');
      return res;
    } catch {
      return MOCK_PROJECTS;
    }
  },
};
