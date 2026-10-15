import React from 'react';
import { useBootstrapLoader } from '../utils/useBootstrapLoader';
import { BsHeader } from '../components/bootstrap/BsHeader';
import { BsHeroBanner } from '../components/bootstrap/BsHeroBanner';
import { BsNavPills } from '../components/bootstrap/BsNavPills';
import { BsFilter } from '../components/bootstrap/BsFilter';
import { BsUnitTable } from '../components/bootstrap/BsUnitTable';
import { BsFooter } from '../components/bootstrap/BsFooter';
import { useAuth } from '../contexts/AuthContext';
import { AuthGuardModal } from '../components/common/AuthGuardModal';
import '../styles/bootstrap-scoped.css';

export const BootstrapPage: React.FC = () => {
  // Dynamically inject bootstrap stylesheet on mount and cleanup on unmount
  useBootstrapLoader();
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="bootstrap-scope d-flex flex-column min-vh-100">
      <BsHeader />
      <main className="flex-grow-1">
        <BsHeroBanner />
        <BsNavPills />

        {/* Quỹ căn Container with Blur & Centered AuthGuardModal (Figma Image 2) */}
        <div className="position-relative" style={{ minHeight: !isAuthenticated ? '650px' : 'auto' }}>
          {/* Blurred background content when unauthenticated */}
          <div
            style={{
              filter: !isAuthenticated ? 'blur(8px)' : 'none',
              opacity: !isAuthenticated ? 0.75 : 1,
              pointerEvents: !isAuthenticated ? 'none' : 'auto',
              userSelect: !isAuthenticated ? 'none' : 'auto',
              transition: 'filter 0.3s ease, opacity 0.3s ease',
            }}
          >
            <BsFilter />
            <BsUnitTable />
          </div>

          {/* Centered Login Card when unauthenticated */}
          {!isLoading && !isAuthenticated && <AuthGuardModal />}
        </div>
      </main>
      <BsFooter />
    </div>
  );
};

export default BootstrapPage;
