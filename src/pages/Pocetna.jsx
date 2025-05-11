import React from 'react';
import { useNavigate } from 'react-router-dom';

function Pocetna() {
  const navigate = useNavigate(); //test

  return (
    <div className="container py-5">
      {/* Hero sekcija */}
      <div 
        className="p-5 mb-4 rounded-3 text-white" 
        style={{
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        <div className="container-fluid text-center py-5">
          <h1 className="display-4 fw-bold">Dobro došli u svet fotografije</h1>
          <p className="fs-5 mt-3">
            Otkrijte izložbe, upoznajte umetnike i istražite inspirativne galerije.
          </p>
        </div>
      </div>

      {/* Sekcija kartica */}
      <div className="row">
        {/* Kartica Izložbe */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100 shadow-sm border-0 rounded-3 hover-shadow">
            <div className="card-body text-center">
              <div className="display-4 mb-3">🎯</div>
              <h5 className="card-title fw-semibold">Istraži izložbe</h5>
              <p className="card-text text-muted">
                Pregledaj najnovije fotografske izložbe i pronađi svoju inspiraciju.
              </p>
              <button 
                className="btn btn-outline-primary mt-2" 
                onClick={() => navigate('/izlozbe')}
              >
                Saznaj više
              </button>
            </div>
          </div>
        </div>

        {/* Kartica O nama */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100 shadow-sm border-0 rounded-3 hover-shadow">
            <div className="card-body text-center">
              <div className="display-4 mb-3">✨</div>
              <h5 className="card-title fw-semibold">Naša priča</h5>
              <p className="card-text text-muted">
                Saznaj više o našoj misiji, viziji i ljudima iza ove platforme.
              </p>
              <button 
                className="btn btn-outline-primary mt-2" 
                onClick={() => navigate('/o-nama')}
              >
                Saznaj više
              </button>
            </div>
          </div>
        </div>

        {/* Kartica Galerije */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100 shadow-sm border-0 rounded-3 hover-shadow">
            <div className="card-body text-center">
              <div className="display-4 mb-3">🖼️</div>
              <h5 className="card-title fw-semibold">Pregledaj galerije</h5>
              <p className="card-text text-muted">
                Uroni u bogate kolekcije radova domaćih i stranih umetnika.
              </p>
              <button 
                className="btn btn-outline-primary mt-2" 
                onClick={() => navigate('/galerije')} //do stranice galerije
              >
                Saznaj više
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pocetna;
