import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function DetaljiIzlozbe() {
    const { id } = useParams();
    const [izlozba, setIzlozba] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/izlozbe/${id}`)
            .then(response => {
                setIzlozba(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Greška pri dohvaćanju izložbe:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Učitavanje...</p>;
    if (!izlozba) return <p>Izložba nije pronađena.</p>;

    return (
        <div className="container mt-5">
            <h2>{izlozba.naziv}</h2>
            <p><strong>Tema:</strong> {izlozba.tema}</p>
            <p><strong>Lokacija:</strong> {izlozba.lokacija}</p>
            <p><strong>Datum početka:</strong> {izlozba.datum_pocetka}</p>
            <p><strong>Datum kraja:</strong> {izlozba.datum_kraja}</p>
            <p><strong>Dostupna mesta:</strong> {izlozba.dostupna_mesta}</p>

            <Link to={`/prijava-na-izlozbu/${izlozba.id}`}>
                <button className="btn btn-primary">Prijavi se</button>
            </Link>
        </div>
    );
}

export default DetaljiIzlozbe;