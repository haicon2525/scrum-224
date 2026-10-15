import React from 'react';

export const BsHeader: React.FC = () => {
  return (
    <header className="bg-white border-bottom py-2 px-3 px-md-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center bg-primary text-white rounded"
            style={{ width: '38px', height: '38px', fontSize: '20px' }}
          >
            🏢
          </div>
          <div>
            <div className="fw-bold text-primary lh-1" style={{ fontSize: '16px', letterSpacing: '0.5px' }}>
              BẤT ĐỘNG SẢN
            </div>
            <small className="text-muted" style={{ fontSize: '10px' }}>VINHOMES PORTAL</small>
          </div>
        </div>

        {/* Center link */}
        <div className="d-none d-md-block">
          <span
            className="fw-bold text-uppercase px-3 py-1 rounded border border-primary border-opacity-50 text-primary"
            style={{ fontSize: '13px', letterSpacing: '1px' }}
          >
            GIỚI THIỆU DỰ ÁN
          </span>
        </div>

        {/* Right status & avatar */}
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2 px-3 py-1 bg-light rounded-pill border">
            <span
              className="bg-success rounded-circle d-inline-block"
              style={{ width: '8px', height: '8px' }}
            ></span>
            <span className="small text-muted fw-medium" style={{ fontSize: '12px' }}>
              100 người đang Online
            </span>
          </div>

          <div
            className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold"
            style={{ width: '38px', height: '38px', fontSize: '16px', cursor: 'pointer' }}
          >
            👤
          </div>
        </div>
      </div>
    </header>
  );
};
