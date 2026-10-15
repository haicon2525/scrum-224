import React, { useState } from 'react';

export const BsHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-bottom py-2 px-3 px-md-4 sticky-top shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo 3 bars according to Figma */}
        <div className="d-flex align-items-center gap-2">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <rect x="4" y="14" width="6" height="16" rx="3" fill="#1e40af" />
            <rect x="13" y="6" width="6" height="24" rx="3" fill="#2563eb" />
            <rect x="22" y="10" width="7" height="20" rx="3.5" fill="#0ea5e9" />
          </svg>
        </div>

        {/* Center links on Desktop */}
        <div className="d-none d-md-flex align-items-center gap-4">
          <a href="#intro" className="fw-bold text-uppercase text-decoration-none text-secondary small" style={{ letterSpacing: '0.5px' }}>
            GIỚI THIỆU
          </a>
          <span className="text-muted opacity-50">|</span>
          <a href="#projects" className="fw-bold text-uppercase text-decoration-none text-primary small" style={{ letterSpacing: '0.5px' }}>
            DỰ ÁN
          </a>
        </div>

        {/* Right side */}
        <div className="d-flex align-items-center gap-2 gap-md-3">
          {/* Online badge */}
          <div className="d-flex align-items-center gap-1 gap-md-2 px-2 px-md-3 py-1 bg-light rounded-pill border">
            <span
              className="bg-success rounded-circle d-inline-block"
              style={{ width: '7px', height: '7px' }}
            ></span>
            <span className="text-muted fw-medium" style={{ fontSize: '11px' }}>
              100 người đang Online
            </span>
          </div>

          {/* Desktop User Avatar */}
          <div
            className="d-none d-md-flex rounded-circle bg-primary text-white align-items-center justify-content-center"
            style={{ width: '36px', height: '36px', cursor: 'pointer' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>

          {/* Mobile Hamburger menu */}
          <button
            type="button"
            className="d-md-none btn btn-sm p-1 text-primary border-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer/Menu Collapse */}
      {mobileMenuOpen && (
        <div className="d-md-none pt-2 pb-1 border-top mt-2">
          <div className="d-flex flex-column gap-2">
            <a href="#intro" className="text-decoration-none fw-semibold text-secondary py-1 px-2 rounded hover-bg">
              Giới thiệu
            </a>
            <a href="#projects" className="text-decoration-none fw-semibold text-primary py-1 px-2 rounded hover-bg">
              Dự án
            </a>
            <a href="#contact" className="text-decoration-none fw-semibold text-secondary py-1 px-2 rounded hover-bg">
              Liên hệ
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
