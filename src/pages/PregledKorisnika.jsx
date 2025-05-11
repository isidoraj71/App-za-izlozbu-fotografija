import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap modal-a

function PregledKorisnika() {
  const [korisnici, setKorisnici] = useState([]);
  const [poruka, setPoruka] = useState("");
  const [showModal, setShowModal] = useState(false); // Stanje za modal
  const [korisnikZaBrisanje, setKorisnikZaBrisanje] = useState(null); // Čuva ID korisnika koji treba da se obriše
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKorisnici = async () => {
      try {
        const response = await axios.get("/api/korisnici", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setKorisnici(response.data.data); // Proverite strukturu API odgovora
      } catch (error) {
        setPoruka("Greška pri učitavanju korisnika!");
      }
    };

    fetchKorisnici();
  }, []);

  const potvrdiBrisanje = (id) => {
    setKorisnikZaBrisanje(id);
    setShowModal(true); // Prikaz modalnog prozora
  };

  const obrisiKorisnika = async () => {
    if (korisnikZaBrisanje) {
      try {
        await axios.delete(`/api/korisnici/${korisnikZaBrisanje}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setKorisnici(korisnici.filter((korisnik) => korisnik.id !== korisnikZaBrisanje));
        setPoruka("Korisnik je uspešno obrisan.");
      } catch (error) {
        setPoruka("Greška pri brisanju korisnika!");
      }
    }
    setShowModal(false); // Zatvori modal
  };

  return (
    <div className="container mt-5">
      <h2>Pregled svih korisnika</h2>
      {poruka && <div className="alert alert-danger">{poruka}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Uloga</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {korisnici.map((korisnik) => (
            <tr key={korisnik.id}>
              <td>{korisnik.id}</td>
              <td>{korisnik.ime}</td>
              <td>{korisnik.prezime}</td>
              <td>{korisnik.email}</td>
              <td>{korisnik.uloga.naziv}</td>
              <td>
                <button className="btn btn-danger me-2" onClick={() => potvrdiBrisanje(korisnik.id)}>
                  Obriši
                </button>
                <button className="btn btn-warning" onClick={() => navigate(`/azuriraj-korisnika/${korisnik.id}`)}>
                  Izmeni
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bootstrap Modal za potvrdu brisanja */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Potvrda brisanja</Modal.Title>
        </Modal.Header>
        <Modal.Body>Da li ste sigurni da želite da obrišete ovog korisnika?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Odustani
          </Button>
          <Button variant="danger" onClick={obrisiKorisnika}>
            Obriši
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PregledKorisnika;
