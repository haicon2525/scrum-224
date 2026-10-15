import React, { useState } from 'react';
import { UnitDetailModal } from '../../pages/MuiVersion/UnitDetailModal';
import { UnitMapModal } from '../../pages/MuiVersion/UnitMapModal';

interface StaticUnitRow {
  id: number;
  isHot: boolean;
  unitCode: string;
  price: string;
  type: string;
  areaLand: string;
  areaConst: string;
  direction: string;
  phase: string;
  status: 'available' | 'sold';
  statusText: string;
}

const STATIC_UNITS: StaticUnitRow[] = [
  { id: 1, isHot: true, unitCode: 'PB19-19', price: '20.2 tỷ', type: 'Shophouse', areaLand: '100m²', areaConst: '500m²', direction: 'Đông nam', phase: 'Phân khu 1', status: 'available', statusText: 'Còn hàng' },
  { id: 2, isHot: true, unitCode: 'PB19-19', price: '20.2 tỷ', type: 'Shophouse', areaLand: '100m²', areaConst: '500m²', direction: 'Đông nam', phase: 'Phân khu 1', status: 'available', statusText: 'Còn hàng' },
  { id: 3, isHot: false, unitCode: 'PB19-19', price: '20.2 tỷ', type: 'Shophouse', areaLand: '100m²', areaConst: '500m²', direction: 'Đông nam', phase: 'Phân khu 1', status: 'available', statusText: 'Còn hàng' },
  { id: 4, isHot: false, unitCode: 'PB19-19', price: '20.2 tỷ', type: 'Shophouse', areaLand: '100m²', areaConst: '500m²', direction: 'Đông nam', phase: 'Phân khu 1', status: 'available', statusText: 'Còn hàng' },
  { id: 5, isHot: false, unitCode: 'PB19-19', price: '20.2 tỷ', type: 'Shophouse', areaLand: '100m²', areaConst: '500m²', direction: 'Đông nam', phase: 'Phân khu 1', status: 'available', statusText: 'Còn hàng' },
  { id: 6, isHot: false, unitCode: 'PB19-19', price: '20.2 tỷ', type: 'Shophouse', areaLand: '100m²', areaConst: '500m²', direction: 'Đông nam', phase: 'Phân khu 1', status: 'available', statusText: 'Còn hàng' },
  { id: 7, isHot: false, unitCode: 'PB19-19', price: '20.2 tỷ', type: 'Shophouse', areaLand: '100m²', areaConst: '500m²', direction: 'Đông nam', phase: 'Phân khu 1', status: 'available', statusText: 'Còn hàng' },
  { id: 8, isHot: false, unitCode: 'PB19-19', price: '20.2 tỷ', type: 'Shophouse', areaLand: '100m²', areaConst: '500m²', direction: 'Đông nam', phase: 'Phân khu 1', status: 'sold', statusText: 'Đã bán' },
  { id: 9, isHot: false, unitCode: 'PB19-19', price: '20.2 tỷ', type: 'Shophouse', areaLand: '100m²', areaConst: '500m²', direction: 'Đông nam', phase: 'Phân khu 1', status: 'sold', statusText: 'Đã bán' },
];

export const BsUnitTable: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<any | null>(null);
  const [mapUnit, setMapUnit] = useState<any | null>(null);

  const handleOpenDetail = (item: StaticUnitRow) => {
    setSelectedUnit({
      id: item.id,
      unitCode: item.unitCode,
      projectName: 'Vinhomes Ocean Park 3',
      phaseName: item.phase,
      statusName: item.statusText,
      unitTypeName: item.type,
      directions: item.direction,
      areaLand: 100,
      areaConstruction: 500,
      basePrice: 20200000000,
      isHot: item.isHot,
    });
  };

  const handleOpenMap = (item: StaticUnitRow) => {
    setMapUnit({
      id: item.id,
      unitCode: item.unitCode,
      projectName: 'Vinhomes Ocean Park 3',
      phaseName: item.phase,
      statusName: item.statusText,
      unitTypeName: item.type,
      directions: item.direction,
      basePrice: 20200000000,
      areaLand: 100,
    });
  };

  return (
    <div className="bs-main-container">
      <div className="bg-white rounded-3 shadow-sm overflow-hidden mb-4 border" style={{ borderColor: '#e2e8f0' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 text-center">
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <tr>
                <th style={{ width: '65px', padding: '12px 6px' }}></th>
                <th className="fw-bold text-nowrap" style={{ fontSize: '13px', color: '#1565c0' }}>Mã căn</th>
                <th className="fw-bold text-nowrap" style={{ fontSize: '13px', color: '#1565c0' }}>Giá bán</th>
                <th className="fw-bold text-nowrap d-none d-md-table-cell" style={{ fontSize: '13px', color: '#1565c0' }}>Loại hình</th>
                <th className="fw-bold text-nowrap d-none d-md-table-cell" style={{ fontSize: '13px', color: '#1565c0' }}>DT đất</th>
                <th className="fw-bold text-nowrap d-none d-md-table-cell" style={{ fontSize: '13px', color: '#1565c0' }}>DT xây dựng</th>
                <th className="fw-bold text-nowrap d-none d-md-table-cell" style={{ fontSize: '13px', color: '#1565c0' }}>Hướng</th>
                <th className="fw-bold text-nowrap d-none d-md-table-cell" style={{ fontSize: '13px', color: '#1565c0' }}>Phân khu</th>
                <th className="fw-bold text-nowrap d-none d-md-table-cell" style={{ fontSize: '13px', color: '#1565c0' }}>Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {STATIC_UNITS.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  {/* Hotdeal & Pin icons */}
                  <td style={{ padding: '10px 4px' }}>
                    <div className="d-flex align-items-center justify-content-center gap-1.5">
                      {item.isHot ? (
                        <span
                          title="Căn Hot Deal"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#fee2e2',
                            color: '#ef4444',
                            fontSize: '12px',
                          }}
                        >
                          🔥
                        </span>
                      ) : (
                        <span style={{ width: '20px', display: 'inline-block' }}></span>
                      )}
                      <span
                        title="Xem vị trí trên bản đồ"
                        onClick={() => handleOpenMap(item)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '22px',
                          height: '22px',
                          color: '#2563eb',
                          fontSize: '14px',
                          cursor: 'pointer',
                        }}
                      >
                        📍
                      </span>
                    </div>
                  </td>

                  {/* Unit Code Badge */}
                  <td>
                    <span
                      onClick={() => handleOpenDetail(item)}
                      className={`badge fw-bold px-2 px-md-3 py-1.5 cursor-pointer ${
                        item.status === 'sold'
                          ? 'badge-unit-sold'
                          : 'badge-unit-blue'
                      }`}
                      style={{
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        letterSpacing: '0.2px',
                      }}
                      title="Xem chi tiết căn"
                    >
                      {item.unitCode}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="fw-semibold" style={{ fontSize: '13px', color: '#334155' }}>
                    {item.price}
                  </td>

                  {/* Desktop columns */}
                  <td className="text-secondary d-none d-md-table-cell" style={{ fontSize: '13px' }}>{item.type}</td>
                  <td className="text-secondary d-none d-md-table-cell" style={{ fontSize: '13px' }}>{item.areaLand}</td>
                  <td className="text-secondary d-none d-md-table-cell" style={{ fontSize: '13px' }}>{item.areaConst}</td>
                  <td className="text-secondary d-none d-md-table-cell" style={{ fontSize: '13px' }}>{item.direction}</td>
                  <td className="text-secondary d-none d-md-table-cell" style={{ fontSize: '13px' }}>{item.phase}</td>

                  {/* Status Badge */}
                  <td className="d-none d-md-table-cell">
                    <span
                      className={item.status === 'sold' ? 'status-badge-sold' : 'status-badge-available'}
                      style={{ fontSize: '12px', padding: '4px 10px' }}
                    >
                      {item.statusText}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Responsive Pagination matching Figma */}
        <div className="p-3 border-top" style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }}>
          {/* Desktop Pagination Layout */}
          <div className="d-none d-md-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2 small text-muted">
              <span>Trang</span>
              <select className="form-select form-select-sm" style={{ width: '65px', borderRadius: '6px' }} defaultValue="1">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <span>Của 20</span>
            </div>

            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm mb-0 gap-1">
                <li className="page-item disabled"><span className="page-link rounded">«</span></li>
                <li className="page-item disabled"><span className="page-link rounded">&lt;</span></li>
                <li className="page-item active"><span className="page-link rounded bg-primary border-primary">1</span></li>
                <li className="page-item"><span className="page-link rounded text-dark">2</span></li>
                <li className="page-item"><span className="page-link rounded text-dark">3</span></li>
                <li className="page-item disabled"><span className="page-link rounded border-0">...</span></li>
                <li className="page-item"><span className="page-link rounded text-dark">10</span></li>
                <li className="page-item"><span className="page-link rounded text-dark">&gt;</span></li>
                <li className="page-item"><span className="page-link rounded text-dark">»</span></li>
              </ul>
            </nav>
          </div>

          {/* Mobile Pagination Layout */}
          <div className="d-flex d-md-none flex-column align-items-center gap-2">
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm mb-0 gap-1">
                <li className="page-item disabled"><span className="page-link px-2 rounded">«</span></li>
                <li className="page-item disabled"><span className="page-link px-2 rounded">&lt;</span></li>
                <li className="page-item active"><span className="page-link px-2 rounded bg-primary border-primary">1</span></li>
                <li className="page-item"><span className="page-link px-2 rounded text-dark">2</span></li>
                <li className="page-item"><span className="page-link px-2 rounded text-dark">3</span></li>
                <li className="page-item disabled"><span className="page-link px-1 rounded border-0">...</span></li>
                <li className="page-item"><span className="page-link px-2 rounded text-dark">10</span></li>
                <li className="page-item"><span className="page-link px-2 rounded text-dark">&gt;</span></li>
                <li className="page-item"><span className="page-link px-2 rounded text-dark">»</span></li>
              </ul>
            </nav>

            <div className="d-flex align-items-center gap-2 small text-muted mt-1">
              <span>Trang</span>
              <select className="form-select form-select-sm" style={{ width: '60px', padding: '2px 6px', borderRadius: '6px' }} defaultValue="1">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <span>Của 20</span>
            </div>
          </div>
        </div>
      </div>

      {/* Unit Detail Modal */}
      <UnitDetailModal
        open={Boolean(selectedUnit)}
        unit={selectedUnit}
        onClose={() => setSelectedUnit(null)}
        onOpenMap={(u) => {
          setSelectedUnit(null);
          setMapUnit(u);
        }}
      />

      {/* Unit Map Floorplan Modal */}
      <UnitMapModal
        open={Boolean(mapUnit)}
        unit={mapUnit}
        onClose={() => setMapUnit(null)}
      />
    </div>
  );
};

export default BsUnitTable;
