import React from 'react';

const TABS = [
  { id: 'overview', label: 'Tổng quan', icon: '🌐' },
  { id: 'location', label: 'Vị trí', icon: '📍' },
  { id: 'phases', label: 'Phân khu', icon: '🧭' },
  { id: 'floorplan', label: 'Mặt bằng quỹ căn', icon: '🗺️' },
  { id: 'units', label: 'Quỹ căn', icon: '🏢', active: true },
  { id: 'policy', label: 'Chính sách bán hàng', icon: '📄' },
  { id: 'news', label: 'Tin tức', icon: '📰' },
];

export const BsNavPills: React.FC = () => {
  return (
    <div className="container-fluid px-3 px-md-4 mt-3">
      <div className="bg-white p-2 rounded-3 shadow-sm overflow-auto">
        <ul className="nav nav-pills flex-nowrap gap-2">
          {TABS.map((tab) => (
            <li className="nav-item text-nowrap" key={tab.id}>
              <button
                type="button"
                className={`nav-link d-flex align-items-center gap-2 ${tab.active ? 'active' : ''}`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
