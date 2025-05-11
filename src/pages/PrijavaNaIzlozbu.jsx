import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PrijavaNaIzlozbu() {
    const { id } = useParams();
    const [poruka, setPoruka] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPorukaOpen, setModalPorukaOpen] = useState(false);
    const [korisnik, setKorisnik] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("/api/korisnici/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setKorisnik(res.data))
        .catch(err => {
            console.error("Greška pri dohvatanju korisnika", err);
            setPoruka("Morate biti prijavljeni da biste se prijavili na izložbu.");
            setModalPorukaOpen(true);
        });
    }, []);

    useEffect(() => {
        if (modalOpen || modalPorukaOpen) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [modalOpen, modalPorukaOpen]);

    const potvrdiPrijavu = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.post("/api/prijave",
                { izlozba_id: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPoruka("Uspešno ste se prijavili na izložbu!");
        } catch (error) {
            if (error.response?.status === 409) {
                setPoruka("Već ste prijavljeni na ovu izložbu.");
            } else {
                setPoruka("Došlo je do greške prilikom prijave.");
            }
        } finally {
            setModalOpen(false);
            setModalPorukaOpen(true);
        }
    };

    const handlePrijavaClick = () => {
        setModalOpen(true);
    };

    const zatvoriModal = () => {
        setModalOpen(false);
    };

    const zatvoriPoruku = () => {
        setModalPorukaOpen(false);
        setPoruka("");
    };

    return (
        <div className="container mt-5">
            <h2>Prijava na izložbu</h2>

            <button
                className="btn btn-success"
                onClick={handlePrijavaClick}
                disabled={!korisnik}
            >
                Prijavi se
            </button>

            {/* Modal za potvrdu prijave */}
            {modalOpen && korisnik && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg border-0">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Potvrda prijave</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={zatvoriModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Da li ste sigurni da želite da se prijavite na ovu izložbu kao korisnik:</p>
                                <p><strong>{korisnik.ime} {korisnik.prezime}</strong></p>
                                <p>Email: <strong>{korisnik.email}</strong></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={zatvoriModal}>Odustani</button>
                                <button type="button" className="btn btn-primary" onClick={potvrdiPrijavu}>Potvrdi prijavu</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </div>
            )}

            {/* Modal za prikaz poruka */}
            {modalPorukaOpen && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg border-0">
                            <div className="modal-header bg-info text-white">
                                <h5 className="modal-title">Obaveštenje</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={zatvoriPoruku}></button>
                            </div>
                            <div className="modal-body">
                                <p>{poruka}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info text-white" onClick={zatvoriPoruku}>U redu</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </div>
            )}
        </div>
    );
}

export default PrijavaNaIzlozbu;



