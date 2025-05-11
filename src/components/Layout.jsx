import React from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Breadcrumbs se ne prikazuje na početnoj stranici */}
      {!isHome && (
        <div className="container mb-3">
          <Breadcrumbs />
        </div>
      )}
      {children}
    </div>
  );
}

export default Layout;

