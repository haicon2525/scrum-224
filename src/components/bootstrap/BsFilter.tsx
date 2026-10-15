import React, { useState } from 'react';

export const BsFilter: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  return (
    <div className="bs-main-container mt-3 mt-md-4">
      {/* Title & Controls Bar: BẢNG HÀNG on far left, Controls on far right */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center w-100 gap-3 mb-3">
        <h2
          className="fw-bold mb-0 text-uppercase text-nowrap flex-shrink-0"
          style={{
            fontSize: '24px',
            color: '#1565c0',
            letterSpacing: '0.2px',
            whiteSpace: 'nowrap',
          }}
        >
          BẢNG HÀNG
        </h2>

        {/* Controls: aligned flush to the right */}
        <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2 bs-filter-controls">
          {/* Sort dropdown */}
          <select
            className="form-select form-select-sm shadow-none"
            style={{
              width: '205px',
              height: '38px',
              borderRadius: '6px',
              fontSize: '13px',
              padding: '6px 32px 6px 12px',
              borderColor: '#cbd5e1',
            }}
            defaultValue="default"
          >
            <option value="default">Sắp xếp theo mặc định</option>
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="priceAsc">Giá tăng dần</option>
            <option value="priceDesc">Giá giảm dần</option>
          </select>

          {/* Status dropdown: 168px exactly as annotated in Figma */}
          <select
            className="form-select form-select-sm shadow-none"
            style={{
              width: '168px',
              height: '38px',
              borderRadius: '6px',
              fontSize: '13px',
              padding: '6px 32px 6px 12px',
              borderColor: '#cbd5e1',
            }}
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
            className="btn btn-sm d-inline-flex align-items-center justify-content-center shadow-sm text-white flex-shrink-0"
            onClick={() => setShowAdvanced(!showAdvanced)}
            style={{
              background: 'linear-gradient(90deg, #1d4ed8 0%, #0099e5 100%)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              height: '38px',
              padding: '0 18px',
              gap: '8px',
              minWidth: '100px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

          {/* 6 Columns Grid matching Figma Image 1 */}
          <div className="row g-2 g-md-3">
            {/* ROW 1 - COL 1: Mã căn hộ */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '13px' }}>Mã căn hộ</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Nhập mã căn hộ"
                style={{ borderRadius: '8px', padding: '8px 12px', fontSize: '13.5px', borderColor: '#d1d5db' }}
              />
            </div>

            {/* ROW 1 - COL 2: Phân khu */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
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
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
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
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
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
            <div className="col-12 col-sm-6 col-md-4 col-lg-2 position-relative">
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
                  style={{ top: '100%', left: '0', zIndex: 1050, width: '280px', borderRadius: '10px', marginTop: '6px' }}
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
            <div className="col-12 col-sm-6 col-md-4 col-lg-2 position-relative">
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
                  style={{ top: '100%', left: '0', zIndex: 1050, width: '280px', borderRadius: '10px', marginTop: '6px' }}
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

          {/* Action buttons matching Frame 215 & centered like Image 1 */}
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <button
              type="button"
              className="btn btn-sm px-4 fw-semibold"
              onClick={() => setShowAdvanced(false)}
              style={{
                backgroundColor: '#f1f5f9',
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
                background: 'linear-gradient(135deg, #1d4ed8 0%, #0099e5 100%)',
                borderRadius: '6px',
                paddingTop: '8px',
                paddingBottom: '8px',
                fontSize: '13.5px',
                border: 'none',
                boxShadow: '0 2px 8px rgba(29, 78, 216, 0.25)',
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
