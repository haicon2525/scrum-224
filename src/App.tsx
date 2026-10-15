import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { VersionSwitcher } from './components/common/VersionSwitcher';
import { BootstrapPage } from './pages/BootstrapPage';
import { MuiPage } from './pages/MuiPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Top persistent switcher bar to easily toggle versions & test Auth */}
        <VersionSwitcher />

        <Routes>
          {/* Default redirect to MUI production page */}
          <Route path="/" element={<Navigate to="/mui" replace />} />

          {/* Version 1: Bootstrap Static layout according to Figma */}
          <Route path="/bootstrap" element={<BootstrapPage />} />

          {/* Version 2: MUI Official page with API & Auth Guard */}
          <Route path="/mui" element={<MuiPage />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/mui" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
