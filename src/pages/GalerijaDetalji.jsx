import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const GalerijaDetalji = () => {
  const { id } = useParams();
  const [galerija, setGalerija] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [izlozbaZaPrijavu, setIzlozbaZaPrijavu] = useState(null);
  const [korisnik, setKorisnik] = useState(null);
  const [poruka, setPoruka] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Dohvati galeriju
    axios.get(`http://localhost:8000/api/galerije/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setGalerija(response.data.data))
      .catch(error => {
        console.error("Greška pri učitavanju detalja galerije:", error);
        setError('Ne možemo učitati detalje galerije.');
      })
      .finally(() => setLoading(false));

    // Dohvati korisnika
    axios.get(`http://localhost:8000/api/korisnici/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setKorisnik(res.data))
      .catch(() => setKorisnik(null));
  }, [id]);

  // Modal stil
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "auto";
      document.querySelector(".modal-backdrop")?.remove();
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "auto";
      document.querySelector(".modal-backdrop")?.remove();
    };
  }, [modalOpen]);

  const handlePrijava = (izlozba) => {
    setIzlozbaZaPrijavu(izlozba);
    setModalOpen(true);
  };

  const potvrdiPrijavu = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8000/api/prijave", {
        izlozba_id: izlozbaZaPrijavu.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPoruka("Uspešno ste se prijavili na izložbu!");
    } catch (error) {
      console.error("Greška:", error);
      if (error.response?.status === 409) {
        setPoruka("Već ste prijavljeni na ovu izložbu.");
      } else {
        setPoruka("Došlo je do greške prilikom prijave.");
      }
    } finally {
      setModalOpen(false);
    }
  };

  const zatvoriModal = () => {
    setModalOpen(false);
    setIzlozbaZaPrijavu(null);
  };

  const formatirajDatum = (datum) => {
    const d = new Date(datum);
    return d.toLocaleDateString('sr-RS');
  };

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!galerija) return <p>Nema podataka za ovu galeriju.</p>;

  return (
    <div className="container py-4">
      <h2>{galerija.naziv}</h2>
      <p>{galerija.opis}</p>

      <h4 className="mt-4">Izložbe u ovoj galeriji:</h4>
      {galerija.izlozbe && galerija.izlozbe.length > 0 ? (
        <div>
          {galerija.izlozbe.map((izlozba) => (
            <div key={izlozba.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{izlozba.naziv}</h5>
                <p><strong>Tema:</strong> {izlozba.tema}</p>
                <p>
                  <strong>Datum:</strong> {formatirajDatum(izlozba.datum_pocetka)} do {formatirajDatum(izlozba.datum_kraja)}
                </p>
                <button className="btn btn-primary" onClick={() => handlePrijava(izlozba)}>Prijavi se</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Trenutno nema izložbi u ovoj galeriji.</p>
      )}

      {/* Modal */}
      {modalOpen && korisnik && izlozbaZaPrijavu && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Potvrda prijave</h5>
                <button type="button" className="btn-close" onClick={zatvoriModal}></button>
              </div>
              <div className="modal-body">
                <p>Da li ste sigurni da želite da se prijavite na izložbu <strong>{izlozbaZaPrijavu.naziv}</strong> kao:</p>
                <p><strong>{korisnik.ime} {korisnik.prezime}</strong></p>
                <p>Email: <strong>{korisnik.email}</strong></p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={zatvoriModal}>Odustani</button>
                <button className="btn btn-primary" onClick={potvrdiPrijavu}>Potvrdi prijavu</button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}

      {/* Poruka nakon prijave */}
      {poruka && <div className="alert alert-info mt-3">{poruka}</div>}
    </div>
  );
};

export default GalerijaDetalji;


