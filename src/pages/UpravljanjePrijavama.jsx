import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpravljanjePrijavama = () => {
    const [prijave, setPrijave] = useState([]);
    const [poruka, setPoruka] = useState('');

    // Dodaj nove state-ove za modal
    const [prikaziModal, setPrikaziModal] = useState(false);
    const [odabranaPrijava, setOdabranaPrijava] = useState(null);
    const [noviStatus, setNoviStatus] = useState('');

    useEffect(() => {
        axios.get('/api/prijave', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            setPrijave(response.data.data);
        })
        .catch(() => {
            setPoruka('Došlo je do greške prilikom učitavanja prijava.');
        });
    }, []);

    const otvoriModal = (prijava, status) => {
        setOdabranaPrijava(prijava);
        setNoviStatus(status);
        setPrikaziModal(true);
    };

    const zatvoriModal = () => {
        setPrikaziModal(false);
        setOdabranaPrijava(null);
        setNoviStatus('');
    };

    const potvrdiPromenuStatusa = () => {
        axios.put(`/api/prijave/${odabranaPrijava.id}`, { status: noviStatus }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(() => {
            setPrijave(prijave.map(prijava => 
                prijava.id === odabranaPrijava.id ? { ...prijava, status: noviStatus } : prijava
            ));
            setPoruka(`Status prijave je promenjen u "${noviStatus}".`);
        })
        .catch(() => {
            setPoruka('Došlo je do greške, pokušajte ponovo.');
        });

        zatvoriModal();
    };

    return (
        <div className="container mt-5">
            <h2>Upravljanje prijavama</h2>
            {poruka && <div className="alert alert-info">{poruka}</div>}
            
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Korisnik</th>
                        <th>Izložba</th>
                        <th>Datum prijave</th>
                        <th>Status</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {prijave.map(prijava => (
                        <tr key={prijava.id}>
                            <td>{prijava.id}</td>
                            <td>{prijava.korisnik?.ime} {prijava.korisnik?.prezime}</td>
                            <td>{prijava.izlozba?.naziv}</td>
                            <td>{prijava.datum_prijave}</td>
                            <td>{prijava.status}</td>
                            <td>
                                <button 
                                    className="btn btn-success me-2" 
                                    onClick={() => otvoriModal(prijava, 'AKTIVNA')}
                                >
                                    Aktiviraj
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => otvoriModal(prijava, 'PONIŠTENA')}
                                >
                                    Poništi
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Bootstrap modal za potvrdu akcije */}
            {prikaziModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Potvrda izmene statusa</h5>
                                <button type="button" className="btn-close" onClick={zatvoriModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                Da li ste sigurni da želite da promenite status prijave korisnika <strong>{odabranaPrijava.korisnik?.ime} {odabranaPrijava.korisnik?.prezime}</strong> za izložbu <strong>{odabranaPrijava.izlozba?.naziv}</strong> u "<strong>{noviStatus}</strong>"?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={zatvoriModal}>
                                    Odustani
                                </button>
                                <button type="button" className="btn btn-danger" onClick={potvrdiPromenuStatusa}>
                                    Potvrdi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpravljanjePrijavama;