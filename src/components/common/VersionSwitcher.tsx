import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const VersionSwitcher: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout, login } = useAuth();
  const isBootstrap = location.pathname.startsWith('/bootstrap');

  return (
    <div style={{
      backgroundColor: '#0f172a',
      color: '#ffffff',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      fontSize: '13px',
      zIndex: 9999,
      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      position: 'sticky',
      top: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          backgroundColor: '#3b82f6',
          color: '#fff',
          padding: '2px 8px',
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: '11px',
          letterSpacing: '0.5px'
        }}>
          REAL ESTATE PORTAL
        </span>
        <span style={{ color: '#94a3b8' }}>Chuyển đổi phiên bản:</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <NavLink
          to="/bootstrap"
          style={{
            padding: '5px 12px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 600,
            transition: 'all 0.2s',
            backgroundColor: isBootstrap ? '#2563eb' : '#1e293b',
            color: isBootstrap ? '#ffffff' : '#cbd5e1',
            border: isBootstrap ? '1px solid #3b82f6' : '1px solid #334155',
          }}
        >
          🎨 Bản 1: Bootstrap (Figma Static)
        </NavLink>

        <NavLink
          to="/mui"
          style={{
            padding: '5px 12px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 600,
            transition: 'all 0.2s',
            backgroundColor: !isBootstrap ? '#0284c7' : '#1e293b',
            color: !isBootstrap ? '#ffffff' : '#cbd5e1',
            border: !isBootstrap ? '1px solid #38bdf8' : '1px solid #334155',
          }}
        >
          ⚛️ Bản 2: MUI (API & Auth Guard)
        </NavLink>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#4ade80', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'inline-block' }}></span>
              Đã đăng nhập: <strong>{user?.name || user?.username}</strong>
            </span>
            <button
              onClick={logout}
              style={{
                backgroundColor: '#dc2626',
                border: 'none',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#f87171', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f87171', display: 'inline-block' }}></span>
              Chưa đăng nhập (Khóa API)
            </span>
            <button
              onClick={() => login('admin@vinhomes.vn')}
              style={{
                backgroundColor: '#16a34a',
                border: 'none',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Đăng nhập mẫu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
