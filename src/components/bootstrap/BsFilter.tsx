import React, { useState } from 'react';

export const BsFilter: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

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

      {/* Advanced Filter Collapse Box */}
      {showAdvanced && (
        <div className="card shadow-sm border-0 mb-3 p-3 bg-white rounded-3">
          <h5 className="fw-bold text-primary small text-uppercase mb-3" style={{ letterSpacing: '0.5px' }}>
            BỘ LỌC NÂNG CAO
          </h5>

          <div className="row g-2 g-md-3">
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Mã căn hộ</label>
              <input type="text" className="form-control form-control-sm" placeholder="Nhập mã căn hộ" />
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Phân khu</label>
              <select className="form-select form-select-sm" defaultValue="">
                <option value="">Chọn phân khu</option>
                <option value="1">Phân khu 1</option>
                <option value="2">Phân khu 2</option>
                <option value="3">Phân khu 3</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Loại căn</label>
              <select className="form-select form-select-sm" defaultValue="">
                <option value="">Chọn loại căn</option>
                <option value="shophouse">Shophouse</option>
                <option value="villa">Biệt thự</option>
                <option value="townhouse">Liền kề</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Hướng đất</label>
              <select className="form-select form-select-sm" defaultValue="">
                <option value="">Chọn hướng đất</option>
                <option value="east">Đông</option>
                <option value="west">Tây</option>
                <option value="south">Nam</option>
                <option value="north">Bắc</option>
                <option value="southeast">Đông Nam</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Diện tích</label>
              <select className="form-select form-select-sm" defaultValue="">
                <option value="">Chọn diện tích</option>
                <option value="<100">&lt; 100 m²</option>
                <option value="100-200">100 - 200 m²</option>
                <option value=">200">&gt; 200 m²</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Khoảng giá</label>
              <select className="form-select form-select-sm" defaultValue="">
                <option value="">Chọn khoảng giá</option>
                <option value="<10">&lt; 10 tỷ</option>
                <option value="10-20">10 - 20 tỷ</option>
                <option value=">20">&gt; 20 tỷ</option>
              </select>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-3 pt-2 border-top">
            <button
              type="button"
              className="btn btn-light btn-sm px-3 text-muted"
              onClick={() => setShowAdvanced(false)}
            >
              Đóng
            </button>
            <button type="button" className="btn btn-gradient-primary btn-sm px-4">
              Tìm kiếm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
