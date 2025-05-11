import React, { useEffect, useState } from "react";
import axios from "axios";

const MojeFotografije = () => {
  const [fotografije, setFotografije] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFotografije = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/moje-fotografije", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFotografije(response.data.data);
      } catch (error) {
        setError("Greška pri učitavanju fotografija.");
      } finally {
        setLoading(false);
      }
    };

    fetchFotografije();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">📸 Moje Fotografije</h2>

      {loading && <div className="text-center text-muted">Učitavanje fotografija...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && fotografije.length === 0 ? (
        <p className="text-center text-muted">Trenutno nema fotografija za prikaz.</p>
      ) : (
        <div className="row">
          {fotografije.map((fotografija) => (
            <div key={fotografija.id} className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
              <div className="card shadow-sm w-100">
                <div style={{ height: "250px", overflow: "hidden" }}>
                  <img
                    src={fotografija.slika || "https://via.placeholder.com/500x300?text=Nema+slike"}
                    alt={fotografija.naziv}
                    className="card-img-top h-100 w-100 object-fit-cover"
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{fotografija.naziv}</h5>
                  <p className="card-text text-muted flex-grow-1">{fotografija.opis || "Bez opisa."}</p>
                  <p className="small text-secondary mt-2">
                    🎨 <strong>Tehnika:</strong> {fotografija.tehnika || "Nepoznato"}<br />
                    📅 <strong>Datum:</strong> {new Date(fotografija.datum_kreiranja).toLocaleDateString('sr-RS')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MojeFotografije;




