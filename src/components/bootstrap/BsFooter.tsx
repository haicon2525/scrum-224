import React from 'react';

export const BsFooter: React.FC = () => {
  return (
    <footer className="text-white mt-auto py-5" style={{ backgroundColor: '#133e75' }}>
      <div className="container-fluid px-3 px-md-5">
        <div className="row g-4 align-items-start">
          {/* Company info */}
          <div className="col-12 col-md-5">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span style={{ fontSize: '28px' }}>🏢</span>
              <h4 className="fw-bold mb-0 text-white">BẤT ĐỘNG SẢN</h4>
            </div>
            <p className="text-light text-opacity-75 small pe-md-4 mb-4">
              Nền tảng công nghệ tiên phong &amp; dẫn đầu lĩnh vực kinh doanh bất động sản tại Việt Nam
            </p>
            <div className="d-flex flex-column gap-2 small text-light text-opacity-90">
              <div className="d-flex align-items-center gap-2">
                <span>📞</span>
                <span>0972 72 9999</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span>✉️</span>
                <span>Contact@gmail.com</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <span>📍</span>
                <span>SB24-39, Sao Biển 24, KĐT Vinhomes Ocean Park, Xã Gia Lâm, TP Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-12 col-md-3">
            <h6 className="fw-bold text-white text-uppercase mb-3">Danh mục</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-light text-opacity-75">
              <li><a href="#about" className="text-decoration-none text-light text-opacity-75 hover-white">• Giới thiệu</a></li>
              <li><a href="#projects" className="text-decoration-none text-light text-opacity-75 hover-white">• Dự án</a></li>
              <li><a href="#contact" className="text-decoration-none text-light text-opacity-75 hover-white">• Liên hệ</a></li>
            </ul>
          </div>

          {/* Mini Map */}
          <div className="col-12 col-md-4">
            <div className="rounded-3 overflow-hidden border border-light border-opacity-25 shadow-sm" style={{ height: '160px', backgroundColor: '#e2e8f0' }}>
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
      </div>
    </footer>
  );
};
