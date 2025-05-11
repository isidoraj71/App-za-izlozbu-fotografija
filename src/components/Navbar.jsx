import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [role, setRole] = useState(() => localStorage.getItem('role') || null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateRole = () => {
      const storedRole = localStorage.getItem('role');
      setRole(storedRole || null);
    };

    updateRole();
    window.addEventListener("storage", updateRole);

    return () => {
      window.removeEventListener("storage", updateRole);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setRole(null);
    setShowLogoutModal(false);
    navigate('/uloguj-se');
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">Početna</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/izlozbe">Izložbe</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/galerije">Galerije</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/o-nama">O nama</Link>
              </li>

              {role === 'ADMINISTRATOR' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/pregled-korisnika">Pregled korisnika</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/upravljanje-prijavama">Upravljanje prijavama</Link>
                  </li>
                </>
              )}

              {role === 'UMETNIK' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/umetnik/dodaj-fotografiju">Dodaj fotografiju</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/umetnik/moje-fotografije">Moje fotografije</Link>
                  </li>
                </>
              )}
            </ul>

            <ul className="navbar-nav">
              {role ? (
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={() => setShowLogoutModal(true)}>
                    Odjavi se
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/uloguj-se">Uloguj se</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Potvrda odjave</h5>
                  <button type="button" className="btn-close" onClick={() => setShowLogoutModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Da li ste sigurni da želite da se odjavite?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>Otkaži</button>
                  <button className="btn btn-danger" onClick={handleLogout}>Odjavi se</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;



