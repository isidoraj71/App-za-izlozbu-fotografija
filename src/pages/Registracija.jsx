import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registracija() {
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    lozinka: "",
  });
  const [poruka, setPoruka] = useState("");
  const [greske, setGreske] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.ime.trim()) errors.ime = "Ime je obavezno.";
    if (!formData.prezime.trim()) errors.prezime = "Prezime je obavezno.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email nije validan.";
    if (formData.lozinka.length < 6) errors.lozinka = "Lozinka mora imati bar 6 karaktera.";
    setGreske(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("/api/register", formData);
      setPoruka("Uspešno ste se registrovali!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setPoruka("Greška pri registraciji! Proverite podatke.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Registracija korisnika</h2>
      {poruka && <div className="alert alert-info">{poruka}</div>}
      <form onSubmit={handleSubmit}>
        {[
          { label: "Ime", name: "ime", type: "text" },
          { label: "Prezime", name: "prezime", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Lozinka", name: "lozinka", type: "password" },
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              type={field.type}
              className={`form-control ${greske[field.name] ? "is-invalid" : ""}`}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
            {greske[field.name] && (
              <div className="invalid-feedback">{greske[field.name]}</div>
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-100">
          Registruj se
        </button>
      </form>
    </div>
  );
}

export default Registracija;
