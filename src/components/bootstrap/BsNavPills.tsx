import React, { useState } from 'react';

const TABS = [
  { id: 'overview', label: 'Tổng quan', icon: '🌐' },
  { id: 'location', label: 'Vị trí', icon: '📍' },
  { id: 'phases', label: 'Phân khu', icon: '🧭' },
  { id: 'floorplan', label: 'Mặt bằng quỹ căn', icon: '🗺️' },
  { id: 'units', label: 'Quỹ căn', icon: '🏢' },
  { id: 'policy', label: 'Chính sách bán hàng', icon: '📄' },
  { id: 'news', label: 'Tin tức', icon: '📰' },
];

export const BsNavPills: React.FC = () => {
  const [activeTab, setActiveTab] = useState('units');

  return (
    <div className="bs-main-container mt-3">
      <div
        className="nav-pills-bar overflow-auto shadow-sm"
        style={{
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <ul className="nav nav-pills flex-nowrap gap-1">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <li className="nav-item" key={tab.id}>
                <button
                  type="button"
                  className={`nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    backgroundColor: isActive ? '#0284c7' : 'transparent',
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.85)',
                  }}
                >
                  <span style={{ fontSize: '13px' }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
