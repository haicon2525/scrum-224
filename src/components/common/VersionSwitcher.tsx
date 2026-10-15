import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const VersionSwitcher: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const isBootstrap = location.pathname.startsWith('/bootstrap');
  
  // Trạng thái thu nhỏ tối đa (chỉ còn 1 icon tròn nhỏ)
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    return localStorage.getItem('switcher_minimized') === 'true';
  });

  const toggleMinimize = () => {
    setIsMinimized(prev => {
      const next = !prev;
      localStorage.setItem('switcher_minimized', String(next));
      return next;
    });
  };

  const handleSwitch = (target: '/bootstrap' | '/mui') => {
    if (location.pathname !== target) {
      navigate(target);
    }
  };

  // Khi đang thu gọn hoàn toàn: hiển thị Floating Button tròn siêu nhỏ gọn (40x40px)
  if (isMinimized) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <button
          onClick={() => handleSwitch(isBootstrap ? '/mui' : '/bootstrap')}
          title={`Đang xem: ${isBootstrap ? 'Bootstrap' : 'MUI'}. Click để đổi sang ${isBootstrap ? 'MUI' : 'Bootstrap'}`}
          style={{
            height: '42px',
            padding: '0 14px',
            borderRadius: '21px',
            backgroundColor: isBootstrap ? '#2563eb' : '#0284c7',
            color: '#ffffff',
            border: '2px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 700,
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.35)';
          }}
        >
          <span>{isBootstrap ? '🎨 Bootstrap' : '⚛️ MUI'}</span>
          <span style={{ opacity: 0.75, fontSize: '11px' }}>⇄</span>
          <span style={{ opacity: 0.9, fontSize: '12px' }}>{isBootstrap ? 'MUI' : 'Bootstrap'}</span>
        </button>

        <button
          onClick={toggleMinimize}
          title="Mở rộng bảng điều khiển"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#1e293b',
            color: '#94a3b8',
            border: '1px solid #334155',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          ⚙️
        </button>
      </div>
    );
  }

  // Chế độ thanh điều khiển nổi gọn gàng (Floating Pill)
  return (
    <aside
      aria-label="Version Switcher"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99999,
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '30px',
        padding: '5px 8px 5px 14px',
        boxShadow: '0 8px 28px rgba(0, 0, 0, 0.38), 0 2px 6px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#ffffff',
        fontSize: '13px',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Label nhỏ */}
      <span
        style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
          userSelect: 'none',
        }}
      >
        Giao diện:
      </span>

      {/* Segmented Switch Buttons */}
      <div
        style={{
          display: 'flex',
          backgroundColor: '#020617',
          padding: '3px',
          borderRadius: '20px',
          gap: '3px',
          border: '1px solid #1e293b',
        }}
      >
        <button
          onClick={() => handleSwitch('/bootstrap')}
          style={{
            padding: '4px 12px',
            borderRadius: '16px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: isBootstrap ? '#2563eb' : 'transparent',
            color: isBootstrap ? '#ffffff' : '#94a3b8',
            boxShadow: isBootstrap ? '0 2px 6px rgba(37, 99, 235, 0.4)' : 'none',
          }}
        >
          🎨 Bootstrap
        </button>

        <button
          onClick={() => handleSwitch('/mui')}
          style={{
            padding: '4px 12px',
            borderRadius: '16px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: !isBootstrap ? '#0284c7' : 'transparent',
            color: !isBootstrap ? '#ffffff' : '#94a3b8',
            boxShadow: !isBootstrap ? '0 2px 6px rgba(2, 132, 199, 0.4)' : 'none',
          }}
        >
          ⚛️ MUI
        </button>
      </div>

      {/* Auth Status & Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderLeft: '1px solid #334155', paddingLeft: '8px' }}>
        {isAuthenticated ? (
          <>
            <span
              title={`Tài khoản: ${user?.name || user?.username}`}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 6px #22c55e',
                display: 'inline-block',
              }}
            />
            <button
              onClick={logout}
              title="Đăng xuất tài khoản"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ef4444';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#f87171';
              }}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <span
            title="Chưa đăng nhập (Xem chế độ khách/cần login UAT ở bản MUI)"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#f87171',
              display: 'inline-block',
            }}
          />
        )}

        {/* Nút thu nhỏ */}
        <button
          onClick={toggleMinimize}
          title="Thu gọn nút"
          aria-label="Thu gọn nút chuyển đổi"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '2px 6px',
            fontSize: '14px',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            marginLeft: '2px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#cbd5e1')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
        >
          ✕
        </button>
      </div>
    </aside>
  );
};

