import React from 'react';

export const BsHeroBanner: React.FC = () => {
  return (
    <section className="container-fluid px-3 px-md-4 mt-3">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-2 small text-muted">
          <li className="breadcrumb-item"><a href="#projects" className="text-decoration-none text-primary">Dự án</a></li>
          <li className="breadcrumb-item active" aria-current="page">Vinhomes Ocean Park 3</li>
        </ol>
      </nav>

      {/* Title & Share Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold text-primary mb-1" style={{ fontSize: '26px' }}>
            VINHOMES OCEAN PARK 3
          </h2>
          <p className="text-secondary small mb-0">
            Theo dõi thông tin chi tiết và bảng giá, mặt bằng, tiến độ và chính sách bán hàng dự án VINHOMES OCEAN PARK 3.
          </p>
        </div>
        <button className="btn btn-primary btn-sm d-flex align-items-center gap-2 px-3 py-2 fw-medium shadow-sm">
          <span>🔗</span>
          <span>Chia sẻ</span>
        </button>
      </div>

      {/* Banner / Poster */}
      <div
        className="position-relative rounded-4 overflow-hidden shadow-sm"
        style={{
          height: '380px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%), url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat',
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 p-4 text-center">
          <span
            className="d-inline-block fw-light text-white text-uppercase fst-italic"
            style={{ fontSize: '18px', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}
          >
            Siêu quần thể đô thị biển
          </span>
          <h1
            className="fw-extrabold text-warning text-uppercase mb-0 mt-1"
            style={{
              fontSize: '32px',
              letterSpacing: '1px',
              textShadow: '0 3px 6px rgba(0,0,0,0.7)',
              fontWeight: 800,
            }}
          >
            VINHOMES OCEAN PARK 2 & 3
          </h1>
        </div>

        {/* Carousel indicators */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
          <span className="bg-primary rounded-pill d-inline-block" style={{ width: '24px', height: '6px' }}></span>
          <span className="bg-white bg-opacity-75 rounded-pill d-inline-block" style={{ width: '8px', height: '6px' }}></span>
          <span className="bg-white bg-opacity-75 rounded-pill d-inline-block" style={{ width: '8px', height: '6px' }}></span>
          <span className="bg-white bg-opacity-75 rounded-pill d-inline-block" style={{ width: '8px', height: '6px' }}></span>
        </div>
      </div>
    </section>
  );
};
