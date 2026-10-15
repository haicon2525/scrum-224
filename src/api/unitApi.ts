import portalApi from './portalApi';
import type { UnitSearchParams, UnitSearchResponse } from '../types/unit';

/**
 * unitApi: Re-exports portalApi to maintain backward compatibility
 * Uses 100% real live APIs from Vinhomes UAT.
 */
export const unitApi = {
  searchUnits: (params: UnitSearchParams): Promise<UnitSearchResponse> => portalApi.searchUnits(params),
  getUnitDetail: (id: number | string) => portalApi.getUnitDetail(id),
};

export default unitApi;
