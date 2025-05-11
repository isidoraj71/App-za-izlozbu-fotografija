import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const [nazivGalerije, setNazivGalerije] = useState(null);

  useEffect(() => {
    const galerijaIndex = pathnames.findIndex((segment, i) => segment === 'galerija' && pathnames[i + 1]);
    const galerijaId = galerijaIndex !== -1 ? pathnames[galerijaIndex + 1] : null;

    if (galerijaId) {
      const token = localStorage.getItem('token');
      axios.get(`http://localhost:8000/api/galerije/${galerijaId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const naziv = res.data.data?.naziv;
        if (naziv) setNazivGalerije(naziv);
      })
      .catch(err => console.error("Greška pri dohvaćanju naziva galerije:", err));
    }
  }, [location]);

  return (
    <nav aria-label="breadcrumb" className="my-3">
      <ol className="breadcrumb px-3 py-2 rounded shadow-sm bg-light">
        <li className="breadcrumb-item">
          <Link className="text-decoration-none text-primary fw-medium" to="/">
            <i className="bi bi-house-door-fill me-1"></i> Početna
          </Link>
        </li>

        {pathnames.map((segment, index) => {
          const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;

          const isGalerijaId = pathnames[index - 1] === 'galerija' && !isNaN(segment);
          let displayName = decodeURIComponent(segment);

          if (isGalerijaId && nazivGalerije) {
            displayName = nazivGalerije;
          }

          // Formatiranje lepog prikaza (veliko prvo slovo i zamena "-" sa razmakom)
          displayName = displayName
            .replace(/-/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());

          return (
            <li
              key={index}
              className={`breadcrumb-item ${isLast ? 'active fw-semibold text-dark' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {!isLast ? (
                <Link className="text-decoration-none text-primary" to={routeTo}>
                  {displayName}
                </Link>
              ) : (
                displayName
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;





