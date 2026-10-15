import React, { useState } from 'react';

export const BsFilter: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  return (
    <div className="container-fluid px-3 px-md-4 mt-3 mt-md-4">
      {/* Title & Controls Bar */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
        <h3 className="fw-bold text-primary mb-0" style={{ fontSize: '20px' }}>
          BẢNG HÀNG
        </h3>

        {/* Controls: stacked full-width on mobile, side-by-side on desktop */}
        <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 w-100 w-md-auto">
          {/* Sort dropdown */}
          <select
            className="form-select form-select-sm shadow-none w-100"
            style={{ minWidth: '190px', borderRadius: '8px', fontSize: '13px', padding: '8px 12px' }}
            defaultValue="default"
          >
            <option value="default">Sắp xếp theo mặc định</option>
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="priceAsc">Giá tăng dần</option>
            <option value="priceDesc">Giá giảm dần</option>
          </select>

          {/* Status dropdown */}
          <select
            className="form-select form-select-sm shadow-none w-100"
            style={{ minWidth: '150px', borderRadius: '8px', fontSize: '13px', padding: '8px 12px' }}
            defaultValue="all"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="AVAILABLE">Còn hàng</option>
            <option value="DEPOSITED">Đang cọc</option>
            <option value="SOLD">Đã bán</option>
          </select>

          {/* Filter button */}
          <button
            type="button"
            className="btn btn-gradient-primary btn-sm d-flex align-items-center justify-content-center gap-1 px-3 py-2 w-100 w-md-auto shadow-sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            style={{ borderRadius: '8px' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span>Bộ lọc</span>
          </button>
        </div>
      </div>

      {/* Advanced Filter Collapse Box - 1:1 with Figma Frame 215 */}
      {showAdvanced && (
        <div className="card shadow-sm border mb-3 p-3 p-md-4 bg-white" style={{ borderRadius: '10px', borderColor: '#e2e8f0' }}>
          <h5 className="fw-bold small text-uppercase mb-3" style={{ color: '#0d6efd', letterSpacing: '0.3px', fontSize: '15px' }}>
            BỘ LỌC NÂNG CAO
          </h5>

          {/* 3 columns x 2 rows */}
          <div className="row g-3">
            {/* ROW 1 - COL 1: Mã căn hộ */}
            <div className="col-12 col-md-4">
              <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '13px' }}>Mã căn hộ</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Nhập mã căn hộ"
                style={{ borderRadius: '8px', padding: '8px 12px', fontSize: '13.5px', borderColor: '#d1d5db' }}
              />
            </div>

            {/* ROW 1 - COL 2: Phân khu */}
            <div className="col-12 col-md-4">
              <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '13px' }}>Phân khu</label>
              <select
                className="form-select form-select-sm"
                defaultValue=""
                style={{ borderRadius: '8px', padding: '8px 12px', fontSize: '13.5px', borderColor: '#d1d5db' }}
              >
                <option value="" disabled className="text-muted">Chọn phân khu</option>
                <option value="1">Phân khu 1</option>
                <option value="2">Phân khu 2</option>
                <option value="3">Phân khu 3</option>
              </select>
            </div>

            {/* ROW 1 - COL 3: Loại căn */}
            <div className="col-12 col-md-4">
              <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '13px' }}>Loại căn</label>
              <select
                className="form-select form-select-sm"
                defaultValue=""
                style={{ borderRadius: '8px', padding: '8px 12px', fontSize: '13.5px', borderColor: '#d1d5db' }}
              >
                <option value="" disabled className="text-muted">Chọn loại căn</option>
                <option value="shophouse">Shophouse</option>
                <option value="villa">Biệt thự</option>
                <option value="townhouse">Liền kề</option>
              </select>
            </div>

            {/* ROW 2 - COL 1: Hướng đất */}
            <div className="col-12 col-md-4">
              <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '13px' }}>Hướng đất</label>
              <select
                className="form-select form-select-sm"
                defaultValue=""
                style={{ borderRadius: '8px', padding: '8px 12px', fontSize: '13.5px', borderColor: '#d1d5db' }}
              >
                <option value="" disabled className="text-muted">Chọn hướng đất</option>
                <option value="east">Đông</option>
                <option value="west">Tây</option>
                <option value="south">Nam</option>
                <option value="north">Bắc</option>
                <option value="southeast">Đông Nam</option>
              </select>
            </div>

            {/* ROW 2 - COL 2: Diện tích */}
            <div className="col-12 col-md-4 position-relative">
              <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '13px' }}>Diện tích</label>
              <div
                className="form-select form-select-sm d-flex align-items-center justify-content-between cursor-pointer"
                onClick={() => {
                  setShowAreaDropdown(!showAreaDropdown);
                  setShowPriceDropdown(false);
                }}
                style={{ borderRadius: '8px', padding: '8px 12px', fontSize: '13.5px', borderColor: '#d1d5db', cursor: 'pointer' }}
              >
                <span className={selectedArea ? 'text-dark' : 'text-muted'}>
                  {selectedArea || 'Chọn diện tích'}
                </span>
              </div>

              {/* Popover */}
              {showAreaDropdown && (
                <div
                  className="card position-absolute shadow p-3 bg-white border"
                  style={{ top: '100%', left: '12px', zIndex: 1050, width: '280px', borderRadius: '10px', marginTop: '6px' }}
                >
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="flex-grow-1">
                      <div className="text-muted small mb-1" style={{ fontSize: '11px' }}>Thấp nhất</div>
                      <input type="number" className="form-control form-control-sm text-center" placeholder="0" />
                    </div>
                    <div className="pt-3 text-muted fw-bold">→</div>
                    <div className="flex-grow-1">
                      <div className="text-muted small mb-1" style={{ fontSize: '11px' }}>Cao nhất</div>
                      <input type="number" className="form-control form-control-sm text-center" placeholder="0" />
                    </div>
                  </div>

                  <div className="fw-semibold text-dark small mb-2" style={{ fontSize: '13px' }}>Tất cả mức giá</div>
                  {['Dưới 50m²', '50m² đến 70m²', '70m² đến 90m²', '90m² đến 120m²', 'Trên 120m2'].map((item) => (
                    <div className="form-check py-1" key={item}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="bsAreaRadio"
                        id={`area-${item}`}
                        checked={selectedArea === item}
                        onChange={() => {
                          setSelectedArea(item);
                          setShowAreaDropdown(false);
                        }}
                      />
                      <label className="form-check-label small text-dark" htmlFor={`area-${item}`} style={{ fontSize: '13px' }}>
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ROW 2 - COL 3: Khoảng giá */}
            <div className="col-12 col-md-4 position-relative">
              <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '13px' }}>Khoảng giá</label>
              <div
                className="form-select form-select-sm d-flex align-items-center justify-content-between cursor-pointer"
                onClick={() => {
                  setShowPriceDropdown(!showPriceDropdown);
                  setShowAreaDropdown(false);
                }}
                style={{ borderRadius: '8px', padding: '8px 12px', fontSize: '13.5px', borderColor: '#d1d5db', cursor: 'pointer' }}
              >
                <span className={selectedPrice ? 'text-dark' : 'text-muted'}>
                  {selectedPrice || 'Chọn khoảng giá'}
                </span>
              </div>

              {/* Popover */}
              {showPriceDropdown && (
                <div
                  className="card position-absolute shadow p-3 bg-white border"
                  style={{ top: '100%', left: '12px', zIndex: 1050, width: '280px', borderRadius: '10px', marginTop: '6px' }}
                >
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="flex-grow-1">
                      <div className="text-muted small mb-1" style={{ fontSize: '11px' }}>Thấp nhất</div>
                      <input type="number" className="form-control form-control-sm text-center" placeholder="0" />
                    </div>
                    <div className="pt-3 text-muted fw-bold">→</div>
                    <div className="flex-grow-1">
                      <div className="text-muted small mb-1" style={{ fontSize: '11px' }}>Cao nhất</div>
                      <input type="number" className="form-control form-control-sm text-center" placeholder="0" />
                    </div>
                  </div>

                  <div className="fw-semibold text-dark small mb-2" style={{ fontSize: '13px' }}>Tất cả mức giá</div>
                  {['Dưới 5 tỷ', '5 tới 10 tỷ', '10 tới 15 tỷ', '15 tới 20 tỷ', 'Trên 20 tỷ'].map((item) => (
                    <div className="form-check py-1" key={item}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="bsPriceRadio"
                        id={`price-${item}`}
                        checked={selectedPrice === item}
                        onChange={() => {
                          setSelectedPrice(item);
                          setShowPriceDropdown(false);
                        }}
                      />
                      <label className="form-check-label small text-dark" htmlFor={`price-${item}`} style={{ fontSize: '13px' }}>
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action buttons matching Frame 215 */}
          <div className="d-flex justify-content-end align-items-center gap-2 mt-4">
            <button
              type="button"
              className="btn btn-sm px-4 fw-semibold"
              onClick={() => setShowAdvanced(false)}
              style={{
                backgroundColor: '#c2cad4',
                color: '#334155',
                borderRadius: '6px',
                paddingTop: '8px',
                paddingBottom: '8px',
                fontSize: '13.5px',
                border: 'none',
              }}
            >
              Đóng
            </button>
            <button
              type="button"
              className="btn btn-sm px-4 fw-semibold text-white"
              style={{
                backgroundColor: '#0288d1',
                borderRadius: '6px',
                paddingTop: '8px',
                paddingBottom: '8px',
                fontSize: '13.5px',
                border: 'none',
              }}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
