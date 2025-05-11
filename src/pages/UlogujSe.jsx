import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UlogujSe() {
  const [formData, setFormData] = useState({ email: "", lozinka: "" });
  const [poruka, setPoruka] = useState("");
  const [greske, setGreske] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
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
      const response = await axios.post("/api/login", formData);

      if (!response.data.korisnik || !response.data.korisnik.uloga) {
        throw new Error("API nije vratio ulogu korisnika.");
      }

      localStorage.removeItem("role");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.korisnik.uloga);
      window.dispatchEvent(new Event("storage"));
      setPoruka("Uspešno ste se prijavili!");

      const role = response.data.korisnik.uloga;

      setTimeout(() => {
        if (role === "ADMINISTRATOR") {
          navigate("/pregled-korisnika");
        } else if (role === "UMETNIK") {
          navigate("/umetnik/moje-fotografije");
        } else {
          navigate("/");
        }
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Greška pri prijavi:", error);
      setPoruka("Greška pri prijavi! Proverite email i lozinku.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Uloguj se</h2>
      {poruka && <div className="alert alert-info">{poruka}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${greske.email ? "is-invalid" : ""}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {greske.email && <div className="invalid-feedback">{greske.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Lozinka</label>
          <input
            type="password"
            className={`form-control ${greske.lozinka ? "is-invalid" : ""}`}
            name="lozinka"
            value={formData.lozinka}
            onChange={handleChange}
            required
          />
          {greske.lozinka && <div className="invalid-feedback">{greske.lozinka}</div>}
        </div>
        <button type="submit" className="btn btn-primary w-100">Prijavi se</button>
      </form>
      <p className="mt-3 text-center">
        Nemate nalog?{" "}
        <button className="btn btn-link p-0" onClick={() => navigate("/registracija")}>
          Registrujte se
        </button>
      </p>
    </div>
  );
}

export default UlogujSe;


