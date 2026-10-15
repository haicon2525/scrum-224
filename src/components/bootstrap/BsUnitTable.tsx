import React from 'react';

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
  return (
    <div className="container-fluid px-3 px-md-4">
      <div className="bg-white rounded-3 shadow-sm overflow-hidden mb-4 border border-light">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 text-center">
            <thead className="table-light">
              <tr>
                <th style={{ width: '70px' }}></th>
                <th className="text-primary fw-bold" style={{ fontSize: '13px' }}>Mã căn</th>
                <th className="text-primary fw-bold" style={{ fontSize: '13px' }}>Giá bán</th>
                <th className="text-primary fw-bold d-none d-md-table-cell" style={{ fontSize: '13px' }}>Loại hình</th>
                <th className="text-primary fw-bold d-none d-md-table-cell" style={{ fontSize: '13px' }}>DT đất</th>
                <th className="text-primary fw-bold d-none d-md-table-cell" style={{ fontSize: '13px' }}>DT xây dựng</th>
                <th className="text-primary fw-bold d-none d-md-table-cell" style={{ fontSize: '13px' }}>Hướng</th>
                <th className="text-primary fw-bold d-none d-md-table-cell" style={{ fontSize: '13px' }}>Phân khu</th>
                <th className="text-primary fw-bold d-none d-md-table-cell" style={{ fontSize: '13px' }}>Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {STATIC_UNITS.map((item) => (
                <tr key={item.id}>
                  {/* Hotdeal & Pin icons */}
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-1">
                      {item.isHot ? (
                        <span title="Hotdeal" style={{ color: '#ef4444', fontSize: '15px' }}>🔥</span>
                      ) : (
                        <span style={{ width: '15px', display: 'inline-block' }}></span>
                      )}
                      <span title="Xem vị trí" style={{ color: '#3b82f6', fontSize: '15px', cursor: 'pointer' }}>📍</span>
                    </div>
                  </td>

                  {/* Unit Code Badge */}
                  <td>
                    <span
                      className={`badge fw-bold px-2 px-md-3 py-2 ${
                        item.status === 'sold'
                          ? 'badge-unit-sold'
                          : 'badge-unit-blue'
                      }`}
                      style={{ fontSize: '12px' }}
                    >
                      {item.unitCode}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="fw-semibold text-secondary" style={{ fontSize: '13px' }}>
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
        <div className="p-3 border-top">
          {/* Desktop Pagination Layout */}
          <div className="d-none d-md-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2 small text-muted">
              <span>Trang</span>
              <select className="form-select form-select-sm" style={{ width: '65px' }} defaultValue="1">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <span>Của 20</span>
            </div>

            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled"><span className="page-link">«</span></li>
                <li className="page-item disabled"><span className="page-link">&lt;</span></li>
                <li className="page-item active"><span className="page-link">1</span></li>
                <li className="page-item"><span className="page-link">2</span></li>
                <li className="page-item"><span className="page-link">3</span></li>
                <li className="page-item disabled"><span className="page-link">...</span></li>
                <li className="page-item"><span className="page-link">10</span></li>
                <li className="page-item"><span className="page-link">&gt;</span></li>
                <li className="page-item"><span className="page-link">»</span></li>
              </ul>
            </nav>
          </div>

          {/* Mobile Pagination Layout (Buttons top, selector bottom) */}
          <div className="d-flex d-md-none flex-column align-items-center gap-2">
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled"><span className="page-link px-2">«</span></li>
                <li className="page-item disabled"><span className="page-link px-2">&lt;</span></li>
                <li className="page-item active"><span className="page-link px-2">1</span></li>
                <li className="page-item"><span className="page-link px-2">2</span></li>
                <li className="page-item"><span className="page-link px-2">3</span></li>
                <li className="page-item disabled"><span className="page-link px-1">...</span></li>
                <li className="page-item"><span className="page-link px-2">10</span></li>
                <li className="page-item"><span className="page-link px-2">&gt;</span></li>
                <li className="page-item"><span className="page-link px-2">»</span></li>
              </ul>
            </nav>

            <div className="d-flex align-items-center gap-2 small text-muted mt-1">
              <span>Trang</span>
              <select className="form-select form-select-sm" style={{ width: '60px', padding: '2px 6px' }} defaultValue="1">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <span>Của 20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
