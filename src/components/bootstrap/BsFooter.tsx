import React from 'react';

export const BsFooter: React.FC = () => {
  return (
    <footer className="footer-gradient text-white mt-auto pt-4 pt-md-5 pb-3">
      <div className="bs-main-container">
        <div className="row g-4 align-items-start">
          {/* Company info */}
          <div className="col-12 col-md-5">
            <div className="d-flex align-items-center gap-2 mb-2">
              <svg width="30" height="30" viewBox="0 0 34 34" fill="none">
                <rect x="4" y="14" width="6" height="16" rx="3" fill="#ffffff" fillOpacity="0.8" />
                <rect x="13" y="6" width="6" height="24" rx="3" fill="#ffffff" />
                <rect x="22" y="10" width="7" height="20" rx="3.5" fill="#bae6fd" />
              </svg>
              <h5 className="fw-bold mb-0 text-white" style={{ letterSpacing: '0.5px' }}>
                BẤT ĐỘNG SẢN
              </h5>
            </div>

            <p className="text-light text-opacity-80 small mb-3 pe-md-4" style={{ fontSize: '12.5px', lineHeight: '1.5' }}>
              Nền tảng công nghệ tiên phong &amp; dẫn đầu lĩnh vực kinh doanh bất động sản tại Việt Nam
            </p>

            <div className="d-flex flex-column gap-2 small text-light text-opacity-90" style={{ fontSize: '12.5px' }}>
              <div className="d-flex align-items-center gap-2">
                <span>📱</span>
                <span>0972 72 9999</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span>✉️</span>
                <span>Contact@gmail.com</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <span className="mt-1">📍</span>
                <span>SB24-39, Sao Biển 24, KĐT Vinhomes Ocean Park, Xã Gia Lâm, TP Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Directory & Social */}
          <div className="col-12 col-md-3">
            <h6 className="fw-bold text-white small text-uppercase mb-2">Danh mục</h6>
            <ul className="list-unstyled small d-flex flex-column gap-1 mb-3 text-light text-opacity-85" style={{ fontSize: '12.5px' }}>
              <li><a href="#about" className="text-decoration-none text-light text-opacity-85 hover-white">• Giới thiệu</a></li>
              <li><a href="#projects" className="text-decoration-none text-light text-opacity-85 hover-white">• Dự án</a></li>
              <li><a href="#contact" className="text-decoration-none text-light text-opacity-85 hover-white">• Liên hệ</a></li>
            </ul>

            {/* Kết nối Social icons */}
            <h6 className="fw-bold text-white small text-uppercase mb-2">Kết nối</h6>
            <div className="d-flex align-items-center gap-2">
              <a href="#fb" className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center text-decoration-none" style={{ width: '28px', height: '28px', fontSize: '13px', fontWeight: 700 }}>
                f
              </a>
              <a href="#yt" className="rounded-circle bg-white text-danger d-flex align-items-center justify-content-center text-decoration-none" style={{ width: '28px', height: '28px', fontSize: '12px' }}>
                ▶
              </a>
              <a href="#in" className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center text-decoration-none" style={{ width: '28px', height: '28px', fontSize: '12px', fontWeight: 700 }}>
                in
              </a>
              <a href="#tt" className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center text-decoration-none" style={{ width: '28px', height: '28px', fontSize: '12px' }}>
                🎵
              </a>
              <a href="#x" className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center text-decoration-none" style={{ width: '28px', height: '28px', fontSize: '12px', fontWeight: 700 }}>
                𝕏
              </a>
            </div>
          </div>

          {/* Mini Map */}
          <div className="col-12 col-md-4">
            <div className="rounded-3 overflow-hidden border border-white border-opacity-25 shadow-sm bg-white" style={{ height: '150px' }}>
              <iframe
                title="Google Map Vinhomes Ocean Park"
                src="https://maps.google.com/maps?q=Vinhomes%20Ocean%20Park&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 mt-3 border-top border-white border-opacity-15 small text-light text-opacity-70" style={{ fontSize: '11.5px' }}>
          © 2026 - Realestate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
