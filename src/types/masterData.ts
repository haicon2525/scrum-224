export interface MasterDataItem {
  id: string | number;
  code: string;
  name: string;
  groupCode: string;
  orderNumber?: number;
}

export interface ProjectItem {
  id: string | number;
  code: string;
  name: string;
  phases?: PhaseItem[];
}

export interface PhaseItem {
  id: string | number;
  code: string;
  name: string;
  projectId: string | number;
}
