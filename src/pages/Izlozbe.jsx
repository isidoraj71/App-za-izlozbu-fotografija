import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Izlozbe = () => {
  const [izlozbe, setIzlozbe] = useState([]);
  const [error, setError] = useState('');
  const [filterDatum, setFilterDatum] = useState('');
  const [korisnik, setKorisnik] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selektovanaIzlozba, setSelektovanaIzlozba] = useState(null);
  const [trenutnaStranica, setTrenutnaStranica] = useState(1);

  const navigate = useNavigate();
  const izlozbiPoStranici = 1;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios.get('http://localhost:8000/api/izlozbe', { headers })
      .then(response => setIzlozbe(response.data.data))
      .catch(error => {
        console.error("Greška pri dohvatanju izložbi:", error);
        setError('Greška prilikom učitavanja izložbi. Prijavite se ponovo.');
      });

    if (token) {
      axios.get('/api/korisnici/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setKorisnik(res.data))
        .catch(() => setKorisnik(null));
    } else {
      setKorisnik(null);
    }
  }, []);

  const formatirajDatum = (datum) => {
    const d = new Date(datum);
    return d.toLocaleDateString('sr-RS');
  };

  const filtriraneIzlozbe = izlozbe.filter(izl => {
    if (!filterDatum) return true;
    const datum = new Date(filterDatum);
    return (
      new Date(izl.datum_pocetka) <= datum &&
      new Date(izl.datum_kraja) >= datum
    );
  });

  const ukupnoStranica = Math.ceil(filtriraneIzlozbe.length / izlozbiPoStranici);
  const prikazaneIzlozbe = filtriraneIzlozbe.slice(
    (trenutnaStranica - 1) * izlozbiPoStranici,
    trenutnaStranica * izlozbiPoStranici
  );

  const handlePrijavaClick = (izlozba) => {
    setSelektovanaIzlozba(izlozba);
    setModalOpen(true);
  };

  const zatvoriModal = () => {
    setModalOpen(false);
    setSelektovanaIzlozba(null);
  };

  const potvrdiPrijavu = async () => {
    if (!selektovanaIzlozba) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/prijave', {
        izlozba_id: selektovanaIzlozba.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Uspešno ste se prijavili na izložbu.");
    } catch (error) {
      if (error.response?.status === 409) {
        alert("Već ste prijavljeni na ovu izložbu.");
      } else {
        alert("Došlo je do greške prilikom prijave.");
      }
    } finally {
      zatvoriModal();
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Pregled izložbi</h2>

      <div className="mb-4">
        <label className="form-label fw-semibold">Filtriraj po datumu:</label>
        <input
          type="date"
          className="form-control"
          value={filterDatum}
          onChange={(e) => {
            setFilterDatum(e.target.value);
            setTrenutnaStranica(1);
          }}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {prikazaneIzlozbe.map((izlozba) => (
          <div className="col-md-12 mb-4" key={izlozba.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold">{izlozba.naziv}</h5>
                <p className="card-subtitle text-muted">{izlozba.lokacija}</p>
                <p className="mt-2">{izlozba.tema}</p>
                <p>{formatirajDatum(izlozba.datum_pocetka)} do {formatirajDatum(izlozba.datum_kraja)}</p>

                {/* Slike izložbe */}
                {izlozba.fotografije && izlozba.fotografije.length > 0 && (
                  <div className="row mt-3">
                    {izlozba.fotografije.map((foto, index) => (
                      <div className="col-md-4 mb-3" key={foto.id}>
                        <div className="card h-100 position-relative">
                          <img
                            src={foto.slika}
                            alt={foto.naziv}
                            className="card-img-top"
                            style={{
                              objectFit: 'cover',
                              height: '200px',
                              filter: !korisnik && index > 0 ? 'blur(6px) brightness(70%)' : 'none'
                            }}
                          />
                          {!korisnik && index > 0 && (
                            <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
                              <small>Ulogujte se da vidite više</small><br />
                              <button
                                className="btn btn-sm btn-light mt-1"
                                onClick={() => navigate('/uloguj-se')}
                              >
                                Uloguj se
                              </button>
                            </div>
                          )}
                          <div className="card-body p-2">
                            <h6 className="card-title mb-1">{foto.naziv}</h6>
                            <p className="card-text text-muted mb-0" style={{ fontSize: '0.9em' }}>
                              Tehnika: {foto.tehnika}
                            </p>
                            <p className="card-text text-muted" style={{ fontSize: '0.9em' }}>
                              Datum: {formatirajDatum(foto.datum_kreiranja)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  className="btn btn-primary mt-3"
                  onClick={() => handlePrijavaClick(izlozba)}
                  disabled={!korisnik}
                >
                  Prijavi se
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginacija */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: ukupnoStranica }, (_, i) => i + 1).map(broj => (
            <li key={broj} className={`page-item ${trenutnaStranica === broj ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setTrenutnaStranica(broj)}>{broj}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Modal za potvrdu prijave */}
      {modalOpen && selektovanaIzlozba && korisnik && (
        <>
          <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ zIndex: 1060 }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Potvrda prijave</h5>
                  <button type="button" className="btn-close" onClick={zatvoriModal}></button>
                </div>
                <div className="modal-body">
                  <p>Da li ste sigurni da želite da se prijavite na ovu izložbu kao:</p>
                  <p><strong>{korisnik.ime} {korisnik.prezime}</strong></p>
                  <p>Email: <strong>{korisnik.email}</strong></p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={zatvoriModal}>Odustani</button>
                  <button className="btn btn-primary" onClick={potvrdiPrijavu}>Potvrdi prijavu</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={zatvoriModal}></div>
        </>
      )}
    </div>
  );
};

export default Izlozbe;













