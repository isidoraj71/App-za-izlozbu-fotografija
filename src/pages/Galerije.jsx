import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Galerije = () => {
  const [galerije, setGalerije] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:8000/api/galerije', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setGalerije(response.data.data);
    })
    .catch(error => {
      console.error("Greška pri učitavanju galerija:", error);
      setError('Neautorizovan pristup. Prijavite se ponovo.');
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Galerije</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {galerije.length === 0 ? (
        <p className="text-muted">Nema dostupnih galerija.</p>
      ) : (
        <div className="row">
          {galerije.map(galerija => (
            <div className="col-md-6 mb-4" key={galerija.id}>
              <div className="card shadow-sm h-100">
                {galerija.slika && (
                  <img
                    src={galerija.slika}
                    alt={galerija.naziv}
                    className="card-img-top"
                    style={{ height: '280px', objectFit: 'cover', width: '100%' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{galerija.naziv}</h5>
                  <p className="card-text">{galerija.opis}</p>
                  <Link to={`/galerija/${galerija.id}`} className="btn btn-outline-primary">
                    Pregledaj detalje
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Galerije;



