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
      <div className="bg-white rounded-3 shadow-sm overflow-hidden mb-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 text-center">
            <thead className="table-light">
              <tr>
                <th style={{ width: '80px' }}></th>
                <th className="text-primary">Mã căn</th>
                <th className="text-primary">Giá bán</th>
                <th className="text-primary">Loại hình</th>
                <th className="text-primary">DT đất</th>
                <th className="text-primary">DT xây dựng</th>
                <th className="text-primary">Hướng</th>
                <th className="text-primary">Phân khu</th>
                <th className="text-primary">Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {STATIC_UNITS.map((item) => (
                <tr key={item.id}>
                  {/* Hotdeal & Pin icons */}
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      {item.isHot ? (
                        <span title="Hotdeal" style={{ color: '#ef4444', fontSize: '16px' }}>🔥</span>
                      ) : (
                        <span style={{ width: '16px', display: 'inline-block' }}></span>
                      )}
                      <span title="Xem vị trí" style={{ color: '#3b82f6', fontSize: '15px', cursor: 'pointer' }}>📍</span>
                    </div>
                  </td>

                  {/* Unit Code Badge */}
                  <td>
                    <span
                      className={`badge fw-bold px-3 py-2 ${
                        item.status === 'sold'
                          ? 'bg-warning bg-opacity-25 text-danger border border-warning'
                          : 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25'
                      }`}
                      style={{ fontSize: '12px', borderRadius: '6px' }}
                    >
                      {item.unitCode}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="fw-semibold text-secondary">{item.price}</td>

                  {/* Type */}
                  <td className="text-secondary">{item.type}</td>

                  {/* Land Area */}
                  <td className="text-secondary">{item.areaLand}</td>

                  {/* Construction Area */}
                  <td className="text-secondary">{item.areaConst}</td>

                  {/* Direction */}
                  <td className="text-secondary">{item.direction}</td>

                  {/* Phase */}
                  <td className="text-secondary">{item.phase}</td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-1 fw-medium ${
                        item.status === 'sold'
                          ? 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25'
                          : 'bg-info bg-opacity-10 text-info border border-info border-opacity-25'
                      }`}
                      style={{ fontSize: '12px' }}
                    >
                      {item.statusText}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="d-flex flex-wrap justify-content-between align-items-center p-3 border-top gap-3">
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
              <li className="page-item disabled"><a className="page-link" href="#first">«</a></li>
              <li className="page-item disabled"><a className="page-link" href="#prev">&lt;</a></li>
              <li className="page-item active"><a className="page-link" href="#1">1</a></li>
              <li className="page-item"><a className="page-link" href="#2">2</a></li>
              <li className="page-item"><a className="page-link" href="#3">3</a></li>
              <li className="page-item disabled"><span className="page-link">...</span></li>
              <li className="page-item"><a className="page-link" href="#10">10</a></li>
              <li className="page-item"><a className="page-link" href="#next">&gt;</a></li>
              <li className="page-item"><a className="page-link" href="#last">»</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
