import React from 'react';

export const BsHeroBanner: React.FC = () => {
  return (
    <section className="bs-main-container mt-2 mt-md-3">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-2 small">
          <li className="breadcrumb-item">
            <a href="#projects" className="text-decoration-none text-primary fw-medium" style={{ fontSize: '13px' }}>
              Dự án
            </a>
          </li>
          <li className="breadcrumb-item active text-secondary" aria-current="page" style={{ fontSize: '13px' }}>
            Vinhomes Ocean Park 3
          </li>
        </ol>
      </nav>

      {/* Title & Share Button */}
      <div className="d-flex flex-row justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 className="fw-bold text-primary mb-1" style={{ fontSize: '24px' }}>
            VINHOMES OCEAN PARK 3
          </h2>
          <p className="text-secondary small mb-0" style={{ fontSize: '13px', lineHeight: '1.4' }}>
            Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án VINHOMES OCEAN PARK 3.
          </p>
        </div>

        {/* Compact Share button matching Figma */}
        <button
          className="btn btn-primary d-inline-flex align-items-center justify-content-center gap-2 px-3 py-2 small shadow-sm text-nowrap flex-shrink-0"
          style={{
            backgroundColor: '#0d6efd',
            borderColor: '#0d6efd',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          <span>Chia sẻ</span>
        </button>
      </div>

      {/* Hero Banner using exact Figma Banner image */}
      <div
        className="position-relative rounded-4 overflow-hidden shadow-sm"
        style={{
          width: '100%',
          borderRadius: '16px',
        }}
      >
        <img
          src="/figma-banner.png"
          alt="Siêu quần thể đô thị biển Vinhomes Ocean Park 2 & 3"
          className="w-100 d-block"
          style={{
            borderRadius: '16px',
            objectFit: 'cover',
            maxHeight: '360px',
            minHeight: '180px',
          }}
        />
      </div>
    </section>
  );
};

export default BsHeroBanner;
