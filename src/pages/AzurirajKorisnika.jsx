import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AzurirajKorisnika() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
  });
  const [poruka, setPoruka] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKorisnik = async () => {
      try {
        const response = await axios.get(`/api/korisnici/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        setPoruka("Greška pri učitavanju korisnika!");
      }
    };

    fetchKorisnik();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/korisnici/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPoruka("Uspešno ste ažurirali korisnika!");
      setTimeout(() => navigate("/pregled-korisnika"), 2000); // Redirekcija nazad
    } catch (error) {
      setPoruka("Greška pri ažuriranju korisnika!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ažuriranje korisnika</h2>
      {poruka && <div className="alert alert-info">{poruka}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Ime</label>
          <input
            type="text"
            className="form-control"
            name="ime"
            value={formData.ime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prezime</label>
          <input
            type="text"
            className="form-control"
            name="prezime"
            value={formData.prezime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sačuvaj
        </button>
      </form>
    </div>
  );
}

export default AzurirajKorisnika;