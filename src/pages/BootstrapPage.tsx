import React from 'react';
import { useBootstrapLoader } from '../utils/useBootstrapLoader';
import { BsHeader } from '../components/bootstrap/BsHeader';
import { BsHeroBanner } from '../components/bootstrap/BsHeroBanner';
import { BsNavPills } from '../components/bootstrap/BsNavPills';
import { BsFilter } from '../components/bootstrap/BsFilter';
import { BsUnitTable } from '../components/bootstrap/BsUnitTable';
import { BsFooter } from '../components/bootstrap/BsFooter';
import '../styles/bootstrap-scoped.css';

export const BootstrapPage: React.FC = () => {
  // Dynamically inject bootstrap stylesheet on mount and cleanup on unmount
  useBootstrapLoader();

  return (
    <div className="bootstrap-scope d-flex flex-column min-vh-100">
      <BsHeader />
      <main className="flex-grow-1">
        <BsHeroBanner />
        <BsNavPills />
        <BsFilter />
        <BsUnitTable />
      </main>
      <BsFooter />
    </div>
  );
};

export default BootstrapPage;
