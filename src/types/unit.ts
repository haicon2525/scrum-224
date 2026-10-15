export interface UnitItem {
  id: string | number;
  unitCode: string;
  projectId: string | number;
  projectName?: string;
  phaseId?: string | number;
  phaseName?: string;
  statusCode: string;
  statusName?: string;
  unitTypeCode: string;
  unitTypeName?: string;
  directionCode?: string;
  directions?: string[] | string;
  areaLand: number; // in m2
  areaConstruction?: number; // in m2
  basePrice: number; // in VND
  isHot: boolean;
  createdAt: string;
  floorCount?: number;
  bedroomCount?: number;
}

export type SortOptionValue =
  | 'isHot:desc,createdAt:desc'
  | 'createdAt:desc'
  | 'createdAt:asc'
  | 'basePrice:asc'
  | 'basePrice:desc';

export interface UnitSearchParams {
  projectId?: string | number;
  statusCode?: string;
  unitCode?: string;
  phaseId?: string | number;
  unitTypeCode?: string;
  directionCode?: string;
  minAreaLand?: number;
  maxAreaLand?: number;
  minBasePrice?: number;
  maxBasePrice?: number;
  sort?: SortOptionValue | string;
  page?: number;
  pageSize?: number;
}

export interface UnitSearchResponse {
  data: UnitItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
