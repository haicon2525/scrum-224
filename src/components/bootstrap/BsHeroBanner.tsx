import React from 'react';

export const BsHeroBanner: React.FC = () => {
  return (
    <section className="container-fluid px-3 px-md-4 mt-2 mt-md-3">
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
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
        <div>
          <h2 className="fw-bold text-primary mb-1" style={{ fontSize: '24px' }}>
            VINHOMES OCEAN PARK 3
          </h2>
          <p className="text-secondary small mb-0" style={{ fontSize: '13px', lineHeight: '1.4' }}>
            Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án VINHOMES OCEAN PARK 3.
          </p>
        </div>

        {/* Share button: full width on mobile, auto on desktop */}
        <button
          className="btn btn-gradient-primary w-100 w-md-auto d-flex align-items-center justify-content-center gap-2 px-3 py-2 small shadow-sm"
          style={{ minWidth: '110px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          <span>Chia sẻ</span>
        </button>
      </div>

      {/* Hero Banner with responsive height */}
      <div
        className="position-relative rounded-4 overflow-hidden shadow-sm"
        style={{
          minHeight: '190px',
          height: 'clamp(190px, 28vw, 360px)',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%), url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat',
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 p-3 p-md-4 text-center">
          <span
            className="d-inline-block fw-light text-white text-uppercase fst-italic"
            style={{ fontSize: 'clamp(13px, 2vw, 18px)', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}
          >
            Siêu quần thể đô thị biển
          </span>
          <h1
            className="fw-bold text-warning text-uppercase mb-0 mt-1"
            style={{
              fontSize: 'clamp(18px, 3.5vw, 32px)',
              letterSpacing: '0.5px',
              textShadow: '0 3px 6px rgba(0,0,0,0.7)',
              fontWeight: 800,
            }}
          >
            VINHOMES OCEAN PARK 2 & 3
          </h1>
        </div>

        {/* Carousel indicators */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 mb-md-3 d-flex gap-1 gap-md-2">
          <span className="bg-primary rounded-pill d-inline-block" style={{ width: '22px', height: '5px' }}></span>
          <span className="bg-white bg-opacity-75 rounded-pill d-inline-block" style={{ width: '6px', height: '5px' }}></span>
          <span className="bg-white bg-opacity-75 rounded-pill d-inline-block" style={{ width: '6px', height: '5px' }}></span>
          <span className="bg-white bg-opacity-75 rounded-pill d-inline-block" style={{ width: '6px', height: '5px' }}></span>
        </div>
      </div>
    </section>
  );
};
