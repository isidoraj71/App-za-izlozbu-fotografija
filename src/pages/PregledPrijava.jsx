import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PregledPrijava = () => {
    const [prijave, setPrijave] = useState([]);
    const [poruka, setPoruka] = useState('');

    useEffect(() => {
        axios.get('/api/moje-prijave', { // API za prijave korisnika
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            setPrijave(response.data);
        })
        .catch(error => {
            console.error(error);
            setPoruka('Došlo je do greške prilikom učitavanja prijava.');
        });
    }, []);

    const otkaziPrijavu = (id) => {
        if (window.confirm('Da li ste sigurni da želite da otkažete prijavu?')) {
            axios.delete(`/api/prijave/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(() => {
                setPrijave(prijave.filter(prijava => prijava.id !== id));
                setPoruka('Prijava je uspešno otkazana.');
            })
            .catch(error => {
                console.error(error);
                setPoruka('Došlo je do greške prilikom otkazivanja prijave.');
            });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Moje prijave</h2>
            {poruka && <div className="alert alert-info">{poruka}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Izložba</th>
                        <th>Datum prijave</th>
                        <th>Status</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {prijave.map(prijava => (
                        <tr key={prijava.id}>
                            <td>{prijava.izlozba?.naziv || 'Nepoznata izložba'}</td>
                            <td>{prijava.datum_prijave}</td>
                            <td>{prijava.status || 'Aktivna'}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => otkaziPrijavu(prijava.id)}>
                                    Otkaži prijavu
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PregledPrijava;